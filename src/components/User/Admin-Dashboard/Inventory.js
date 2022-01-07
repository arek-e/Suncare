import { Refresh } from '@mui/icons-material';
import { Button, Divider, Grid, List, ListItem, Paper, TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, IconButton, Collapse } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php';

function Inventory() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.post(API_PATH, {function: "get_all_products"})
        .then( res => {
            console.log(res.data.products)
            setProducts(res.data.products)
        });

    }, [])

    const handleUpdateProducts = () => {
        axios.post(API_PATH, {function: "get_all_products"})
        .then( res => {
            console.log(res.data.products)
            setProducts(res.data.products)
        });
    }

    return (
        <Grid container>
            {products.map(product => (<Link key={product.id} to={'product/' + product.id} />))}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Thumbnail</TableCell>
                            <TableCell>Product catergory</TableCell>
                            <TableCell align="right"><IconButton onClick={handleUpdateProducts}><Refresh/></IconButton></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) =>(
                            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{String(product.name).substring(0, 50) + "..."}</TableCell>
                                <TableCell>{String(product.description).substring(0, 50) + "..."}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell><Collapse orientation="horizontal" in={false} collapsedSize={40} sx={{borderBottom: 0.1}}>{product.thumbnail}</Collapse></TableCell>
                                <TableCell>      
                                    {(() => {
                                        switch (product.product_catergories_id) {
                                        case "1": return "Body";
                                        case "2": return "Face";
                                        case "3": return "Lip";
                                        case "4": return "For Sport";
                                        case "5": return "For Kids";
                                        }
                                    })()}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained"><Link to={'product/' + product.id} style={{ textDecoration: 'none', color: 'inherit'}}>Edit</Link></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>    
            </TableContainer>            
        </Grid>
    )
}

export default Inventory
