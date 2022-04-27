import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Box, Paper, Grid, Typography, AppBar, Toolbar, TextField, Divider, Container, CssBaseline,  Button} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";


const Header = styled.h1`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300 bold;
    text-align: center;
    color: #43D1AF;
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
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Header>Get started with the experiment</Header>
                {/*<Typography variant="h1" component="div"  text-align="center">*/}
                {/*    Get started with the experiment*/}
                {/*</Typography>*/}
                <Text>Thanks for your time. You can start the experiment by clicking  on the "Start Experiment" button on the bottom of this page.</Text>
                <Divider />
                <Box sx={{ width: '100%' }} padding='20px'>
                    <Typography variant="h6" component="div"  text-align="center">
                        About the experiment
                    </Typography>
                    <Typography component="div"  text-align="center">
                        ......
                    </Typography>
                </Box>

                <Divider />
                <Box sx={{ width: '100%' }} padding='20px'>
                    <Typography variant="h6" component="div"  text-align="center">
                        Your Tasks in a Glance
                    </Typography>
                    <Typography component="div"  text-align="center">
                        ......
                    </Typography>
                </Box>

                <Divider />
                <Box sx={{ width: '100%' }} padding='20px'>
                    <Typography variant="h6" component="div"  text-align="center">
                        Practice the Tasks
                    </Typography>
                    <Typography component="div"  text-align="center">
                        ......
                    </Typography>
                </Box>

                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Link to="/taskA" style={{ textDecoration: 'none' }}>
                        <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            <ButtonLabel>Start Experiment</ButtonLabel>
                        </StyledButton>
                    </Link>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default MainPage;