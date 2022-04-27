import React from 'react';
import {Typography, Container, CssBaseline, Avatar, Box, TextField, Button} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

function EndPage() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <ThumbUpAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        This is the end of experiment.
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Thanks for your participation!
                    </Typography>
                </Box>
                {/*<Typography variant="h6" component="div"  text-align="center">*/}
                {/*    This is the end of experiment.*/}
                {/*    Thanks for your participation!*/}
                {/*</Typography>*/}
            </Container>
        </ThemeProvider>
    );
}

export default EndPage;