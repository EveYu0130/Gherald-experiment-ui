import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
    useParams,
    useLocation,
    Switch,
    Route,
    Link,
    BrowserRouter as Router,
    useRouteMatch,
    useHistory
} from "react-router-dom";
import {
    Box,
    Paper,
    Grid,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Divider,
    Avatar,
    IconButton,
    CardActions, Container, CssBaseline, RadioGroup, FormControlLabel, Radio, Checkbox, CardContent, Card, Button, CircularProgress
} from '@mui/material';
import 'react-diff-view/style/index.css';

import FileDiff from "../../Molecules/FileDiff";
import AuthorPopover from "../../Atoms/AuthorPopover";
import CodeInspectionForm from "../../Molecules/CodeInspectionForm";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import GheraldReport from "../../Molecules/GheraldReport";


function Item(props) {
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

function NewlineText(props) {
    const text = props.text;
    if (text) {
        return (<p>{text}</p>);
    } else {
        return (<br />);
    }
}

const theme = createTheme();

function CodeReview(props) {
    const { reviewIdx } = useParams();
    const location = useLocation()
    const { baseUrl, reviews } = location.state
    const changeId = reviews[reviewIdx-1].changeId

    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState({});
    const [files, setFiles] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetch(`/api/changes/${changeId}`)
            .then(results => results.json())
            .then(data => {
                setChange({
                    status: data.status,
                    subject: data.subject,
                    project: data.project,
                    branch: data.branch,
                    updated: data.updated,
                    number: data.number,
                    author: data.author,
                    commitMsg: data.commitMsg,
                    parent: data.parent,
                    insertions: data.insertions,
                    deletions: data.deletions
                });
                setFiles(data.files);
                setLoading(false);
            })
            .catch(reqErr => console.error(reqErr))
    }, [props.match.params.reviewIdx])

    const handleOpenWindow = (e) => {
        e.preventDefault();
        const url = `https://github.com/${change.project}/tree/${change.parent}`;
        window.open(url);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <div>
                    {loading ? (
                        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} padding='20px 0px'>
                            <CircularProgress size={100} />
                        </Box>
                    ) : (
                        <div>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 1,
                                    gridTemplateColumns: 'repeat(8, 1fr)',
                                    gridTemplateRows: 'auto',
                                    gridTemplateAreas: `"subject subject subject subject subject subject subject subject"
                                    "created_title created_info created_info created_info . . . ."
                                    "author_title author_info author_info author_info . . . ."
                                    "repo_title repo_info repo_info repo_info . . . ."
                                    "branch_title branch_info branch_info branch_info . . . ."
                                    "msg msg msg msg . . . ."`,
                                }}
                                padding='20px 0px'
                            >
                                <Box sx={{ gridArea: 'subject' }} padding='20px 0px'>
                                    <Typography variant="h5" component="div"  text-align="left">
                                        Change {reviewIdx}: {change.subject}
                                    </Typography>
                                </Box>
                                <Typography sx={{ gridArea: 'created_title' }}>Created</Typography>
                                <Item sx={{ gridArea: 'created_info' }}>{change.updated.substring(0,19)}</Item>
                                <Typography sx={{ gridArea: 'author_title' }}>Author</Typography>
                                <Item sx={{ gridArea: 'author_info' }}><AuthorPopover author={change.author} /></Item>
                                <Typography sx={{ gridArea: 'repo_title' }}>Repo</Typography>
                                <Item sx={{ gridArea: 'repo_info' }}>{change.project}</Item>
                                <Typography sx={{ gridArea: 'branch_title' }}>Branch</Typography>
                                <Item sx={{ gridArea: 'branch_info' }}>{change.branch}</Item>
                                <Item sx={{ gridArea: 'msg'}}>
                                    <div>
                                        {change.commitMsg.split('\n').map((str) => (
                                            <NewlineText text={str} />
                                        ))}
                                    </div>
                                </Item>
                            </Box>

                            <GheraldReport />

                            <Box sx={{ width: '100%' }} padding='20px 0px'>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'grid',
                                        gridAutoFlow: 'column',
                                        gap: 1,
                                    }}
                                    padding='5px 10px'
                                >
                                    {/*<Box sx={{*/}
                                    {/*    // width: '30%',*/}
                                    {/*    display: 'grid',*/}
                                    {/*    gridAutoFlow: 'column',*/}
                                    {/*    gap: 1,}} justify="flex-start">*/}
                                    {/*    <DifferenceIcon xs="auto" align='left' fontSize="small" />*/}
                                    {/*    <Typography xs="auto" align='left'>*/}
                                    {/*        {files.length - 1} {files.length > 2 ? "files" : "file"} with {change.insertions} insertions and {change.deletions} deletions*/}
                                    {/*    </Typography>*/}
                                    {/*</Box>*/}

                                    {/*<Box sx={{*/}
                                    {/*    // width: '30%',*/}
                                    {/*    display: 'grid',*/}
                                    {/*    gridAutoFlow: 'column',*/}
                                    {/*    gap: 1,}} xs="auto">*/}
                                    {/*    <Typography variant="button" xs="auto" align='right'>*/}
                                    {/*        /!*parent {change.parent.substring(0,7)}*!/*/}
                                    {/*        source code*/}
                                    {/*    </Typography>*/}
                                    {/*    /!*<IconButton aria-label="Example">*!/*/}
                                    {/*    /!*    <OpenInNewIcon xs="auto" align='right' fontSize="small" />*!/*/}
                                    {/*    /!*</IconButton>*!/*/}
                                    {/*</Box>*/}
                                    <div onClick={handleOpenWindow} align='right'>
                                        <Typography variant="button" xs="auto">
                                            {/*parent {change.parent.substring(0,7)}*/}
                                            source code
                                        </Typography>
                                        <IconButton aria-label="open" size="small">
                                            <OpenInNewIcon />
                                        </IconButton>
                                    </div>

                                </Box>
                                {/*<Box sx={{ width: '100%', textAlign: 'center' }}>*/}
                                {/*    <DifferenceIcon fontSize="small" />*/}
                                {/*    <Typography>*/}
                                {/*        {files.length - 1} {files.length > 2 ? "files" : "file"} with {change.insertions} insertions and {change.deletions} deletions*/}
                                {/*    </Typography>*/}
                                {/*</Box>*/}
                                <Box sx={{ flexGrow: 1 }}>
                                    <AppBar position="static" color='transparent'>
                                        <Toolbar>
                                            <Typography component="div" sx={{ width: '77%', flexShrink: 0 }}>
                                                File
                                            </Typography>
                                            <Typography component="div" sx={{ width: '10%', flexShrink: 0 }}>
                                                Additions
                                            </Typography>
                                            <Typography component="div" sx={{ width: '13%', flexShrink: 0 }}>
                                                Deletions
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                </Box>
                                <div>
                                    {files.map((file) => (
                                        <FileDiff file={file} />
                                    ))}
                                </div>
                            </Box>

                            <CodeInspectionForm files={files.slice(1).map(file => file.filename)} reviewIdx={reviewIdx} reviews={reviews} baseUrl={baseUrl}/>
                        </div>
                    )}
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default CodeReview;