import React from 'react'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import {useEffect, useState} from 'react'


function CategoryList(props) {
    const [selectedIndex, setSelectedIndex] = useState(3);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([])

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        props.setCategoryIndex(index);
        if (selectedIndex == 0){
            setOpen(!open);
        };
    };

    const handleCategoryClick = (event, cat) => {
        props.setCategory(cat);
    };

    useEffect(() => {
        setCategories(props.categories)
    }, [props.categories]);
    
    useEffect(() => {
        selectedIndex == 0 ? setOpen(true) : setOpen(false);
    }, [selectedIndex])


    return (
        <Box sx={{ minWidth: 350}}>
            <List component="nav">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemText primary="Protect" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {categories.map(category => (
                            <Box key={category.id}>
                                <ListItemButton   sx={{ pl: 4 }} onClick={(event) => handleCategoryClick(event, {category})}  >
                                    <ListItemText primary={category.name} />
                                </ListItemButton>
                                <Divider variant="middle"/>
                            </Box>
                        ))}  
                    </List>
                </Collapse>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemText primary="Tan" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemText primary="Repair" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <ListItemText primary="All products" />
                </ListItemButton>
                <Divider />
            </List>
        </Box>
    )
}

export default CategoryList
