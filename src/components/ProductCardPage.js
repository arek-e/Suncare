import React from 'react'
import HeaderMUI from './HeaderMUI';
import { useParams } from "react-router-dom";
import {useState,useEffect} from 'react'
import { Box, Grid, Stack, Typography, Button, CardMedia, Card, CardContent } from '@mui/material';
import ShoppingCart from '../components/ShoppingCart';

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';

function ProductCardPage() {
    let { id} = useParams();
    
    const [product, setProduct] = useState({});
    const [cart, setCart] = useState(true);
    const pullCartStatus = (data) => { setCart(data) };
    useEffect(() => {
        axios.post(API_PATH, {function: "get_product", prodID: id})
        .then( res => {
            console.log("Product: ",res.data);
            setProduct(res.data);
        });
    }, []);

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sx={{ zIndex: 101}}>
                    <HeaderMUI func={pullCartStatus}/>
                </Grid>
                <Grid item xs={4}>
                    <CardMedia
                        component="img"
                        image={product.thumbnail}
                        alt="product image"
                    />
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardContent>                   
                            <Typography>{product.name}</Typography>
                            <Typography>{product.description}</Typography>
                            <Typography>{product.price}</Typography>
                            <Button variant="outlined">Add to Cart</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <ShoppingCart cartStatus={cart}/>
            </Grid>
        </Box>
    )
}

export default ProductCardPage
