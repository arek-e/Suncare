import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react'

const payments = [
  { name: 'Card type', detail: 'Mastercard' },
  { name: 'Card holder', detail: 'Mr John Doe' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2023' },
];

export default function Review(props) {

    const [items, setItems] = useState([])
    const [billingDetails, setBillingDetails] = useState({})
    const [sum, setSum] = useState(0)
    const [orderItem, setOrderItem] = useState([{
        amount: 0,
        price: 0,
        product_id: -1 
    }])

    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    useEffect(() => {
        setBillingDetails(props.billingDetails)
    }, [props.billingDetails])

    useEffect(() => {
        console.log("Price run")
        return calculatePrice()
    }, [items])

    const calculatePrice = () => {
        //console.log("List length: ", items.length)
        if(items.length > 0)
        {
            const sum = items.map((item) => item.product.price * item.quantity)
            
            const totalSum = sum.reduce((partial_sum, a) => partial_sum + a, 0);
            // console.log(sum)
            // console.log(totalSum)
            setSum(totalSum)
            const order = items.map((item) => ( {amount: item.quantity, price: item.product.price, product_id: item.product.id} ))
            props.getOrderItems(order)
            console.log("Order: " , order)
            setOrderItem(order)

        }
    }


    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Order summary
        </Typography>
        <List disablePadding>
            {items.map((item) => (
            <ListItem key={item.product.id} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={item.product.name} />
                <Typography variant="body2">{item.product.price * item.quantity + " kr"}</Typography>
            </ListItem>
            ))}

            <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {sum + " kr"}
            </Typography>
            </ListItem>
        </List>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping
            </Typography>
            <Typography gutterBottom>{billingDetails.first_name + " " + billingDetails.last_name}</Typography>
            <Typography gutterBottom>{
                billingDetails.address1 + " " +  
                billingDetails.address2 + " " +
                billingDetails.city + " " +
                billingDetails.state + " " +
                billingDetails.postal_code + " " +
                billingDetails.country
            }</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment details
            </Typography>
            <Grid container>
                {payments.map((payment) => (
                <React.Fragment key={payment.name}>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                </React.Fragment>
                ))}
            </Grid>
            </Grid>
        </Grid>
        </React.Fragment>
    );
}