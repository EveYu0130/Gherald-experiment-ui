import React, { useState, useEffect, useMemo } from 'react';
import {AppBar, Box, TextField, Toolbar, Typography, MenuItem, Select, IconButton, TableCell} from '@mui/material';
import DynamicTable from "../DynamicTable";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

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

const TableTextInput = props => {
    console.log("TableInput", props);
    const { column, row, cell, updateData } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return <TextField variant="standard" value={cell.value} onChange={onChange} />;
    // return <input type="number" value={cell.value} onChange={onChange} />;
};

const TableInput = props => {
    console.log("TableInput", props);
    const { column, row, cell, updateData } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return <TextField variant="outlined" value={cell.value} onChange={onChange} fullWidth />;
    // return <input type="number" value={cell.value} onChange={onChange} />;
};

function CodeInspectionForm(props) {
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

    const initialData = [
        {
            control: null,
            file: "file1",
            line: 2,
            comment: "test comment"
        },
        {
            control: null,
            file: "file2",
            line: 20,
            comment: "test comment2"
        }
    ];
    const [data, setData] = useState(initialData);

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

    return (
        <Box sx={{ width: '100%'}} padding='20px 0px'>
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                <AppBar position="static" color='transparent'>
                    <Toolbar>
                        <Typography component="div" sx={{ width: '100%', flexShrink: 0 }}>
                            Code Inspection Form
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <DynamicTable columns={columns} data={data} updateData={updateData} deleteData={deleteData} addData={addData} selectOptions={props.files}/>
        </Box>
    )


}
export default CodeInspectionForm;