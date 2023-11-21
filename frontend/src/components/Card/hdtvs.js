import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useState, useLayoutEffect} from 'react';
import LiveTvIcon from '@mui/icons-material/LiveTv';

 function Hdtvs(props) {
    
    const[hdtv, setHdtv] = useState(0);
    const[hdtvPF, setHdtvPF] = useState(0);
    const[hdtvPJ, setHdtvPJ] = useState(0);


    useLayoutEffect(()=>{

   

        fetch('http://192.168.88.88:5000/hdtv/valor/tipo_pessoa', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }, 
                 }).then((res)=> res.json())
                .then((resposta)=>{
                   setHdtvPF(resposta[0].quantidade)
                   setHdtvPJ(resposta[1].quantidade)
                   setHdtv(parseInt(resposta[0].quantidade) +parseInt(resposta[1].quantidade))
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
            Pacotes de HDTV
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {hdtv}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'purple',
              height: 56,
              width: 56
            }}
          >
            <LiveTvIcon />
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
           Pessoa Física: {hdtvPF}<br/>
            Pessoa Jurídica: {hdtvPJ}
        </Typography> 
      </Box>
    </CardContent>
  </Card>
);
        }export default Hdtvs;