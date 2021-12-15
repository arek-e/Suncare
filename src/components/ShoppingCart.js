import React from 'react'
import {useState, useEffect, useContext} from 'react'
import {Container, Box, Slide, List, ListItem, ListItemIcon, Typography, Card, Grid} from '@mui/material'
import CartItem from './CartItem';
import { UserContext } from './UserContext';


const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php'


function ShoppingCart(props) {

    const {account, setAccount} = useContext(UserContext)
    let acc = account;
    // Array that stores the items in the cart
    //const [cartItems, setCartItems] = useState();
    const [myArray, setmyArray] = useState([]);

    useEffect(() => {
        if(acc){
            let userID = parseInt(acc.userid)
            axios.post(API_PATH, {function: "get_cart",userID: userID})
            .then( res => {
                console.log("Getting cart");
                res.data.cart.map(item => (
                    axios.post(API_PATH, {function: "get_product", prodID: item.products_id})
                    .then( res2 => {
                        setmyArray(prevarray => [...prevarray, {product: res2.data, quantity: parseInt(item.amount)}])
                    })
                ))
            });
        }
    }, [account])

    // Use effect - When a new product is added to cart from products page
    // send it to the addToCart function
    useEffect(() => {
        return addToCart(props.cartProduct);
    }, [props.cartProduct])

    // When a new product is received check if it is already in cart to increase quanity else add it to cart.
    const  addToCart = (cartItem) => {

        
        if(acc){
            let userID = parseInt(acc.userid)
            const objIndex = myArray.findIndex((obj => obj.product.id == cartItem.id));
            // Only if the item is found aka object index is not -1, we increase its quantity
            if(objIndex != -1){
                myArray[objIndex].quantity += 1;
                setmyArray(prevarray => [...prevarray])
                axios.post(API_PATH, {
                    function: "update_cart",
                    userID: userID,
                    item: parseInt(cartItem.id),
                    price: parseFloat(cartItem.price),
                    amount: myArray[objIndex].quantity
                }).then( res => {
                    console.log("Updated cart item:" ,res.data.sent)
                });  
            }
            else{
                // If the item dosnt exist in cart add it as new element with 0 quantity
                setmyArray(prevarray => [...prevarray, {product: cartItem, quantity: 1}])
                axios.post(API_PATH, {
                    function: "add_to_cart",
                    userID: userID,
                    item: parseInt(cartItem.id),
                    price: parseFloat(cartItem.price),
                    amount: 1
                }).then( res => {
                    console.log("New cart item:" ,res.data.sent)
                });  
            }
        }else{
            console.log("Log in first to add to cart")
        }
        console.log(myArray)
    }

    

    return (
        <Grid container sx={{ zIndex: 100 , position: 'absolute'}}>
            <Grid item xs={12}> 
                <Box sx={{height: 65}}></Box>
            </Grid>
            <Grid item md={9}>
            </Grid>
            <Grid item md={3}>
                <Slide direction="down" in={Boolean(!props.cartStatus)} mountOnEnter unmountOnExit>
                    <Card>
                        <List>
                            {myArray.filter(item => Object.keys(item.product).length > 0).map(item => (
                                <ListItem key={item.product.id}>
                                    <CartItem item={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Card>
                </Slide>
            </Grid>
        </Grid>
    )
}

export default ShoppingCart
