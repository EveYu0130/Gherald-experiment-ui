import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    Box,
    Typography,
    Divider,
    Container,
    CssBaseline,
    Button,
    CircularProgress
} from '@mui/material';
import {useAuth} from "../../../auth";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CodeReview from "../../Molecules/CodeReview";
import {useLocation} from "react-router-dom";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';


const Header = styled.h1`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300 bold;
    text-align: center;
    // color: #43D1AF;
    margin: -16px -16px 16px -16px;
    // width: 20%;
`;

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

const ButtonLabel = styled.label`
  margin-left: 5px;
`;


const theme = createTheme();

function TaskB() {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [ready, setReady] = useState(false);
    const [pause, setPause] = useState(false);

    let location = useLocation();
    let { practice } = location.state || false;

    let auth = useAuth();

    useEffect(() => {
        fetch(`/api/participants/${auth.user}`)
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setReviews(data.changeReviews);
            })
    }, [])

    const handleReadyClick = () => {
        setReady(true);
    }

    const handlePauseClick = () => {
        setPause(true);
    }

    const handleResumeClick = () => {
        setPause(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Box sx={{ width: '100%' }} padding='5%'>
                    <Header>Task B: Conduct Code Reviews</Header>
                    <Divider />

                    <Divider />
                    <Box sx={{ width: '100%' }} padding='20px'>
                        <Typography variant="h6" component="div"  text-align="center">
                            Task Description
                        </Typography>
                        <Typography component="div"  text-align="center">
                            <p>
                                In this task, you will be provided with the same three sets of changes that you saw in task A.
                                Taking each set one at a time, your job will be to identify as many defects in the commit as you can, and then log them (file name, line number, description of defect) in a code inspection form at the bottom of the web page.
                            </p>
                            <p>
                                Please focus on identifying *only* functional defects; please ignore any other flaws you might notice in the code, such as those relating to style or documentation.
                            </p>
                            {!ready && <p>To start the task, click on the <b>I'm ready for Task B</b> button below.</p>}
                        </Typography>
                    </Box>

                    {/*<Box sx={{ width: '100%', textAlign: 'center' }}>*/}
                    {/*    <Link to={{pathname: `${url}/1`, state: { baseUrl: url, reviews: reviews.map(review => ({reviewId: review.id, changeId: review.change.id})) }}} style={{ textDecoration: 'none' }}>*/}
                    {/*        <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>*/}
                    {/*            <ButtonLabel>Ready</ButtonLabel>*/}
                    {/*        </StyledButton>*/}
                    {/*    </Link>*/}
                    {/*</Box>*/}

                    {!ready ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleReadyClick}>
                                <ButtonLabel>Ready</ButtonLabel>
                            </StyledButton>
                        </Box>
                    ) : (
                        <div>
                            {loading ? (
                                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} padding='20px 0px'>
                                    <CircularProgress size={100} />
                                </Box>
                            ) : (
                                <div style={{ width: '100%' }}>
                                    {!practice &&
                                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                                            {pause ? (
                                                <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleResumeClick}>
                                                    <AccessAlarmsIcon />
                                                    <ButtonLabel>Resume</ButtonLabel>
                                                </StyledButton>
                                            ) : (
                                                <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handlePauseClick}>
                                                    <AccessAlarmsIcon />
                                                    <ButtonLabel>Pause</ButtonLabel>
                                                </StyledButton>
                                            )}
                                        </Box>
                                    }
                                    <CodeReview reviews={reviews} practice={practice} />
                                </div>
                            )}
                        </div>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskB;