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
    CardActions
} from '@mui/material';
import 'react-diff-view/style/index.css';

import FileDiff from "../../Molecules/FileDiff";
import AuthorPopover from "../../Atoms/AuthorPopover";
import Button from "../../Atoms/Button";
import CodeInspectionForm from "../../Molecules/CodeInspectionForm";
import DifferenceIcon from '@mui/icons-material/Difference';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinAnimation = css`
  ${spin} 1s infinite linear
`;

const Spinner = styled.div`
  pointer-events: all;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  border: 5px solid
    rgba(255, 255, 255, 0.2);
  border-top-color: #43D1AF;
  border-right-color: #43D1AF;
  animation: ${spinAnimation};
  transition: border-top-color 0.5s linear, border-right-color 0.5s linear;
  margin-left: 48%;
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

function Item(props: BoxProps) {
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

    // const handleSubmit = (e) => {
    //     console.log('Submit');
    //     // e.preventDefault();
    //     if  (parseInt(changeIdx) === changeIds.length) {
    //         history.push(`/questionnaire`);
    //         console.log(history);
    //     } else {
    //         history.push({
    //             pathname: `${baseUrl}/${parseInt(changeIdx)+1}`,
    //             state: { baseUrl: baseUrl, changeIds: changeIds }
    //         });
    //     }
    // }

    const handleOpenWindow = (e) => {
        e.preventDefault();
        const url = `https://github.com/${change.project}/tree/${change.parent}`;
        window.open(url);
    }

    return (
        <Wrapper>
            <div>
                {loading ? (
                    <Spinner/>
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
                            {/*<Box sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>Header</Box>*/}
                            <Typography variant="h5" component="div"  text-align="left" sx={{ gridArea: 'subject' }}>
                                Change {reviewIdx}: {change.subject}
                            </Typography>
                            <Typography sx={{ gridArea: 'created_title' }}>Created</Typography>
                            <Item sx={{ gridArea: 'created_info' }}>{change.updated}</Item>
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
        </Wrapper>
    );
}

export default CodeReview;