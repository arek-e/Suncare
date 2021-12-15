import React from 'react'
import {useState, useEffect} from 'react'
import {Container, Box, Slide, List, ListItem, ListItemIcon, Typography, Card, Grid} from '@mui/material'
import CartItem from './CartItem';


function ShoppingCart(props) {

    // Array that stores the items in the cart
    //const [cartItems, setCartItems] = useState();
    const [myArray, setmyArray] = useState([]);

    // Use effect - When a new product is added to cart from products page
    // send it to the addToCart function
    useEffect(() => {
        return addToCart(props.cartProduct);
    }, [props.cartProduct])

    // When a new product is received check if it is already in cart to increase quanity else add it to cart.
    const  addToCart = (cartItem) => {
            // 
            const objIndex = myArray.findIndex((obj => obj.product.id == cartItem.id));

            // Only if the item is found aka object index is not -1, we increase its quantity
            if(objIndex != -1){
                myArray[objIndex].quantity += 1;
            }
            else{
                // If the item dosnt exist in cart add it as new element with 0 quantity
                setmyArray(prevarray => [...prevarray, {product: cartItem, quantity: 0}])
            }
    }

    return (
        <Grid container sx={{ zIndex: 100 , position: 'fixed'}}>
            <Grid item xs={12}> 
                <Box sx={{height: 65}}></Box>
            </Grid>
            <Grid item md={9}>
            </Grid>
            <Grid item md={3}>
                <Slide direction="down" in={Boolean(!props.cartStatus)} mountOnEnter unmountOnExit>
                    <Card>
                        <List>
                            {myArray.map(product => {
                                if(){
                                    <CartItem item={product} />
                                }
                            })}
                        </List>
                    </Card>
                </Slide>
            </Grid>
        </Grid>
    )
}

export default ShoppingCart
