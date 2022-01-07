import { Refresh } from '@mui/icons-material';
import { Button, Divider, Grid, List, ListItem, Paper, TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody, IconButton } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/admin_func.php';

function Customer() {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        axios.post(API_PATH, {function: 'get_all_customers'})
        .then( res => {
            console.log("All customers: ",res.data.customers)
            setCustomers(res.data.customers)
        });

    }, [])

    const handleUpdateCustomers = () => {
        axios.post(API_PATH, {function: 'get_all_customers'})
        .then( res => {
            console.log("All customers: ",res.data.customers)
            setCustomers(res.data.customers)
        });
    }

    return (
        <Grid container>
            {customers.map(customer => (<Link key={customer.id} to={'customer/' + customer.id} />))}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phonenumber</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Is Admin?</TableCell>
                            <TableCell align="right"><IconButton onClick={handleUpdateCustomers}><Refresh/></IconButton></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) =>(
                            <TableRow key={customer.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.first_name}</TableCell>
                                <TableCell>{customer.last_name}</TableCell>
                                <TableCell>{customer.phone_number}</TableCell>
                                <TableCell>{customer.created}</TableCell>
                                <TableCell>      
                                    {(() => {
                                        switch (customer.adminFlag) {
                                        case "0":   return "No";
                                        case "1": return "Yes";
                                        }
                                    })()}
                                </TableCell>
                                <TableCell align="right">
                                    <Button variant="contained"><Link to={'customer/' + customer.id} style={{ textDecoration: 'none', color: 'inherit'}}>Edit</Link></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>    
            </TableContainer>            
        </Grid>
    )
}

export default Customer
