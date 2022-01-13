import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Stack } from '@mui/material'
import { Add, Remove } from '@mui/icons-material';

function CartItem(props) {

    const [quantity, setQuantity] = useState(0)
    const [item, setItem] = useState({})

    useEffect(() => {
        //console.log(props.item.quantity);
        setQuantity(props.item.quantity);
        setItem(props.item);
    }, [])

    const handleAddItem = () => {
        setQuantity(quantity + 1);
        props.updateCart(item.product, quantity);
    }

    const handleRemoveItem = () => {
        setQuantity(quantity - 1);
        props.updateCart(item.product, quantity);
    }

    useEffect(() => {
        props.updateCart(item.product, quantity);
    }, [quantity])

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
                        <IconButton onClick={handleAddItem}>
                            <Add/>
                        </IconButton>
                        <Box sx={{paddingTop: 1}}>                        
                            <Typography>{quantity}</Typography>
                        </Box>
                        <IconButton onClick={handleRemoveItem}>
                            <Remove/>
                        </IconButton>
                    </Stack>
                </Box>

            </Card>
    )
}

export default CartItem
