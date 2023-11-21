import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {useState, useLayoutEffect} from 'react';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import axios from 'axios'

 function Projetos_execucao (props) {

    const[projetos, setProjetos] = useState(0);
    const[projetosPF, setProjetosPF] = useState(0);
    const[projetosPJ, setProjetosPJ] = useState(0);
    useLayoutEffect(()=>{

      axios.get(`${process.env.REACT_APP_BASE_URL}/projetos/tipo`)
              .then((resposta)=>{
                  setProjetos(parseInt(resposta.data[0].quantidade) +parseInt(resposta.data[1].quantidade))
                  setProjetosPF(resposta.data[0].quantidade)
                  setProjetosPJ(resposta.data[1].quantidade)
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
           Total de Projetos:
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {projetos}
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
            <ArchitectureIcon />
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
        Pessoa Física: {projetosPF}<br/>
        Pessoa Jurídica: {projetosPJ}
        </Typography> 
      </Box>
    </CardContent>
  </Card>
);
        }export default Projetos_execucao;