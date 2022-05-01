import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {useParams, useLocation, Link, useHistory} from "react-router-dom";
import {
    Box,
    Paper,
    Grid,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    CircularProgress,
    Button,
    IconButton
} from '@mui/material';
import 'react-diff-view/style/index.css';

import FileDiff from "../../Molecules/FileDiff";
import AuthorPopover from "../../Atoms/AuthorPopover";
import GheraldReport from "../../Molecules/GheraldReport";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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


function ChangeDetail(props) {
    const { changeId } = useParams();

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
    }, [])

    const handleOpenWindow = (e) => {
        e.preventDefault();
        const url = `https://github.com/${change.project}/tree/${change.parent}`;
        window.open(url);
    }

    return (
        <Wrapper>
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
                            padding='20px'
                        >
                            {/*<Box sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>Header</Box>*/}
                            <Box sx={{ gridArea: 'subject' }} padding='20px 0px'>
                                <Typography variant="h5" component="div"  text-align="left">
                                    {change.subject}
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

                        <Box sx={{ width: '100%' }} padding='20px'>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'grid',
                                    gridAutoFlow: 'column',
                                    gap: 1,
                                }}
                                padding='5px 10px'
                            >
                                <div onClick={handleOpenWindow} align='right'>
                                    <Typography variant="button" xs="auto">
                                        source code
                                    </Typography>
                                    <IconButton aria-label="open" size="small">
                                        <OpenInNewIcon />
                                    </IconButton>
                                </div>

                            </Box>
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

                        {/*<Box sx={{ width: '100%', textAlign: 'center' }}>*/}
                        {/*    <StyledButton fullWidth*/}
                        {/*                  variant="contained"*/}
                        {/*                  sx={{ mt: 3, mb: 2 }}*/}
                        {/*                  onClick={history.goBack}>*/}
                        {/*        <ButtonLabel>Back</ButtonLabel>*/}
                        {/*    </StyledButton>*/}
                        {/*</Box>*/}

                        {/*<Box*/}
                        {/*    component="form"*/}
                        {/*    sx={{*/}
                        {/*        '& > :not(style)': { m: 1, width: '25ch' },*/}
                        {/*    }}*/}
                        {/*    noValidate*/}
                        {/*    autoComplete="off"*/}
                        {/*>*/}
                        {/*    <TextField id="outlined-basic" label="File/Path" variant="outlined" />*/}
                        {/*    <TextField id="outlined-basic" label="Line" variant="outlined" />*/}
                        {/*    /!*<TextField id="standard-basic" label="Standard" variant="standard" />*!/*/}
                        {/*    <TextField fullWidth label="Comment" id="comment" />*/}
                        {/*</Box>*/}
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

export default ChangeDetail;