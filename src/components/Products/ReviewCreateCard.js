import { Box, Button, Container, Divider, Grid, Paper, Rating, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import { purple, blue } from '@mui/material/colors';



const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function ReviewCreateCard(props) {
    const [review, setReview] = useState({
        title: '',
        review_ext: '',
        review_stars: 2
    })
    const handleChange = (event) => {
        setReview({
            ...review,
            [event.target.name]: event.target.value
        });
    }

    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
        console.log(props.account)
        axios.post(API_PATH, {function: "submit_review", review: review, prodID: props.productID, userID: props.account.userid})
        .then(res => {
            console.log(res.data.sent);
            setSubmitted(res.data.sent);
        })
    }

    const [hover, setHover] = React.useState(-1);

    return (
        <Container component="main" maxWidth="sm">{
            submitted ?    
                <Box sx={{ width: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Paper sx={{bgcolor: blue[700] , color: 'white'}}>
                        <Typography sx={{ ml: 2}} variant='subtitle2'>Thanks for leaving a review</Typography>
                    </Paper>
                </Box>
            :
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid container sx={{mb:4}}>
                    <Paper sx={{ mt: 4 , borderTop: 0.1, borderLeft: 0.1, borderRight: 0.1, width: 1}} elevation={10}>
                        <Grid container item xs={12}>
                            <Box fullwidth sx={{ width: 1, mb: 1}}>
                                <Grid item xs={12}>
                                    {review.review_stars !== null && (
                                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : review.review_stars]}</Box>
                                        )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Rating name="review_stars" value={review.review_stars} precision={0.5} size='large' 
                                    onChange={(event, newValue) => {
                                        setReview({
                                            ...review,
                                            [event.target.name]: newValue
                                        })}}
                                        
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}/>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                value={review.title}
                                onChange={handleChange}
                                variant="outlined"
                                name="title"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Comment"
                                multiline
                                rows={4}
                                value={review.review_ext}
                                onChange={handleChange}
                                variant="filled"
                                name="review_ext"
                                />
                        </Grid>
                    </Paper>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" onClick={handleSubmit}>
                            Submit review
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        }
  
        </Container>
    )
}

export default ReviewCreateCard
