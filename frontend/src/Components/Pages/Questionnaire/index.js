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

function Questionnaire() {
    return (
        <Wrapper>
            <Header>Post-Experiment Questionnaire</Header>
            {/*<Typography variant="h1" component="div"  text-align="center">*/}
            {/*    Get started with the experiment*/}
            {/*</Typography>*/}
            <Divider />

        </Wrapper>
    );
}

export default Questionnaire;