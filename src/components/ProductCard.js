import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, Slide, ButtonGroup, Collapse } from '@mui/material';

export default function ProductCard({ product }) {
    const containerRef = React.useRef(null);

    const [hovering, setHovering] = React.useState(false);
    const handleHover = () => {
        setHovering((prev) => !prev);
    };
    const handleAddCartClick = (event, addProduct) => {
        console.log(addProduct);
    };

    return (
        <Card onMouseEnter={handleHover} onMouseLeave={handleHover} sx={{ maxWidth: 300, minWidth:300,}}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    height="370"
                    image={product.thumbnail}
                    alt="product image"
                />
            </CardActionArea>
            <CardContent ref={containerRef} sx={{ overflow: 'hidden' }}>
                <Typography gutterBottom variant="h10" component="div">
                {product.name}
                </Typography>
                <Typography variant="body2">
                {product.price + " kronor"}
                </Typography>

                <Collapse in={hovering}>
                    <CardActions>     
                        <Slide direction="up" in={hovering} container={containerRef.current}>
                            <ButtonGroup size="fill" >
                                <Button onClick={(event) => handleAddCartClick(event, product)}>Add to cart</Button>
                                <Button>More details</Button>
                            </ButtonGroup>
                        </Slide>
                    </CardActions>
                </Collapse>
            </CardContent>      


            
        </Card>
    )
}
