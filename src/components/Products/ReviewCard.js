import { ArrowDownward, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Container, Box, Paper, Grid, Typography, Avatar, Rating, Collapse, IconButton, Divider } from '@mui/material'
import React, { useState, useEffect} from 'react'

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';

function ReviewCard(props) {
    const [checked, setChecked] = useState(false);
    const [reviewer, setReviewer] = useState({})
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    useEffect(() => {
        axios.post(API_PATH, {function: "get_reviewer", userID: props.review.users_id})
        .then( res => {
            console.log(res.data);
            setReviewer(res.data);
        })
    }, [])

    return (
        <Container component="main">
                <Box sx={{ mt: 1}}>
                    <Paper >
                        <Grid container item xs={8} sx={{ ml: 0.5}}>
                            <Grid item xs={1}>
                                <Avatar sx={{bgcolor: 'orange'}}>{String(reviewer.first_name).charAt(0)} {String(reviewer.last_name).charAt(0)}</Avatar>
                            </Grid>
                            <Grid container item xs={12} sm={6}>    
                                <Grid item xs={12}>
                                    <Typography>{reviewer.first_name + " " +String(reviewer.last_name).charAt(0)}</Typography>   
                                </Grid>   
                                <Grid item xs={12}>
                                    <Typography>{props.review.date}</Typography>   
                                </Grid>        
                            </Grid>
                            <Grid item xs={12}>
                                <Rating value={parseInt(props.review.review_stars)} precision={0.5} readOnly size="large"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6'>{props.review.title}</Typography> 
                            </Grid>
                            <Grid item xs={12}>
                                <Collapse orientation="vertical" in={checked} collapsedSize={40}>
                                    <Typography variant='subtitle2'>{props.review.review_ext}</Typography> 
                                </Collapse>
                                
                                    {checked ? 
                                        <Grid container>
                                            <Grid item xs={2}><Typography>Show less</Typography></Grid>
                                            <Grid item xs={6}>
                                                <IconButton onClick={handleChange}>
                                                    <KeyboardArrowUp>Show less</KeyboardArrowUp>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    : 
                                        <Grid container>
                                            <Grid item xs={2}><Typography>Show more</Typography></Grid>
                                            <Grid item xs={6}>
                                                <IconButton onClick={handleChange}>
                                                    <KeyboardArrowDown>Show less</KeyboardArrowDown>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    }
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
        </Container>
    )
}

export default ReviewCard
