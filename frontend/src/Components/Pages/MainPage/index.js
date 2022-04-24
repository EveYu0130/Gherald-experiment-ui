import React from 'react';
import styled from 'styled-components';
import Button from '../../Atoms/Button';
import { Link } from 'react-router-dom';
import { Box, Paper, Grid, Typography, AppBar, Toolbar, TextField, Divider } from '@mui/material';

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

function MainPage() {
    return (
        <Wrapper>
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
                <Link to="/task1">
                    <StyledButton>
                        <ButtonLabel>Start Experiment</ButtonLabel>
                    </StyledButton>
                </Link>
            </Box>

        </Wrapper>
    );
}

export default MainPage;