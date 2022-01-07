import { Container, Grid, Box, Paper, Typography, TextField } from '@mui/material'
import React, {useContext} from 'react'
import { UserContext } from '../../UserContext.js';
import { blue } from '@mui/material/colors';

function Account() {
    const {account, setAccount} = useContext(UserContext)

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{mt: 4}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{mb:2}}>
                        <Paper sx={{color: 'white', bgcolor: blue[700]}}>
                            <Box sx={{ml: 2}}>
                                <Typography variant="h4">Welcome back {account.firstName}!</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid container item xs={12} lg={7}>
                        <Grid item xs={12}>
                            <Paper sx={{color: 'white', bgcolor: blue[700], height: 50}}>
                                <Box sx={{ml: 2, pt: 1.5}}>
                                    <Typography variant="h6">Account details</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Paper sx={{p: 2, height: 290}}>
                            <Grid container item spacing={2} xs={12}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        name="id"
                                        label="Account ID"
                                        value={account.userid || ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        name="created"
                                        label="Account Created"
                                        value={account.created || ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        name="email"
                                        label="Email"
                                        value={account.email || ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        name="first_name"
                                        label="First Name"
                                        value={account.firstName || ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        disabled
                                        name="last_name"
                                        label="Last Name"
                                        value={account.lastName || ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        name="phone_number"
                                        label="Phonenumber"
                                        value={account.phoneNum || ''}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Account
