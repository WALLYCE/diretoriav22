import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {useState, useLayoutEffect} from 'react';

 function Clients (props) {

    const[servicos, setServicos] = useState(0);
    const[servicosPF, setServicosPF] = useState(0);
    const[servicosPJ, setServicosPJ] = useState(0);
    useLayoutEffect(()=>{

        fetch('http://192.168.88.88:5000/cliente_servico/ativos/valor', {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },}).then((res)=> res.json())
                .then((resposta)=>{
                    setServicos(parseInt(resposta[0].quantidade) +parseInt(resposta[1].quantidade))
                    setServicosPF(resposta[0].quantidade)
                    setServicosPJ(resposta[1].quantidade)
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
            SERVIÇOS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {servicos}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
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
        {/* <ArrowUpwardIcon color="success" /> */}
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
           Pessoa Física: {servicosPF}<br/>
            Pessoa Jurídica: {servicosPJ}
        </Typography> 
      </Box>
    </CardContent>
  </Card>
);
        }export default Clients;