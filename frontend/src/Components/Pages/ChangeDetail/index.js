import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useParams } from "react-router-dom";
import { Box, Paper, Grid, Typography, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer,  TableHead, TableRow } from '@mui/material';
import {parseDiff, Diff, Hunk, useSourceExpansion} from 'react-diff-view';
import {refractor} from 'refractor'
import 'react-diff-view/style/index.css';
// import text from './diff';
import {diffLines, formatLines} from 'unidiff';
import { CODE_A, CODE_B } from "./myInput";
import tokenize from './tokenize';

const Wrapper = styled.div`
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-radius: 8px;
    background: #f4f7f8;
    text-align: center;
    padding: 5% 5%;
    height: 100%;
`;

const Text = styled.h3`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300;
    text-align: center;
    margin: -16px -16px 16px -16px;
    // width: 20%;
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    padding: '10px',
    textAlign: 'center',
    color: '#000000',
}));

function NewlineText(props) {
    const text = props.text;
    return text.split('\n').map(str => <p>{str}</p>);
}

const EMPTY_HUNKS = [];


function ChangeDetail(props) {
    const { changeId } = useParams();

    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState({});
    const [files, setFiles] = useState([]);
    const [{type, hunks}, setDiff] = useState('');
    const [tokens, setTokens] = useState({});


    // const text = formatLines(diffLines(CODE_A, CODE_B), {context: 3});
    // console.log(text)
    // const [fileDiff] = parseDiff(text, {nearbySequences: 'zip'});
    // console.log(fileDiff)
    const options = {
        highlight: true,
        language: 'javascript',
        refractor: refractor,
    };

    // const [hunksWithSourceExpansion, expandCode] = useSourceExpansion(hunks, CODE_B);
    // console.log(hunksWithSourceExpansion)

    // const tokens = useMemo(() => hunks.length > 0 ? tokenize(hunks, options) : [], [hunks]);


    // const tokens = useMemo(() => tokenize(fileDiff.hunks, options), [fileDiff.hunks]);

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
                    // submitter: "" || data.submitter.name,
                    number: data._number,
                    owner: "" || data.owner.name,
                    commitMsg: data.revisions[Object.keys(data.revisions)[0]].commit.message
                });
                return fetch(`/api/changes/${changeId}/files`)
            })
            .then(results => results.json())
            .then(data => {
                let filesLst = [];
                for (const [key, value] of Object.entries(data)) {
                    filesLst.push({
                        filename: key,
                        status: value.status ? value.status : "",
                        lines_inserted: value.lines_inserted ? value.lines_inserted : 0,
                        lines_deleted: value.lines_deleted ? value.lines_deleted : 0
                    });
                };
                setFiles([...filesLst]);
                setLoading(false);
                const text = formatLines(diffLines(CODE_A, CODE_B), {context: 3});
                console.log(text)
                const [fileDiff] = parseDiff(text, {nearbySequences: 'zip'});
                console.log(fileDiff)
                setTokens(tokenize(fileDiff.hunks));
                console.log(tokens);
                setDiff(fileDiff);
                // tokenize(fileDiff.hunks, options);
            })
            .catch(reqErr => console.error(reqErr))
    }, [])

    return (
        <Wrapper>
            <div>
                {loading ? (
                    <Spinner/>
                ) : (
                    <div>
                        <Box sx={{ width: '100%' }}>
                            <Typography variant="h5" component="div"  text-align="left">
                                {change.number}: {change.subject}
                            </Typography>
                            <Grid container spacing={2} direction="row" margin='0px'>
                                <Grid container columnSpacing={1} direction="column" margin='0px'>
                                    <Grid container direction="row" spacing={1} margin='0px'>
                                        <Grid item xs="auto">
                                            <Item>Status</Item>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Item>{change.status}</Item>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" spacing={1} margin='0px'>
                                        <Grid item xs="auto">
                                            <Item>Updated</Item>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Item>{change.updated}</Item>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" spacing={1} margin='0px'>
                                        <Grid item xs="auto">
                                            <Item>Owner</Item>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Item>{change.owner}</Item>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" spacing={1} margin='0px'>
                                        <Grid item xs="auto">
                                            <Item>Repo | Branch</Item>
                                        </Grid>
                                        <Grid item xs="auto">
                                            <Item>{change.project} | {change.branch}</Item>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs="auto">
                                    <Item><div><NewlineText text={change.commitMsg} /></div></Item>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ width: '100%' }} padding='20px 0px 0px 0px'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>File</TableCell>
                                            <TableCell align="right">Additions</TableCell>
                                            <TableCell align="right">Deletions</TableCell>
                                            <TableCell align="right">""</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {files.map((file) => (
                                            <TableRow
                                                key={file.filename}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {file.filename}
                                                </TableCell>
                                                <TableCell align="right">{file.status ? "" : file.lines_inserted}</TableCell>
                                                <TableCell align="right">{file.status ? "" : file.lines_deleted}</TableCell>
                                                <TableCell align="right">Detail</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <div>
                            {hunks != null &&
                                <Diff viewType="split" diffType={type} hunks={hunks}
                                      tokens={tokens}>
                                    {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
                                </Diff>
                            }
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

export default ChangeDetail;