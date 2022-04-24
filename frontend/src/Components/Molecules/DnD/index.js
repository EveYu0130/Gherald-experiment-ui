import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Link} from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button, Typography } from "@mui/material";

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

    const handleOnDragEnd = (result) => {
        console.log(result)
        if (!result.destination) return;
        const items = [...changeList];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateChangeList(items);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="changes">
                {(provided) => (
                    <Box className="changes" {...provided.droppableProps} ref={provided.innerRef}>
                        {changeList.map(({id, subject, project}, index) => {
                            return (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => (
                                        // <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        //     <Item><Link to={`${baseUrl}/${id}`}>{subject}</Link></Item>
                                        // </Box>
                                        <Card sx={{ minWidth: 275 }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <CardContent>
                                                {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
                                                {/*    Change:*/}
                                                {/*</Typography>*/}
                                                <Typography variant="h6" component="div">
                                                    {subject}
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    {project}
                                                </Typography>
                                                {/*<Typography variant="body2">*/}
                                                {/*    well meaning and kindly.*/}
                                                {/*    <br />*/}
                                                {/*    {'"a benevolent smile"'}*/}
                                                {/*</Typography>*/}
                                            </CardContent>
                                            <CardActions>
                                                <Link to={`${baseUrl}/${id}`} style={{ textDecoration: 'none' }}>
                                                    <Button size="small">Learn More</Button>
                                                </Link>
                                            </CardActions>
                                        </Card>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DnD;