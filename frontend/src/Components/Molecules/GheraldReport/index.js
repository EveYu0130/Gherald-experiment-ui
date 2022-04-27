import * as React from 'react';
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import styled from "styled-components";
import LinearProgress, {linearProgressClasses} from "@mui/material/LinearProgress";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import {useEffect} from "react";

function change(value) {
    return gradient(value/100,'#ffab91','#dd2c00');
}

function gradient(t,start,end) {
    return t>=0.5 ? linear(start,end,(t-.5)*2) : linear(start,end,t*2);
}

function linear(s,e,x) {
    let r = byteLinear(s[1]+s[2], e[1]+e[2], x);
    let g = byteLinear(s[3]+s[4], e[3]+e[4], x);
    let b = byteLinear(s[5]+s[6], e[5]+e[6], x);
    return "#" + r + g + b;
}

// a,b are hex values from 00 to FF; x is real number in range 0..1
function byteLinear(a,b,x) {
    let y = (('0x'+a)*(1-x) + ('0x'+b)*x)|0;
    return y.toString(16).padStart(2,'0') // hex output
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
}));

const useStyles = makeStyles({
    root: {
        height: 10,
        borderRadius: 5
    },
    bar: ({ props }) => ({
        borderRadius: 5,
        // background: `linear-gradient(90deg, #ffab91 ${100 - props.value}%, #dd2c00 100%)`
        background: `linear-gradient(90deg, #fbe9e7 ${100 - props.value}%, ${change(props.value)} 100%)`

    })
});

function LinearProgressWithLabel(props) {
    const classes = useStyles({ props });

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress classes={{ root: classes.root, bar: classes.bar }} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function ProgressWithLabel({ value, theme }) {
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < value) {
                setProgress((prevProgress) => (value > prevProgress ? prevProgress + 1 : value));
            }
        }, 10);
        return () => {
            clearInterval(timer);
        };
    }, [])

    return (
        <LinearProgressWithLabel value={progress} theme={theme} />
    );
}

const theme = createTheme();

function GheraldReport() {

    return (
        <Box sx={{ width: '50%' }} padding='20px'>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ fontWeight: '700' }}>
                        Risk score: 65%
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        This change is 65% likely to cause defects.
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ fontWeight: '600' }}>
                        Risk indicators:
                    </Typography>
                    <Grid container spacing={2} sx={{ p: 2}}>
                        <Grid item xs={4}>
                            <Typography variant="body2">Size</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <ProgressWithLabel value={99} theme={theme}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">Author prior changes</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <ProgressWithLabel value={70} theme={theme}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2"># of developers</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <ProgressWithLabel value={55} theme={theme}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default GheraldReport;