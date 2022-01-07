import React from 'react'
import HeaderMUI from '../HeaderMUI';
import { useParams } from "react-router-dom";
import {useState,useEffect, useContext} from 'react'
import { Box, Grid, Typography, Button, CardMedia, Card, CardContent, Paper, Divider, Rating, Tab , Tabs, List} from '@mui/material';
import ShoppingCart from './ShoppingCart';
import { Link } from "react-router-dom";
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Container, TextField } from '@mui/material';
import Copyright from '../Copyright';
import PropTypes from 'prop-types';
import { purple, blue } from '@mui/material/colors';
import ReviewCard from './ReviewCard';
import ReviewCreateCard from './ReviewCreateCard';
import { UserContext } from '../UserContext';


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography component={'span'} >{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function ProductCardPage() {

    const {account, setAccount} = useContext(UserContext)

    useEffect(() => {
        setAccount(account);
    }, [account])

    let { id} = useParams();
    
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);

    const [cart, setCart] = useState(true);

    const pullCartStatus = (data) => { setCart(data) };
    useEffect(() => {
        axios.post(API_PATH, {function: "get_product", prodID: id})
        .then( res => {
            console.log("Product: ",res.data);
            setProduct(res.data);
        });
    }, []);

    useEffect(() => {
        axios.post(API_PATH, {function: "get_all_product_reviews", prodID: id})
        .then( res => {
            console.log("Reviews: ",res.data.product_reviews);
            setReviews(res.data.product_reviews);
        });
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [value2, setValue2] = React.useState(0);

    const handleChange2 = (event, newValue) => {
      setValue2(newValue);
    };

    const [rating, setRating] = useState(0)

    useEffect(() => {
        console.log("Calculate rating")
        return calculateRating()
    }, [reviews])

    const calculateRating = () => {
        //console.log("List length: ", reviews.length)
        if(reviews.length > 0)
        {
            const ratings = reviews.map((review) => parseInt(review.review_stars))
            
            const totalRating = ratings.reduce((partial_rating, a) => partial_rating + a, 0);
            const averageRating = totalRating / reviews.length;
            console.log(ratings)
            console.log(totalRating)
            console.log(averageRating)
            setRating(averageRating)
        }
    }

    const [cartProduct, setCartProduct] = useState({})
    const handleAddCartClick = (event) => {
        setCartProduct(product);
    };


    return (
        <Box>
            <ShoppingCart cartProduct={cartProduct} cartStatus={cart}/>
            <Grid container>
                <Grid item xs={12} sx={{ zIndex: 101}}>
                    <HeaderMUI showCart={true} func={pullCartStatus}/>
                </Grid>
            </Grid>

            <Container component="main" maxWidth="md">
                <Box sx={{mt: 8}}>
                    <Paper >
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <CardMedia
                                    component="img"
                                    image={product.thumbnail}
                                    alt="product image"
                                />
                            </Grid>
                            <Grid container item xs={12} sm={6}>
                                <Grid item >
                                    <CardContent>                   
                                        <Typography variant='h5'>{product.name}</Typography>
                                        <Divider variant='fullWidth' sx={{mt: 2 , mb: 2}}/>
                                        <Grid container item>
                                            <Grid item xs={3}>
                                                <Typography variant='h6' >Rating: </Typography>
                                            </Grid>
                                            <Grid item xs={9}>
                                                <Rating value={rating} precision={0.5} readOnly size="large"/>
                                            </Grid>
                                        </Grid>


                                        <Divider variant='fullWidth' sx={{mt: 2 , mb: 2}}/>
                                        <Grid container item>
                                            <Grid item xs={5}>
                                                <Typography variant='h3'>{product.price + " kr"}</Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                            <Button variant='contained' size="large" onClick={handleAddCartClick}>Add to cart</Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Description" {...a11yProps(0)} />
                                            <Tab label="Ingredients" {...a11yProps(1)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <Container>
                                            <Typography variant='subtitle1'>{product.description}</Typography>
                                        </Container>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Container>
                                            <Typography>Här ska det finnas en massa ingredienser</Typography>
                                        </Container>
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
                <Paper sx={{mt: 4 }}>
                    <Paper sx={{bgcolor: blue[700] , color: 'white'}}>
                        <Typography sx={{ ml: 2}} variant='h4'>Reviews & comments</Typography>
                    </Paper>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value2} onChange={handleChange2} aria-label="basic tabs example">
                            <Tab label="Reviews & Comments" {...a11yProps(0)} />
                            <Tab label="Leave a review" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value2} index={1}>
                        {account ? <Box><ReviewCreateCard productID={id} account={account}/></Box>: <Box><Typography variant='h5'>Please log in to leave a review</Typography></Box>}    
                    </TabPanel>
                    <TabPanel value={value2} index={0}>
                        <List>
                            {reviews.map(review => (
                                <Grid item key={review.id} xs={12}>
                                    <ReviewCard review={review} />
                                </Grid>
                            ))} 
                        </List>
                    </TabPanel>
                </Paper>

                <Paper sx={{mt: 4 }}>
                    
                </Paper>
            </Container>
        </Box>
    )
}

export default ProductCardPage
