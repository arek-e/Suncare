import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Box, IconButton, ListItem, Grid, Stack } from '@mui/material'
import { Add, Remove } from '@mui/icons-material';

function CartItem() {
    const [item, setItem] = useState({
        name: '',
        price: 0,
        amount: 1,
    })
    return (
        <ListItem>
            <Card sx={{ display: 'flex' , width: 450 , height: 100}}>
                <CardMedia
                component="img"
                sx={{width: 100, height:100}}
                image='http://localhost/suncare/src/images/body/Malibu-Clear-All-Day-Protection.jpg'
                alt="product image"
                />
                <CardContent>
                    <Typography variant="subtitle2">
                        Malibu Clear All Day Protection Spray SPF 50 250ml
                    </Typography>
                    <Typography>
                        70 kr
                    </Typography>
                </CardContent>
                <Box sx={{paddingTop: 4}}>
                    <Stack direction="row">
                        <IconButton>
                            <Add/>
                        </IconButton>
                        <Box sx={{paddingTop: 1}}>                        
                            <Typography>1</Typography>
                        </Box>
                        <IconButton>
                            <Remove/>
                        </IconButton>
                    </Stack>
                </Box>

            </Card>
        </ListItem>
    )
}

export default CartItem
