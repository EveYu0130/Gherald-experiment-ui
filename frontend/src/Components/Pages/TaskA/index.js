import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {BrowserRouter as Router, Link, Route, Switch, useHistory, useRouteMatch, Redirect} from 'react-router-dom';
import {
    Box,
    Paper,
    Grid,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Divider,
    Button,
    Container,
    CssBaseline, CircularProgress
} from '@mui/material';
import ChangeDetail from "../ChangeDetail";
import DnD from "../../Molecules/DnD";
import {useAuth} from "../../../auth";
import {createTheme, ThemeProvider} from "@mui/material/styles";
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

const theme = createTheme();

function TaskA(props) {
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState([]);
    const [ready, setReady] = useState(false);

    let auth = useAuth();

    useEffect(() => {
        fetch(`/api/participants/${auth.user.id}`)
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setChanges(data.changeReviews);
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
                <Box sx={{ width: '100%' }} padding='5%'>
                    <Header>Task A: Rank the Changes</Header>
                    <Divider />

                    <Divider />
                    <Box sx={{ width: '100%' }} padding='20px'>
                        <Typography variant="h6" component="div"  text-align="center">
                            Task Description
                        </Typography>
                        {!ready ? (
                            <Typography component="div"  text-align="center">
                                <p>
                                    You will be provided with three sets of code changes to an existing software system (i.e., proposed commits).
                                    Your job is to rank the changes from most to least risky, where we defined risk as "likelihood of a defect in the code that will need to be fixed later".
                                </p>
                                <p>
                                    To perform the ranking, just drag and drop the changes to the order you think is right, with the most risky change at the top.
                                </p>
                                <p>
                                    To start the task, click on the <b>I'm ready for Task A</b> button below.
                                </p>
                            </Typography>
                        ) : (
                            <Typography component="div"  text-align="center">
                                <p>
                                    Below are three sets of code changes to an existing software systems (i.e., proposed commits).
                                    Your task is to rearrange the ranking below by the amount of risk you perceive in the changes.  (1 = Most risky, 3 = Least risky).
                                </p>
                                <p>
                                    You can examine the details of each change by clicking on the <b>Learn more</b> button.
                                </p>
                                {!props.practice &&
                                    <p>
                                        You can pause the experiment by clicking on the <b>Pause</b> button if you get a phone call or want to grab a coffee.
                                    </p>
                                }
                                <p>
                                    Once you are happy with your ranking, click on the <b>Submit</b> button.
                                </p>
                                <p>
                                    If you feel unable to make a meaningful evaluation, you can click on the <b>Skip</b> button instead, and we'll advance you to the next one.
                                </p>
                            </Typography>
                        )}
                    </Box>

                    {!ready ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleReadyClick}>
                                I'm ready for Task A
                            </StyledButton>
                        </Box>
                    ) : (
                        <div>
                            {loading ? (
                                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} padding='20px 0px'>
                                    <CircularProgress size={100} />
                                </Box>
                            ) : (
                                <DnD changes={changes.map(change => ({...change, change: {...change.change, img: './../../../images/' + change.change.project + '-change-' + change.change.id + '.png'}}))} practice={props.practice ? true : false}/>
                            )}
                        </div>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskA;
