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
import theme from '../../../theme';


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


const backgroundImage = 'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

const Background = styled(Box)({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    zIndex: -1,
    opacity: 0.1,
});

function TaskB() {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [ready, setReady] = useState(false);

    let location = useLocation();
    let { practice } = location.state || false;

    let auth = useAuth();

    useEffect(() => {
        fetch(`/api/participants/${auth.user.id}`)
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
            <Container component="main" maxWidth="false" disableGutters>
                <Background sx={{ width: '100%', backgroundImage: `url(${backgroundImage})`}}/>
                <CssBaseline />
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%', textAlign: 'center' }} padding='4%'>
                        <Typography variant="h4" component="div" sx={{ fontWeight: '600' }}>
                            Task B: Conduct Code Reviews
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', px: '10%', pt: '40px', pb: '20px' }}>
                        <Typography variant="h6" component="div"  text-align="center">
                            Task Description
                        </Typography>
                        <Typography component="div"  text-align="center">
                            <p>
                                In this task, you will be provided with the same three sets of changes that you saw in task A.
                                Taking each set one at a time, your job will be to identify as many defects in the commit as you can, and then log them (file name, line number, description of defect) in a code inspection form at the bottom of the web page.
                            </p>
                            <p>
                                Please focus on identifying <b>only</b> functional defects; please ignore any other flaws you might notice in the code, such as those relating to style or documentation.
                            </p>
                            {!practice &&
                                <p>
                                    You can pause the experiment by clicking on the <b>Pause</b> button if you get a phone call or want to grab a coffee.
                                </p>
                            }
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
                                I'm ready for Task B
                            </StyledButton>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%', pt: '20px', pb: '10%' }}>
                            {loading ? (
                                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} padding='20px 0px'>
                                    <CircularProgress size={100} />
                                </Box>
                            ) : (
                                <CodeReview reviews={reviews} practice={practice} />
                            )}
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskB;
