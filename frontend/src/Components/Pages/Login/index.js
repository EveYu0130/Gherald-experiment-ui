import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {useParams, useLocation, useHistory} from "react-router-dom";
import { Box, Paper, Grid, Typography, AppBar, Toolbar, TextField, Container, CssBaseline, Avatar, Button } from '@mui/material';
import 'react-diff-view/style/index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from "../../../auth";

const theme = createTheme();

function Login() {
    const history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    let { from } = location.state || { from: { pathname: "/" } };


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        auth.signin(data.get('id'));
        console.log({
            id: data.get('id')
        });
    };

    if (auth.user) {
        history.replace(from);
    }

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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="Participant ID"
                            name="id"
                            autoComplete="id"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;