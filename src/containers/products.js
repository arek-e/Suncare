import React, {useState, useEffect} from 'react'
import { Container, Grid } from '@mui/material'
import ProductCard from '../components/ProductCard'


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';

export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log('Retreiving products')
        axios.post(API_PATH, {function: "get_products"})
            .then( res => {
                console.log(res.data)
                setProducts(res.data)
            })
    }, [])

    return (
        <Container>
            <p>Product listing</p>
            <Grid container>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} md={6} lg={4}>
                        <ProductCard product={product}/>
                    </Grid>
                    ))}    
            </Grid>
        </Container>
    )
}
