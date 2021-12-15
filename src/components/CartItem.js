import React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardMedia, Typography, Box, IconButton, ListItem, Grid, Stack } from '@mui/material'
import { Add, Remove } from '@mui/icons-material';

function CartItem(props) {

    useEffect(() => {
        console.log(props.item)

    }, [props.item])
    return (
            <Card sx={{ display: 'flex' , width: 450 , height: 100}}>
                <CardMedia
                component="img"
                sx={{width: 100, height:100}}
                image= {props.item.product.thumbnail}
                alt="product image"
                />
                <CardContent>
                    <Typography variant="subtitle2">
                        {props.item.product.name}
                    </Typography>
                    <Typography>
                        {props.item.product.price}
                    </Typography>
                </CardContent>
                <Box sx={{paddingTop: 4}}>
                    <Stack direction="row">
                        <IconButton>
                            <Add/>
                        </IconButton>
                        <Box sx={{paddingTop: 1}}>                        
                            <Typography>{props.item.quantity}</Typography>
                        </Box>
                        <IconButton>
                            <Remove/>
                        </IconButton>
                    </Stack>
                </Box>

            </Card>
    )
}

export default CartItem
