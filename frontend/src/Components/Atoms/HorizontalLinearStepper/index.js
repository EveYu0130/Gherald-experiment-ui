import React from 'react';
import styled from "styled-components";
import {Box, Button, Step, StepLabel, Stepper} from "@mui/material";

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

function HorizontalLinearStepper({data}) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {data.map((label) => (
                    <Step key={label}>
                        <StepLabel />
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <StyledButton
                        // color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                        variant="contained"
                        fullWidth
                    >
                        Back
                    </StyledButton>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <StyledButton
                        // color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                        variant="contained"
                        fullWidth
                    >
                        Skip
                    </StyledButton>
                    <StyledButton
                        // color="inherit"
                        onClick={handleNext}
                        sx={{ mr: 1 }}
                        variant="contained"
                        fullWidth
                    >
                        {activeStep === data.length - 1 ? 'Finish' : 'Next'}
                    </StyledButton>
                </Box>
            </Box>
        </Box>
    );
}

export default HorizontalLinearStepper;