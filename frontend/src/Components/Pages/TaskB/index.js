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
                            <p>Here you will be provided with the same set of code changes as in previous task for review.</p>
                            <p>The changes is provided in the order you have declared in the pre-experiment questionnaire.</p>
                            <p>In this task, you are expected to identify defects in each code change and log them in a code inspection report at the bottom of the code review page.</p>
                            {!ready && <p>Once you are prepared, click on <b>Ready</b> and the task will begin.</p>}
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
                                <CodeReview reviews={reviews} practice={practice} />
                                // <div style={{ width: '100%' }}>
                                //     {reviews.length > 0 && <HorizontalLinearStepper data={reviews} />}
                                // </div>
                            )}
                        </div>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskB;