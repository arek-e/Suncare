import { Refresh } from '@mui/icons-material';
import { Button, Divider, Grid, List, ListItem, Paper, TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, IconButton } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/admin_func.php';


function Order() {
                        
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios.post(API_PATH, {function: 'get_all_orders'})
        .then( res => {
            console.log("All orders: ",res.data.orders)
            setOrders(res.data.orders)
        });

    }, [])

    const handleUpdateOrders = () => {
        axios.post(API_PATH, {function: 'get_all_orders'})
        .then( res => {
            console.log("All orders: ",res.data.orders)
            setOrders(res.data.orders)
        });
    }

    return (
        <Grid container>
            {orders.map(order => (<Link key={order.id} to={'order/' + order.id} />))}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right"><IconButton onClick={handleUpdateOrders}><Refresh/></IconButton></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) =>(
                            <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.users_id}</TableCell>
                                <TableCell>{order.order_date}</TableCell>
                                <TableCell>      
                                    {(() => {
                                        switch (order.status) {
                                        case "0":   return "Incomplete";
                                        case "1": return "Processing";
                                        case "2":  return "Shipped";
                                        case "3":  return "Delivered";
                                        }
                                    })()}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained"><Link to={'order/' + order.id} style={{ textDecoration: 'none', color: 'inherit'}}>Edit</Link></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>    
            </TableContainer>            
        </Grid>
    )
}

export default Order
