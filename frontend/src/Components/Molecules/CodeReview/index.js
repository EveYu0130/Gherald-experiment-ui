import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useHistory } from "react-router-dom";
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import 'react-diff-view/style/index.css';

import ChangeInfo from "../ChangeInfo";
import CodeInspectionForm from "../CodeInspectionForm";

const StyledButton = styled(Button)`
  color: #fff;
  flex-shrink: 0;
  padding: 8px 16px;
  justify-content: center;
  margin-bottom: 10px;
  width: 200px;
  margin: 2% 1%;
  text-align: center;

  @media (max-width: 375px) {
    height: 52px;
  }

  &:disabled {
    opacity: 0.65; 
    cursor: not-allowed;
  }
`;

function CodeReview({ reviews, practice }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const { id, change } = reviews[activeStep];

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
        } else {
            fetch('/api/code-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id, codeInspections: data.map(({file, line, comment}) => ({file, line, comment}))})
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

    useEffect(() => {

    }, [activeStep]);

    return (
        <Box sx={{ width: '100%' }} padding="20px">
            <Box>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {reviews.map((label) => (
                        <Step key={label}>
                            <StepLabel />
                        </Step>
                    ))}
                </Stepper>
            </Box>

            <ChangeInfo change={change} number={activeStep+1} />

            <CodeInspectionForm data={data} updateData={updateData} deleteData={deleteData} addData={addData} selectOptions={change.files.slice(1).map(file => file.filename)}/>

            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <StyledButton
                    // color="inherit"
                    onClick={handleSkip}
                    sx={{ mr: 1 }}
                    variant="contained"
                    fullWidth
                >
                    Skip
                </StyledButton>
                <StyledButton
                    // color="inherit"
                    onClick={handleNext}
                    sx={{ mr: 1 }}
                    variant="contained"
                    fullWidth
                >
                    {activeStep === reviews.length - 1 ? 'Finish' : 'Next'}
                </StyledButton>
            </Box>

        </Box>
    );
}

export default CodeReview;