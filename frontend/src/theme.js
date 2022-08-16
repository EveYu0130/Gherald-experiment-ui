import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#795548',
        },
        secondary: {
            main: '#795548',
        },
    },
    typography: {
        // fontFamily: 'Verdana',
        // fontFamily: 'Helvetica',
        // fontFamily: 'Tahoma',
        // fontFamily: 'Trebuchet MS',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export default theme;
