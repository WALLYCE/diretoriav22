import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {useState, useLayoutEffect} from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

 function Sales (props) {
    
    const[vendas, setVendas] = useState(0);
    const[vendasPF, setVendasPF] = useState(0);
    const[vendasPJ, setVendasPJ] = useState(0);


    useLayoutEffect(()=>{

        const date = new Date();
        const dataInicial = new Date(date.getFullYear(), date.getMonth(), 1);
        const dataFinal = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        fetch('http://192.168.88.88:5000/vendas/valor/tipo_pessoa', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }, body: JSON.stringify({ data_inicial: dataInicial.toISOString().split('T')[0], data_final: dataFinal.toISOString().split('T')[0] })
                 }).then((res)=> res.json())
                .then((resposta)=>{
                   setVendasPF(resposta[0].quantidade)
                   setVendasPJ(resposta[1].quantidade)
                   setVendas(parseInt(resposta[0].quantidade) +parseInt(resposta[1].quantidade))
                })
               
                
    },[])
    return (
        
  <Card {...props}>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Vendas mês
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {vendas}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'blue',
              height: 56,
              width: 56
            }}
          >
            <AddCircleOutlineIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 1
        }}
      >
        <ArrowUpwardIcon color="success" /> 
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
        
        
        </Typography>
       <Typography
          color="textSecondary"
          variant="caption"
        >
           Pessoa Física: {vendasPF}<br/>
            Pessoa Jurídica: {vendasPJ}
        </Typography> 
      </Box>
    </CardContent>
  </Card>
);
        }export default Sales;