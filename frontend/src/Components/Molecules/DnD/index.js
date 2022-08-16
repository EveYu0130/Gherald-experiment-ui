import React, {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Link, useHistory} from "react-router-dom";
import {Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Grid, Avatar, Divider} from "@mui/material";
import styled from "styled-components";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import one from '../../../icons/one.png';
import two from '../../../icons/two.png';
import three from '../../../icons/three.png';


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

// const icons = [
//     (<LooksOneIcon sx={{ color: 'primary.main', fontSize: '50px' }} />),
//     (<LooksTwoIcon sx={{ color: 'primary.main', fontSize: '50px' }} />),
//     (<Looks3Icon sx={{ color: 'primary.main', fontSize: '50px' }} />)
// ]
const icons = [
    (<img src={one} alt="ONE" width={50} height={50} className={"one"} />),
    (<img src={two} alt="TWO" width={50} height={50} className={"two"} />),
    (<img src={three} alt="THREE" width={50} height={50} className={"three"} />)
]

function DnD({ changes, practice }) {
    const [changeList, updateChangeList] = useState(changes);
    const history = useHistory();
    const [pause, setPause] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = null;
        if (!pause) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (seconds > 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [pause, seconds])

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

    const handlePauseClick = () => {
        console.log(seconds);
        setPause(true);
    }

    const handleResumeClick = () => {
        console.log(seconds);
        setPause(false);
    }

    const context = require.context("../../../images/", true, /.png$/);

    return (
        <div style={{ width: '100%' }}>
            {!practice &&
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    {pause ? (
                        <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleResumeClick}>
                            <AccessAlarmsIcon />
                            <ButtonLabel>Resume</ButtonLabel>
                        </StyledButton>
                    ) : (
                        <StyledButton fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handlePauseClick}>
                            <AccessAlarmsIcon />
                            <ButtonLabel>Pause</ButtonLabel>
                        </StyledButton>
                    )}
                </Box>
            }
            {!pause && <DragDropContext onDragEnd={handleOnDragEnd}>
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
                                    <Grid key={change.id} container alignItems="center" spacing={2}>
                                        <Grid item xs={4}>
                                            <Box sx={{ width: '100%' }} textAlign="center">
                                                {icons[index]}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Box textAlign="center">
                                                <Draggable key={'draggable' + change.id} draggableId={change.id} index={index}>
                                                    {(provided) => (
                                                        // <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        //     <Item><Link to={`${baseUrl}/${id}`}>{subject}</Link></Item>
                                                        // </Box>
                                                        <Card sx={{ maxWidth: 550, m: 2 }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <CardMedia
                                                                component="img"
                                                                src={context("./" + change.project + "-change-" + change.id + ".png")}
                                                                alt={change.commitMsg}
                                                            />
                                                            {/*<img src={context("./" + change.project + "-change-" + change.id + ".png")} height={250} alt={change.commitMsg} />*/}
                                                            {/*<CardContent>*/}
                                                            {/*    {change.subject*/}
                                                            {/*        ? <Typography variant="h6" component="div">{change.subject}</Typography>*/}
                                                            {/*        : <Typography variant="h6" component="div">{change.repo}</Typography>*/}
                                                            {/*    }*/}
                                                            {/*    {change.subject*/}
                                                            {/*        ? <Typography sx={{ mb: 1.5 }} color="text.secondary">{change.repo}</Typography>*/}
                                                            {/*        : <Typography sx={{ mb: 1.5 }} color="text.secondary">{change.commitMsg}</Typography>*/}
                                                            {/*    }*/}
                                                            {/*</CardContent>*/}
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
            </DragDropContext>}
        </div>
    );
}

export default DnD;
