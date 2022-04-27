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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/questionnaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, participantId: auth.user})
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
                                    How well do you understand the provided code changes?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="understandability"
                                    value={state.understandability}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Barely understand" control={<Radio />} label="Barely understand" />
                                    <FormControlLabel value="Half understand" control={<Radio />} label="Half understand" />
                                    <FormControlLabel value="Mostly understand" control={<Radio />} label="Mostly understand" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    How difficult were the tasks?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="difficulty"
                                    value={state.difficulty}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                                    <FormControlLabel value="Average" control={<Radio />} label="Average" />
                                    <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    How did you feel during the experiment?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="fitness"
                                    value={state.fitness}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Very tired" control={<Radio />} label="Very tired" />
                                    <FormControlLabel value="OK" control={<Radio />} label="OK" />
                                    <FormControlLabel value="Very energetic" control={<Radio />} label="Very energetic" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    How useful the provided tool is to help you with your experimental tasks?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="usability"
                                    value={state.usability}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Very useful" control={<Radio />} label="Very useful" />
                                    <FormControlLabel value="Somewhat useful" control={<Radio />} label="Somewhat useful" />
                                    <FormControlLabel value="Useless" control={<Radio />} label="Useless" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Did you use any other tools (CLI/IDE) during the experiment?
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
                                    Did you encounter any problem during the experiment?
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
                                    Do you have any feedback about the experiment/provided tool?
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
                                    label="I can be contacted for a follow up interview."
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