import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import {useState, useLayoutEffect} from 'react';
import ArchitectureIcon from '@mui/icons-material/Architecture';


 function Projetos_execucao (props) {

    const[projetos, setProjetos] = useState(0);
    const[projetosPF, setProjetosPF] = useState(0);
    const[projetosPJ, setProjetosPJ] = useState(0);
    useLayoutEffect(()=>{

        fetch('http://192.168.88.88:5000/projetos/tipo', {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },}).then((res)=> res.json())
                .then((resposta)=>{
                    setProjetos(parseInt(resposta[0].quantidade) +parseInt(resposta[1].quantidade))
                    setProjetosPF(resposta[0].quantidade)
                    setProjetosPJ(resposta[1].quantidade)
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