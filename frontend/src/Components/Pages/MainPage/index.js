import React from 'react';
import styled from 'styled-components';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {
    Box,
    Paper,
    Grid,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Divider,
    Container,
    CssBaseline,
    Button,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";


const Header = styled.h1`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300 bold;
    text-align: center;
    // color: #43D1AF;
    margin: -16px -16px 16px -16px;
    // width: 20%;
`;

const Text = styled.h3`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300;
    text-align: center;
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

function MainPage() {
    let location = useLocation();
    let { practiced } = location.state || false;
    const history = useHistory();

    const handleStartClick = () => {
        history.push(`/taskA`);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" padding='5%'>
                <CssBaseline />
                <Box sx={{ width: '100%' }} padding='5%'>
                    <Header>Get started with the experiment</Header>
                    <Divider />

                    <Divider />
                    <Box sx={{ width: '100%' }} padding='20px'>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                            About the experiment
                        </Typography>
                        <Box padding='20px'>
                            <Typography variant="subtitle1" paragraph>
                                Thanks for your participation!
                                <br />
                                In this experiment, you are expected to complete two tasks. More detailed are provided in the section below.
                                <br />
                                Each task will be timed and you can pause the timer at any time during the task.
                                <br />
                                Please feel free to play around with the practice task to get familiar with the experiment workflow and UI.
                                <br />
                                You can start the experiment by clicking on the <b>Start Experiment</b> button on the bottom of this page.
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />
                    <Box sx={{ width: '100%' }} padding='20px'>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                            Your Tasks in a Glance
                        </Typography>
                        <Grid container spacing={4} sx={{ p: 2}}>
                            <Grid item xs={6} sx={{ minHeight: 250 }}>
                                <Card sx={{ height: '100%', display: 'flex' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h6">
                                            Task A
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Rank the Changes
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                            In this task, you will be provided with three code changes.
                                            You will be expected to rank these changes based on your estimated risk levels.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6} sx={{ minHeight: 250 }}>
                                <Card sx={{ display: 'flex' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h6">
                                            Task B
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Conduct Code Reviews
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                            In this task, you will be provided with the same set of code changes as task A.
                                            You will be expected to identify defects in each code change and log them in a code inspection report at the bottom of the code review page.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider />
                    <Box sx={{ width: '100%' }} padding='20px'>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                            Practice the Tasks
                        </Typography>
                        <Box padding='20px'>
                            <Card sx={{ minWidth: 275}}>
                                <CardContent>
                                    <Typography variant="subtitle1" paragraph>
                                        We highly suggest you to practice the tasks before you start the experiment.
                                        <br />
                                        This will help you get familiar with the experiment workflow and UI.
                                        <br />
                                        There is no time limitation for practice tasks.
                                        <br />
                                        You can start practice tasks by clicking on the <b>Start Practice</b> button on the bottom of this page.
                                        {/*<br />*/}
                                        {/*The provided changes in the practice task will be different than the ones in the actual experiment but the task settings and UI will be exactly the same.*/}
                                    </Typography>
                                </CardContent>
                                {/*<CardActions>*/}
                                {/*    <Button>Practice</Button>*/}
                                {/*</CardActions>*/}
                                {/*<CardActions>*/}
                                {/*    <Link style={{ textDecoration: 'none' }}>*/}
                                {/*        <Button>Practice</Button>*/}
                                {/*    </Link>*/}
                                {/*</CardActions>*/}
                            </Card>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Link to="/practice/taskA" style={{ textDecoration: 'none' }}>
                            <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                <ButtonLabel>Start Practice</ButtonLabel>
                            </StyledButton>
                        </Link>
                    </Box>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleStartClick} disabled={!practiced}>
                            <ButtonLabel>Start Experiment</ButtonLabel>
                        </StyledButton>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default MainPage;