import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useHistory } from "react-router-dom";
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import 'react-diff-view/style/index.css';

import ChangeInfo from "../ChangeInfo";
import CodeInspectionForm from "../CodeInspectionForm";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { forwardRef, useRef, useImperativeHandle } from "react"

const Timer = forwardRef(({pause, handleResumeClick, handlePauseClick}, ref) => {
    const [seconds, setSeconds] = useState(0);

    useImperativeHandle(ref, () => ({
        resetTime() {
            setSeconds(0);
        },
        seconds
    }))
    // const [pause, setPause] = useState(false);

    useEffect(() => {
        let interval = null;
        if (!pause) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (seconds > 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [seconds, pause])

    return (
        <Box sx={{ width: '100%', textAlign: 'center' }}>
            {pause ? (
                <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={handleResumeClick}>
                    <AccessAlarmsIcon sx={{mr: '5px'}}/>
                    Resume
                </Button>
            ) : (
                <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={handlePauseClick}>
                    <AccessAlarmsIcon sx={{mr: '5px'}}/>
                    Pause
                </Button>
            )}
        </Box>
    );
})

function CodeReview({ reviews, practice }) {
    const [activeStep, setActiveStep] = useState(0);
    const { id, change } = reviews[activeStep];
    const [pause, setPause] = useState(false);

    const history = useHistory();

    const initialData = [
        {
            control: null,
            file: null,
            line: null,
            comment: null
        }
    ];
    const [data, setData] = useState(initialData);
    const timerRef = useRef();

    const updateData = (rowIndex, columnID, value) => {
        setData(oldData =>
            oldData.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...oldData[rowIndex],
                        [columnID]: value
                    };
                }
                return row;
            })
        );
    };

    const deleteData = (rowIndex) => {
        setData(oldData =>
            oldData.filter((row, index) => {
                return index != rowIndex;
            })
        );
    };

    const addData = () => setData(old => [...old, { control: null, file: null, line: null, comment: null }]);

    const handleNext = () => {
        console.log('Submit');
        console.log(data);
        if (practice) {
            if (activeStep === reviews.length - 1) {
                history.push({
                    pathname: '/',
                    state: { practiced: true }
                });
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
            setData(initialData);
        } else {
            const reviewTime = timerRef.current.seconds;
            console.log(reviewTime);
            timerRef.current.resetTime();
            const codeInspections = data.map(({file, line, comment}) => ({file, line, comment}));
            setData(initialData);
            fetch('/api/code-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, reviewTime, codeInspections})
            }).then(response => {
                if  (response.status === 200) {
                    if (activeStep === reviews.length - 1) {
                        history.push(`/questionnaire`);
                        console.log(history);
                    } else {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }
                }
                console.log(response);
            }).catch(error => {
                console.log(error);
            });
        }
    };

    const handleSkip = () => {
        if (activeStep === reviews.length - 1) {
            if (practice) {
                history.push({
                    pathname: '/',
                    state: { practiced: true }
                });
            } else {
                history.push(`/questionnaire`);
            }
            console.log(history);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handlePauseClick = () => {
        setPause(true);
        console.log(timerRef.current.seconds);
    }

    const handleResumeClick = () => {
        setPause(false);
        console.log(timerRef.current.seconds);
    }

    return (
        <div style={{ width: '100%' }}>
            {!practice &&
                <Timer pause={pause} handleResumeClick={handleResumeClick} handlePauseClick={handlePauseClick} ref={timerRef} />
            }
            {!pause && <Box sx={{ width: '100%', p: '1%' }}>
                <Box>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {reviews.map((review) => (
                            <Step key={'review=' + review.id}>
                                <StepLabel />
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Box  sx={{ width: '100%', px: '5%' }} >
                    <ChangeInfo change={change} number={activeStep+1} />

                    <CodeInspectionForm data={data} updateData={updateData} deleteData={deleteData} addData={addData} selectOptions={change.project === 'qt' ? change.files.slice(1).map(file => file.filename) : change.files.map(file => file.filename)}/>

                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={handleSkip}>
                            Skip
                        </Button>
                        <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={handleNext}>
                            {activeStep === reviews.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </Box>}
        </div>
    );
}

export default CodeReview;
