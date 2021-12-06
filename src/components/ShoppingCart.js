import React from 'react'
import {Container, Box, Slide, List, ListItem, ListItemIcon, Typography, Card} from '@mui/material'
import CartItem from './CartItem';


function ShoppingCart(props) {

    return (
        <Slide direction="down" in={Boolean(!props.cartStatus)} mountOnEnter unmountOnExit>
            <Card>
                <List>
                    <CartItem/>
                    <CartItem/>
                </List>
            </Card>
        </Slide>
    )
}

export default ShoppingCart
