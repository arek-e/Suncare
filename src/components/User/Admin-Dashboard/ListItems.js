import { Assignment, BarChart, Dashboard, Inventory2, Layers, People, ShoppingCart } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { Link } from 'react-router-dom';
import React from "react";

export const mainListItems = (
    <div>
        <Link to="/user/account" style={{ textDecoration: 'none', color: 'inherit'}}>
        <ListItem button>
                <ListItemIcon>
                    <Dashboard/>
                </ListItemIcon>
                <ListItemText primary="Account" />
            </ListItem>    
        </Link>
        <Link to="/user/orders" style={{ textDecoration: 'none', color: 'inherit'}}>
            <ListItem button>
                    <ListItemIcon>
                        <ShoppingCart />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
            </ListItem>
        </Link>
        <Link to="/user/customers" style={{ textDecoration: 'none', color: 'inherit'}}>
            <ListItem button>
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>  
        </Link>
        <Link to="/user/inventory" style={{ textDecoration: 'none', color: 'inherit'}}>
            <ListItem button>
                <ListItemIcon>
                    <Inventory2/>
                </ListItemIcon>
                <ListItemText primary="Inventory" />
            </ListItem>  
        </Link>
    </div>
);