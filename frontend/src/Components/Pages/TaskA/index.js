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

function TaskA() {
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState([]);
    const [ready, setReady] = useState(false);

    const { path, url } = useRouteMatch();

    let auth = useAuth();

    useEffect(() => {
        fetch(`/api/participants/${auth.user}`)
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
        <Switch>
            <Route exact path={path}>
                <ThemeProvider theme={theme}>
                    <Container component="main" padding='5%'>
                        <CssBaseline />
                        <Box sx={{ width: '100%' }} padding='5%'>
                            <Header>Task A: Rank the Changes</Header>
                            <Divider />

                            <Divider />
                            <Box sx={{ width: '100%' }} padding='20px'>
                                <Typography variant="h6" component="div"  text-align="center">
                                    Task Description
                                </Typography>
                                <Typography component="div"  text-align="center">
                                    <p>Here you are provided with three code changes.</p>
                                    <p>In this task, you are expected to rank these changes based on your estimated risk levels.</p>
                                    <p>Please rank these changes in an ascending order (1=Most risky, 3=Least risky).</p>
                                    {!ready && <p>Once you are prepared, click on <b>Ready</b> and the task will begin.</p>}
                                </Typography>
                            </Box>

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
                                            {changes.length > 0 && <DnD changes={changes} baseUrl={url} />}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Box>
                    </Container>
                </ThemeProvider>
            </Route>
            <Route path={`${path}/:changeId`} component={ChangeDetail} />
        </Switch>
    );
}

export default TaskA;