import React from 'react'
import {Container, Box, Slide, List, ListItem, ListItemIcon, Typography, Card, Grid} from '@mui/material'
import CartItem from './CartItem';


function ShoppingCart(props) {

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
                            <CartItem/>
                            <CartItem/>
                        </List>
                    </Card>
                </Slide>
            </Grid>
        </Grid>
    )
}

export default ShoppingCart
