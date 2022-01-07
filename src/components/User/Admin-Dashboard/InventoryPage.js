import { FormControl, InputLabel, MenuItem, Select , Grid, Paper, TextField, Typography, Box, Button, Container, Divider} from '@mui/material';
import React, {useState,useEffect} from 'react'
import { Link, useParams } from "react-router-dom";


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';

function CustomerPage() {
    let { id } = useParams();
    const [product, setProduct] = useState({});


    useEffect(() => {
        axios.post(API_PATH, {function: "get_product", prodID: id})
        .then( res => {
            console.log("Product ",res.data);
            setProduct(res.data);
        });

    }, []);

    const handleProductChange = (event) => {
        setProduct({
            ...product,    //... sends the value with
            [event.target.name]: event.target.value
        });
        console.log(product);
    };  

    const handleSubmit = (event) => {
        axios.post(API_PATH, {function: "set_product_submit", prodID: id, product: product})
        .then( (res) => {
            if(res.data.sent){
                // Redirect
            }
        });
    }

    return (
        <div>
            <Grid container justifyContent="space-between">
                <Grid item xs={12}  sm={12} md={2}>
                    <Button fullWidth size='large' sx={{height: 50}} variant='outlined'>
                        <Typography variant='button'>
                            <Link to='/user/inventory/' style={{ textDecoration: 'none', color: 'inherit'}} >Go back</Link>
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12}  sm={12} md={2} justifyContent="space-between">
                    <Button fullWidth size='large' variant='contained' onClick={handleSubmit}>
                        <Typography variant='button'>
                            <Link to='/user/inventory/' style={{ textDecoration: 'none', color: 'inherit'}} > Submit changes</Link>
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Divider variant='fullWidth' sx={{mt:5 , mb:5}}/>
            <Container component="main">
                <Typography component="h1" variant="h5">
                        Product details
                    </Typography>
                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                    }}
                >
                    <Box noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    disabled
                                    name="product_id"
                                    label="Product ID"
                                    value={product.id || ''}
                                    onChange={handleProductChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Product Name"
                                    value={product.name || ''}
                                    onChange={handleProductChange}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="description"
                                    label="Product Description"
                                    value={product.description || ''}
                                    onChange={handleProductChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    name="price"
                                    label="Product Price"
                                    value={product.price || ''}
                                    onChange={handleProductChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    name="stock"
                                    label="Product Stock"
                                    value={product.stock || ''}
                                    onChange={handleProductChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl>
                                    <InputLabel>Product Category</InputLabel>
                                    <Select
                                        sx={{width: 1}}
                                        name="product_catergories_id"
                                        label="Product Category"
                                        value={product.product_catergories_id || 1}
                                        onChange={handleProductChange}
                                    >
                                        <MenuItem value={1}>Body</MenuItem>
                                        <MenuItem value={2}>Face</MenuItem>
                                        <MenuItem value={3}>Lip</MenuItem>
                                        <MenuItem value={4}>For Sport</MenuItem>
                                        <MenuItem value={5}>For Kids</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="thumbnail"
                                    label="Product Thumbnail"
                                    value={product.thumbnail || ''}
                                />
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Divider variant='fullWidth' sx={{mt:5 , mb:5}}/>

        </div>
    )
}

export default CustomerPage
