import React from 'react'
import {AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar, Slide} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useEffect, useState, useContext} from 'react'
import { UserContext } from './UserContext';
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  const axios = require('axios').default;
  const API_PATH = 'http://localhost/suncare/src/api/login.php'



function HeaderMUI(props) {
    const {account, setAccount} = useContext(UserContext)
    const [loggedIn, setloggedIn] = useState(false)
    useEffect(() => {
        setAccount(account);
        console.log("Account:", account);

        return () => {
            setloggedIn(true);
        }
    }, [account])

    const [anchorNav, setAnchorNav] = useState(null);
    const [anchorUser, setAnchorUser] = useState(null);
    const [openCart, setOpenCart] = useState(false);

    const pages = [
        {id: 0, text: 'Home', link: '/'},
        {id: 1, text: 'Products', link: '/products'},
        {id: 2, text: 'About us', link: '/aboutus'},
        {id: 3, text: 'Contact', link: '/contact'}
    ];


    const loggedSettings = [
        {id: 0, text: 'Account', link: '/user'},
        {id: 1, text: 'Logout', link: '/'}
    ];
    const unloggedSettings = [
        {id: 0, text: 'Login', link: '/user'},
        {id: 1, text: 'Sign up', link: '/signup'}
    ];

    const handleCart = () => {
        setOpenCart(!openCart);
        props.func(openCart);
    };

    const handleOpenNavMenu = (event) => {
      setAnchorNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorNav(null);
    };
    const handleCloseUserMenu = () => {
      setAnchorUser(null);
    };
    return (
        <AppBar position="static">
            <Box>
                <Toolbar>
                    <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        SUNCARE
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu 
                            id="menu-appbar"
                            anchorEl={anchorNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit'}}>
                                            {page.text}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Suncare
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page.id}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to={page.link} style={{ textDecoration: 'none', color: 'inherit'}}>
                                {page.text}
                            </Link>
                        </Button>
                        ))}
                    </Box>

                    <Box>
                        <Tooltip title="Open Cart">
                            <IconButton                             
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleCart}
                            color="inherit"
                            >      
                                <ShoppingCartIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>      
                                <Box>{ Boolean(account) ? 
                                    <Avatar sx={{bgcolor: 'orange'}}>{String(account.firstName).charAt(0)} {String(account.lastName).charAt(0)} </Avatar>
                                :
                                    <Avatar sx={{bgcolor: 'orange'}}></Avatar>
                                }</Box>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorUser)}
                            onClose={handleCloseUserMenu}
                            >
                            <Box>{ Boolean(account) ? 
                                <Box>                            
                                    {loggedSettings.map((setting) => (
                                        <MenuItem key={setting.id} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">                                              
                                                <Link to={setting.link} style={{ textDecoration: 'none', color: 'inherit'}}>
                                                    {setting.text}
                                                </Link>
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Box>
                            :
                                <Box>                            
                                    {unloggedSettings.map((setting) => (
                                        <MenuItem key={setting.id} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                <Link to={setting.link} style={{ textDecoration: 'none', color: 'inherit'}}>
                                                    {setting.text}
                                                </Link>
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Box>
                            }</Box>
                        </Menu>
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    )
}

export default HeaderMUI
