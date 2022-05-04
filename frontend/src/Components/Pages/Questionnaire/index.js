import React, {useState} from 'react';
import styled from 'styled-components';

// import { Link } from 'react-router-dom';
import { Box, Paper, Grid, Typography, AppBar, Toolbar, TextField, Divider, Container, Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuth} from "../../../auth";
import {useHistory} from "react-router-dom";

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

function Questionnaire() {
    const [state, setState] = useState({
        understandability: null,
        difficulty: null,
        fitness: null,
        usability: null,
        otherTool: null,
        problem: null,
        feedback: null,
        allowInterview: false
    });
    let auth = useAuth();
    const history = useHistory();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/questionnaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, participantId: auth.user.id})
        }).then(response => {
            if  (response.status === 200) {
                history.push(`/end`);
                console.log(history);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box sx={{ width: '100%' }} padding='5%'>
                    {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
                    {/*    <LockOutlinedIcon />*/}
                    {/*</Avatar>*/}
                    <Header>Post-Experiment Questionnaire</Header>
                    {/*<Typography component="h1" variant="h5">*/}
                    {/*    Post-Experiment Questionnaire*/}
                    {/*</Typography>*/}
                    <Divider />

                    <Divider />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    1. How well do you think you understood the provided source code changes?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="understandability"
                                    value={state.understandability}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Very well" control={<Radio />} label="Mostly understand" />
                                    <FormControlLabel value="Somewhat" control={<Radio />} label="Half understand" />
                                    <FormControlLabel value="Barely" control={<Radio />} label="Barely understand" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    2. How difficult did you find the assigned tasks?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="difficulty"
                                    value={state.difficulty}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                                    <FormControlLabel value="Moderate" control={<Radio />} label="Average" />
                                    <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    3. How would you describe your enthusiasm and energy level during the experiment?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="fitness"
                                    value={state.fitness}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="High" control={<Radio />} label="Very energetic" />
                                    <FormControlLabel value="Moderate" control={<Radio />} label="OK" />
                                    <FormControlLabel value="Low" control={<Radio />} label="Very tired" />
                                </RadioGroup>
                            </Grid>
                            {auth.user.group === "gherald" &&
                                <Grid item xs={12}>
                                    <Typography>
                                        4. How useful did you find the information provided by the tool?
                                    </Typography>
                                    <RadioGroup
                                        row
                                        name="usability"
                                        value={state.usability}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Very useful" control={<Radio />} label="Very useful" />
                                        <FormControlLabel value="Moderately useful" control={<Radio />} label="Somewhat useful" />
                                        <FormControlLabel value="Not useful" control={<Radio />} label="Useless" />
                                    </RadioGroup>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Typography>
                                    {auth.user.group === "gherald" ? 5 : 4}. What, if any, additional tools or information sources did you use during the experiment to help in your decision making?
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    id="other-tool"
                                    name="otherTool"
                                    multiline
                                    value={state.otherTool}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {auth.user.group === "gherald" ? 6 : 5}. What, if any, problems did you encounter during the experiment?
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    id="problem"
                                    name="problem"
                                    multiline
                                    value={state.problem}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {auth.user.group === "gherald" ? 7 : 6}. Do you have any additional comments or feedback on the tasks you performed and the information you were provided with?
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    id="feedback"
                                    name="feedback"
                                    value={state.feedback}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox name="allowInterview" color="primary" checked={state.allowInterview} onChange={handleCheckChange} />
                                    }
                                    label="I am happy to be contacted by the research team for a follow-up interview."
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <StyledButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </StyledButton>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Questionnaire;