import * as React from 'react';
import {useState, useContext} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Avatar } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import {AuthContext} from '../../context/AuthContext'


function Login(){

const {authenticated, login} = useContext(AuthContext)
const [values,setValues] = useState({email: '', password: ''})

const handleChange = (event) =>{
const {value, name} = event.target;
setValues({
    ...values,
    [name]: value,
})
}

const handleClickLogin = () =>{
    
    login(values.email, values.password)
}
return(
<Container maxWidth="xs">
    <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20%',
        //backgroundColor: 'red'
    }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar> 
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <TextField
            name='email'
            label="E-Mail"
            fullWidth
            margin="normal"
            required
            value = {values.email}
            onChange={handleChange}
            />

            <TextField
            name="password"
            label="Senha"
            fullWidth
            margin="normal"
            required
            type="password"
            value = {values.password}
            onChange={handleChange}
            />
            <Button variant="contained" onClick={handleClickLogin} fullWidth>Acessar</Button>
    </Box>
</Container>
)
}
export default Login;