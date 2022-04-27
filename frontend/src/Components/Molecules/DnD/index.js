import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Link, useHistory} from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import styled from "styled-components";


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

function DnD({ changes, baseUrl }) {
    const [changeList, updateChangeList] = useState(changes);
    const history = useHistory();

    const handleOnDragEnd = (result) => {
        console.log(result)
        if (!result.destination) return;
        let items = [...changeList];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        items = items.map((item, index) => ({...item, riskLevel: index+1}));
        updateChangeList(items);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/risk-assessment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changeList)
        }).then(response => {
            history.push('/taskB')
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="changes">
                {(provided) => (
                    <Box className="changes" sx={{ backgroundColor: 'grey.200', p: 2 }} {...provided.droppableProps} ref={provided.innerRef} component="form" onSubmit={handleSubmit}>
                        {changeList.map(({id, change}, index) => {
                            return (
                                <Draggable key={change.id} draggableId={change.id} index={index}>
                                    {(provided) => (
                                        // <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        //     <Item><Link to={`${baseUrl}/${id}`}>{subject}</Link></Item>
                                        // </Box>
                                        <Card sx={{ minWidth: 275, m: 2 }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <CardContent>
                                                {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                                                {/*    Change:*/}
                                                {/*</Typography>*/}
                                                <Typography variant="h6" component="div">
                                                    {change.subject}
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {change.project}
                                                </Typography>
                                                {/*<Typography variant="body2">*/}
                                                {/*    well meaning and kindly.*/}
                                                {/*    <br />*/}
                                                {/*    {'"a benevolent smile"'}*/}
                                                {/*</Typography>*/}
                                            </CardContent>
                                            <CardActions>
                                                <Link to={`${baseUrl}/${change.id}`} style={{ textDecoration: 'none' }}>
                                                    <Button size="small">Learn More</Button>
                                                </Link>
                                            </CardActions>
                                        </Card>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <StyledButton type="submit"
                                          fullWidth
                                          variant="contained"
                                          sx={{ mt: 3, mb: 2 }}>
                                <ButtonLabel>Submit</ButtonLabel>
                            </StyledButton>
                            <Link to="/taskB" style={{ textDecoration: 'none' }}>
                                <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    <ButtonLabel>Skip</ButtonLabel>
                                </StyledButton>
                            </Link>
                        </Box>
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DnD;