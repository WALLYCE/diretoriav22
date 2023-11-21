import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useState, useLayoutEffect} from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios'
 function Cancellations (props) {
    
    const[cancelamentos, setCancelamentos] = useState(0);
    const[cancelamentosPF, setCancelamentosPF] = useState(0);
    const[cancelamentosPJ, setCancelamentosPJ] = useState(0);


    useLayoutEffect(()=>{

        const date = new Date();
        const dataInicial = new Date(date.getFullYear(), date.getMonth(), 1);
        const dataFinal = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        axios.post('http://192.168.88.88:5000/cancelamentos/valor/tipo_pessoa',{ data_inicial: dataInicial.toISOString().split('T')[0], data_final: dataFinal.toISOString().split('T')[0] })
                .then((resposta)=>{
                   setCancelamentosPF(resposta.data[0].quantidade)
                   setCancelamentosPJ(resposta.data[1].quantidade)
              
                   setCancelamentos(parseInt(resposta[0].quantidade) + parseInt(resposta[1].quantidade))
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
            Cancelamentos mês
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {cancelamentos}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'red',
              height: 56,
              width: 56
            }}
          >
            <HighlightOffIcon />
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
           Pessoa Física: {cancelamentosPF}<br/>
            Pessoa Jurídica: {cancelamentosPJ}
        </Typography> 
      </Box>
    </CardContent>
  </Card>
);
        }export default Cancellations;