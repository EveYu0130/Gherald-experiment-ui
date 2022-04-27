import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {BrowserRouter as Router, Link, Route, Switch, useRouteMatch} from 'react-router-dom';
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
    Avatar,
    Button
} from '@mui/material';
import Table from "../../Molecules/Table";
import ChangeDetail from "../ChangeDetail";
import FileDiff from "../../Molecules/FileDiff";
import CodeReview from "../CodeReview";
import {useAuth} from "../../../auth";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Wrapper = styled.div`
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-radius: 8px;
    background: #f4f7f8;
    // text-align: center;
    padding: 5% 5%;
    height: 100%;
`;

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


function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

const theme = createTheme();

function TaskB() {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    let auth = useAuth();

    useEffect(() => {
        fetch(`/api/participants/${auth.user}`)
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setReviews(data.changeReviews);
            })
    }, [])

    const { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
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
                                    <p>Once you are prepared, click on <b>Ready</b> and the task will begin.</p>
                                </Typography>
                            </Box>

                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                                <Link to={{pathname: `${url}/1`, state: { baseUrl: url, reviews: reviews.map(review => ({reviewId: review.id, changeId: review.change.id})) }}} style={{ textDecoration: 'none' }}>
                                    <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                        <ButtonLabel>Ready</ButtonLabel>
                                    </StyledButton>
                                </Link>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Route>
            <Route path={`${path}/:reviewIdx`} component={CodeReview} />
        </Switch>
    );
}

export default TaskB;