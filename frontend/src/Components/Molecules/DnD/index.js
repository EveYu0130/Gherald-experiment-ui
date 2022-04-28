import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Link, useHistory} from "react-router-dom";
import {Box, Card, CardActions, CardContent, Button, Typography, Grid, Avatar} from "@mui/material";
import styled from "styled-components";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";


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

const icons = [
    (<LooksOneIcon sx={{ color: 'primary.main', fontSize: '50px' }} />),
    (<LooksTwoIcon sx={{ color: 'primary.main', fontSize: '50px' }} />),
    (<Looks3Icon sx={{ color: 'primary.main', fontSize: '50px' }} />)
]

function DnD({ changes, practice }) {
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
        if (practice) {
            history.push({
                pathname: '/practice/taskB',
                state: { practice: true }
            });
        } else {
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
        }
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="changes">
                {(provided) => (
                    // <Grid container spacing={2}>
                    //     <Grid container xs={2}>
                    //         <Grid
                    //             container
                    //             direction="column"
                    //             justifyContent="flex-start"
                    //             alignItems="flex-start"
                    //         >
                    //             <Item>xs=6 md=4</Item>
                    //             <Item>xs=6 md=4</Item>
                    //             <Item>xs=6 md=4</Item>
                    //         </Grid>
                    //     </Grid>
                    //     <Grid item xs={10}>
                    //         <Item>xs=6 md=4</Item>
                    //     </Grid>
                    // </Grid>
                    <Box className="changes" sx={{ backgroundColor: 'grey.200', p: 2 }} {...provided.droppableProps} ref={provided.innerRef}>
                        {changeList.map(({id, change}, index) => {
                            return (
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={2}>
                                        <Box sx={{ width: '100%' }} textAlign="center">
                                            {icons[index]}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Box>
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
                                                            <Link to={`/changes/${change.id}`} target="_blank" style={{ textDecoration: 'none' }}>
                                                                <Button size="small">Learn More</Button>
                                                            </Link>
                                                        </CardActions>
                                                    </Card>
                                                )}
                                            </Draggable>
                                        </Box>
                                    </Grid>
                                </Grid>
                            );
                        })}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <StyledButton fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                              onClick={handleSubmit}>
                    <ButtonLabel>Submit</ButtonLabel>
                </StyledButton>
                <Link to={{pathname: practice ? "/practice/taskB" : "/taskB", state: { practice: practice }}} style={{ textDecoration: 'none' }}>
                    <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        <ButtonLabel>Skip</ButtonLabel>
                    </StyledButton>
                </Link>
            </Box>
        </DragDropContext>
    );
}

export default DnD;