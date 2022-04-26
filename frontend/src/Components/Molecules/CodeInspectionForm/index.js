import React, { useState, useEffect, useMemo } from 'react';
import {AppBar, Box, TextField, Toolbar, Typography, MenuItem, Select, IconButton, TableCell} from '@mui/material';
import DynamicTable from "../DynamicTable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {Link, useHistory} from "react-router-dom";
import styled from "styled-components";
import Button from "../../Atoms/Button";

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

const AddButton = props => {
    console.log("AddButton", props);
    const { addData } = props;
    return (
        <IconButton aria-label="delete" size="small" onClick={addData}>
            <AddCircleOutlineIcon />
        </IconButton>
    );
};

const DeleteButton = props => {
    console.log("DeleteButton", props);
    const { row, deleteData } = props;
    const onDelete = e => {
        e.preventDefault();
        deleteData(row.index)
    }
    return (
        <IconButton aria-label="delete" size="small" onClick={onDelete}>
            <RemoveCircleOutlineIcon />
        </IconButton>
    );
};

const TableSelectInput = props => {
    console.log("TableInput", props);
    const { column, row, cell, updateData, selectOptions } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return (<Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={cell.value}
        label="File"
        onChange={onChange}
        fullWidth
    >
        {selectOptions.map(file => (
            <MenuItem value={file}>{file}</MenuItem>
        ))}
    </Select>);
};

const TableInput = props => {
    console.log("TableInput", props);
    const { column, row, cell, updateData } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return <TextField variant="outlined" value={cell.value} onChange={onChange} fullWidth />;
    // return <input type="number" value={cell.value} onChange={onChange} />;
};

function CodeInspectionForm({ files, reviewIdx, reviews, baseUrl }) {
    const initialData = [
        {
            control: null,
            file: null,
            line: null,
            comment: null
        }
    ];
    const reviewId = reviews[reviewIdx-1].reviewId
    const [data, setData] = useState(initialData);
    const history = useHistory();

    const columns = useMemo(
        () => [
            {
                Header: AddButton,
                accessor: "control",
                Cell: DeleteButton
            },
            {
                Header: "File",
                accessor: "file",
                Cell: TableSelectInput
            },
            {
                Header: "Line",
                accessor: "line",
                Cell: TableInput
            },
            {
                Header: "Comment",
                accessor: "comment",
                Cell: TableInput
            }
        ],
        []
    );

    const updateData = (rowIndex, columnID, value) => {
        setData(oldData =>
            oldData.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...oldData[rowIndex],
                        [columnID]: value
                    };
                }
                return row;
            })
        );
    };

    const deleteData = (rowIndex) => {
        setData(oldData =>
            oldData.filter((row, index) => {
                return index != rowIndex;
            })
        );
    };

    const addData = () => setData(old => [...old, { control: null, file: null, line: null, comment: null }]);

    const handleSubmit = (e) => {
        console.log('Submit');
        e.preventDefault();
        console.log(data);
        fetch('/api/code-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: reviewId, codeInspections: data.map(({file, line, comment}) => ({file, line, comment}))})
        }).then(response => {
            if  (parseInt(reviewIdx) === reviews.length) {
                history.push(`/questionnaire`);
                console.log(history);
            } else {
                history.push({
                    pathname: `${baseUrl}/${parseInt(reviewIdx)+1}`,
                    state: { baseUrl: baseUrl, reviews: reviews }
                });
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Box sx={{ width: '100%'}} padding='20px 0px' component="form" onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <Typography component="div" sx={{ width: '100%', flexShrink: 0 }}>
                            Code Inspection Form
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <DynamicTable columns={columns} data={data} updateData={updateData} deleteData={deleteData} addData={addData} selectOptions={files}/>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <StyledButton type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}>
                    <ButtonLabel>Submit</ButtonLabel>
                </StyledButton>
                <Link to={{pathname: parseInt(reviewIdx) === reviews.length ? `/questionnaire` : `${baseUrl}/${parseInt(reviewIdx)+1}`, state: { baseUrl: baseUrl, reviews: reviews }}} style={{ textDecoration: 'none' }}>
                    <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        <ButtonLabel>Skip</ButtonLabel>
                    </StyledButton>
                </Link>
            </Box>
        </Box>
    )


}
export default CodeInspectionForm;