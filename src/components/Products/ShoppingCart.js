import React from 'react'
import {useState, useEffect, useContext} from 'react'
import {Box, Slide, List, ListItem, Card, Grid, Button} from '@mui/material'
import CartItem from './CartItem';
import { UserContext } from '../UserContext';
import { Link } from "react-router-dom";

const axios = require('axios').default;
const API_PATH = 'http://localhost/suncare/src/api/products_func.php'


function ShoppingCart(props) {

    const {account, setAccount} = useContext(UserContext)
    // Array that stores the items in the cart
    //const [cartItems, setCartItems] = useState();
    const [myArray, setmyArray] = useState([]);

    useEffect(() => {
        if(account){
            let userID = parseInt(account.userid)
            axios.post(API_PATH, {function: "get_cart",userID: userID})
            .then( res => {
                console.log("Getting cart");
                res.data.cart.map(item => (
                    axios.post(API_PATH, {function: "get_product", prodID: item.products_id})
                    .then( res2 => {
                        setmyArray(prevarray => [...prevarray, {product: res2.data, quantity: parseInt(item.amount)}]);
                    })
                ))
            });
 
        }
    }, [account])

    // Use effect - When a new product is added to cart from products page
    // send it to the addToCart function
    useEffect(() => {
        props.cartUpdated(myArray);
    }, [myArray])

    useEffect(() => {
        return addToCart(props.cartProduct);
    }, [props.cartProduct])

    // When a new product is received check if it is already in cart to increase quanity else add it to cart.
    const  addToCart = (cartItem) => {   
        if(account){
            let userID = parseInt(account.userid)
            const objIndex = myArray.findIndex((obj => obj.product.id === cartItem.id));
            // Only if the item is found aka object index is not -1, we increase its quantity
            if(objIndex !== -1){
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
    }

    const updateCart = (cartItem, quantity) => {
        if(account){
            let userID = parseInt(account.userid);

            if(cartItem){
                let index =  myArray.findIndex(item => item.product.id === cartItem.id);
                myArray[index].quantity = quantity;
                if( myArray[index].quantity === 0){
                    //console.log(myArray.filter(item => item.product.id !== cartItem.id && Object.keys(item.product).length > 0));
                    setmyArray(myArray.filter(item => item.product.id !== cartItem.id && Object.keys(item.product).length > 0));
                    axios.post(API_PATH, {
                        function: "remove_from_cart",
                        item: parseInt(cartItem.id)
                    }).then( res => {
                        console.log("Removed cart item:" ,res.data.sent)
                    }); 
                }
                else{
                    setmyArray(prevarray => [...prevarray]);
                    axios.post(API_PATH, {
                        function: "update_cart",
                        userID: userID,
                        item: parseInt(cartItem.id),
                        price: parseFloat(cartItem.price),
                        amount: myArray[index].quantity
                    }).then( res => {
                        console.log("Updated cart item:" ,res.data.sent)
                    });  
                }
            }
        }

    }

    const handleClearCart = () => {
        if(account){
            let userID = parseInt(account.userid)
            axios.post(API_PATH, {function: "clear_cart", userID: userID})
            .then(res => {
                console.log(res.data);

                if(res.data){
                    setmyArray([]);
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
                    props.cartUpdated(myArray);
                }
            })

        }
    }
    

    return (
        <Grid container sx={{ zIndex: 100 , position: 'absolute' , justifyContent: 'flex-end'}}>
            <Grid item xs={12}> 
                <Box sx={{height: 65}}></Box>
            </Grid>
            <Grid container item md={3} sx={{ justifyContent: 'flex-end'}}>
                <Slide direction="down" in={Boolean(!props.cartStatus)} mountOnEnter unmountOnExit>
                    <Card>
                        <List>
                            {myArray.filter(item => Object.keys(item.product).length > 0).map(item => (
                                <ListItem key={item.product.id}>
                                    <CartItem updateCart={updateCart} item={item} />
                                </ListItem>
                            ))}
                        </List>
                        <Grid container item md={12} sx={{ justifyContent: 'center'}}>
                            <Button variant="contained" onClick={handleClearCart}>Clear cart</Button>
                            <Button variant="contained">  
                                <Link to="/checkout" style={{ textDecoration: 'none', color: 'inherit'}}>
                                    Checkout
                                </Link>
                            </Button>
                        </Grid>
                    </Card>
                </Slide>
            </Grid>
        </Grid>
    )
}

export default ShoppingCart
