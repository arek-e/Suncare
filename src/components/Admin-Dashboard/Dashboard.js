import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {  Badge, Box, Container, Divider, Grid, IconButton, List, Toolbar, Typography, Paper } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { ChevronLeft, Menu, Notifications } from '@mui/icons-material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { mainListItems, secondaryListItems } from './ListItems';
import HeaderMUI from '../HeaderMUI';



function Copyright(props) {
    return (

        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" to="/">
            Suncare
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <HeaderMUI position="absolute" open={open}/>
            <Box sx={{ display: 'flex' }}>
                {/* <AppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: '24px'}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{ 
                                marginRight: '36px',
                                ...(open && {display: 'none'})
                            }}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1}}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <Notifications/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar> */}
                <Drawer variant="permanent" open={open}>
                    { open ? 
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1]
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeft/>
                            </IconButton>
                        </Toolbar>
                        :
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1]
                            }}
                        >
                            <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            >
                                <Menu/>
                            </IconButton>
                        </Toolbar>
                    }
                    <Divider/>
                    <List>{mainListItems}</List>
                    <Divider/>
                    <List>{secondaryListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                
                                </Paper>
                            </Grid>

                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default function Dashboard() {
    return <DashboardContent />;
  }