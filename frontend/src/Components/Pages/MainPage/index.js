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
                    <Header>Welcome to our experiment on code review</Header>
                    <Divider />

                    <Divider />
                    <Box sx={{ width: '100%' }} padding='20px'>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                            About the experiment
                        </Typography>
                        <Box padding='20px'>
                            <Typography variant="subtitle1" paragraph>
                                <p>
                                    Thanks for your participation!
                                </p>
                                <p>
                                    In this experiment, we're going to ask you to complete two tasks that relate to code review.
                                    We'll be using examples code commits taken from real-world systems and asking you to evaluate them in different ways.
                                </p>
                                <p>
                                    The tasks will be timed.
                                    The timer can be paused if you get a phone call or want to grab a coffee.
                                    However, please do not pause the timer if you are actively working on the task.
                                </p>
                                <p>
                                    We are aware that it may be possible for you to access the actual historic code reviews performed by the systems' original developers.
                                    We respectfully ask you *not* to do this, so that we can evaluate our research ideas without bias.
                                    However, you are free to use other tools or information sources that you normally use during code reviews.
                                </p>
                                <p>
                                    You will have the opportunity to do a warm-up example for each task; see the <b>Start Practice</b> button below.
                                    These exercises will give you some familiarity with the task workflow, the UI, and the design of the experiment.
                                    The practise exercises will not be timed or evaluated by us.
                                </p>
                                <p>
                                    Once you're comfortable that you understand what you're being asked to do, you can begin the experiment by clicking on the <b>Start Experiment</b> button below.
                                </p>
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
                                            Rank the changes by risk
                                        </Typography>
                                        <Typography variant="subtitle1" paragraph>
                                            In this task, you will be provided with three sets of code changes (i.e., proposed commits to an existing software system).
                                            Your job is to rank the changes from most to least risky, where we define risk as "the likelihood of a defect in the code that will need to be fixed later".
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
                                            In this task, you will be provided with the same three sets of changes that you saw in the first task.
                                            Your job will be to identify all of the defects in the commit and log them (file name, line number, description of defect) in a report.
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
                                        <p>
                                            Before you start the real experiment, you'll be able to do a practice round of each task.
                                            This will give you some experience with the workflow of the task, the UI, and the problem space.
                                            We will not evaluate the results of the practice tasks, so take your time.
                                        </p>
                                        <p>
                                            Click on the <b>Start practice</b> button below to give it a try.
                                            Once you have completed the practice, the <b>Start experiment</b> button will be enabled and you'll be able to go on to the actual experiment.
                                        </p>
                                        <p>
                                            Note that while we are timing your responses, don't think of this as a race.
                                            Take the time you feel that you need to do the task to your satisfaction.
                                        </p>
                                        <p>
                                            Also, if you get a phone call or otherwise need to take a short break for some reason, please click on the "Pause" button.
                                            However, please do *not* pause if you're actively thinking about the task.
                                        </p>
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