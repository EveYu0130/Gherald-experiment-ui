import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useParams } from "react-router-dom";
import { Box, Paper, Grid, Typography, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer,  TableHead, TableRow } from '@mui/material';

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


function ChangeDetail(props) {
    const { changeId } = useParams();

    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState({});

    useEffect(() => {
        fetch(`/api/changes/${changeId}`)
            .then(results => results.json())
            .then(data => {
                let files = [];
                for (const [key, value] of Object.entries(data.revisions[Object.keys(data.revisions)[0]].files)) {
                    files.push({
                        filename: key,
                        lines_inserted: value.lines_inserted ? value.lines_inserted : 0,
                        lines_deleted: value.lines_deleted ? value.lines_deleted : 0
                    });
                };
                setChange({
                    status: data.status,
                    subject: data.subject,
                    project: data.project,
                    branch: data.branch,
                    updated: data.updated,
                    // submitter: "" || data.submitter.name,
                    number: data._number,
                    owner: "" || data.owner.name,
                    commitMsg: data.revisions[Object.keys(data.revisions)[0]].commit.message,
                    files
                });
                setLoading(false);
            })
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {change.files.map((file) => (
                                            <TableRow
                                                key={file.filename}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {file.filename}
                                                </TableCell>
                                                <TableCell align="right">{file.lines_inserted}</TableCell>
                                                <TableCell align="right">{file.lines_deleted}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

export default ChangeDetail;