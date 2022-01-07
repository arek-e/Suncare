import React, {useState, useEffect} from 'react'
import { Grid, Box, Stack, Typography} from '@mui/material'
import { Link } from "react-router-dom";

// Pages
import ProductCard from '../components/Products/ProductCard'
import CategoryList from '../components/Products/CategoryList';
import HeaderMUI from '../components/HeaderMUI';
import ShoppingCart from '../components/Products/ShoppingCart';

import styles from '../css/products.css'


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';

export default function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [cart, setCart] = useState(true)
    const [selectedCategory, setselectedCategory] = useState({id: 0, name: 'All products', desc: 'All products shop here'})
    const [categoryIndex, setcategoryIndex] = useState(3)
    const [cartProduct, setCartProduct] = useState({}) 

    const pullCartStatus = (data) => { setCart(data) };
    const pullCategory = (data) => { setselectedCategory(data.category) };
    const pullCatIndex = (data) => { setcategoryIndex(data) };
    const pullProduct = (data) => { setCartProduct(data) };


    useEffect(() => {
        axios.post(API_PATH, {function: "get_all_categories"})
        .then( res => {
            console.log("All categories: ",res.data.categories)
            setCategories(res.data.categories)
        });
    }, [])

    useEffect(() => {
        //console.log("Category index",categoryIndex);
        if(categoryIndex === 3){
            setselectedCategory({id: 0, name: 'All products', desc: 'All products shop here'})
            axios.post(API_PATH, {function: "get_all_products"})
            .then( res => {
                console.log("Current category: " , selectedCategory.name, res.data.products)
                setProducts(res.data.products)
            });
        }

    }, [categoryIndex])

    useEffect(() => {
        if(selectedCategory.id !== 0){
            axios.post(API_PATH, {function: "get_all_category_products", catID: selectedCategory.id})
            .then( res => {
                console.log("Category: ", selectedCategory.name, res.data.categoryProducts)
                setProducts(res.data.categoryProducts)
            });
        }

    }, [selectedCategory])



    return (    

        <Grid container >

            {products.map(product => (<Link key={product.id} to={'item/' + product.id} />))}
            <Grid item xs={12} sx={{ zIndex: 101}}>
                <HeaderMUI showCart={true} func={pullCartStatus}/>
            </Grid>
            <Grid item xs="auto">
                <Box>
                    <CategoryList categories={categories} setCategory={pullCategory} setCategoryIndex={pullCatIndex}/>
                </Box>
            </Grid>
            <Grid container item xs sx={{ paddingLeft: 10 }} >
                <Stack>
                    <Box sx={{ width: 500, height: 200,}}>
                        <Typography variant="h2">{selectedCategory.name}</Typography>
                        <Typography variant="subtitle2">{selectedCategory.desc}</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {products.map(product => (
                            <Grid item key={product.id} xs={12} sm={12} md="auto">
                                <ProductCard func={pullProduct} product={product}/>
                            </Grid>
                        ))}    
                    </Grid>
                </Stack>
            </Grid>
            <ShoppingCart cartProduct={cartProduct} cartStatus={cart}/>
        </Grid>
    )
}
