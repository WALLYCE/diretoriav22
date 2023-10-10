

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Cartao from "../../components/Card/Cartao";
import api from "../../services/api";
import {Backdrop} from "@mui/material";
import {CircularProgress} from "@mui/material";
import ChartColunm from "../../components/ChartColunm/ChartColunm";
export default function DashBoardCobranca() {

    const [backdrop, setBackdrop] = useState(false);
    const [dados, setDados] = useState([])
    const [servicos, setServicos] = useState(0)
    const [mediasAtraso, setMediaAtraso] = useState(0)
 
   

useEffect(()=>{
    setBackdrop(true)
    api.post('/cobranca/faturas_atrasadas').then((result)=>{
        setDados(result.data);
     api.post('/servicos/quantidade').then((result2)=>{
        setServicos(result2.data[0]['valor'])
        setBackdrop(false)
     })
    })
},[])

useEffect(()=>{
    var soma =0;
 for(var i=0; i<dados.length; i++){
  soma +=dados[i]['dias_em_atraso']
 }
 setMediaAtraso((soma/dados.length))
}, [dados])
     
 return(
    <>
           <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
     <CircularProgress color="inherit" />
      </Backdrop>

   <Grid container mt={1} mb={1} spacing={1}>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Faturas em atraso (Total)'} icone={'Nível de Serviço'} valor={((dados.length*100)/servicos).toFixed(2) + ' %'}
          color={'green'}/>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Faturas em atraso até 30 dias'} icone={'Nível de Serviço'} valor={ ((dados.filter(x => x['dias_em_atraso'] <= 30).length)*100/servicos).toFixed(2)+' %'} color={'blue'}/>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Faturas em atraso maior 30dias'} icone={'Nível de Serviço'} valor={((dados.filter(x => x['dias_em_atraso'] > 30).length)*100/servicos).toFixed(2)+' %' }  color={'purple'}/>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Média de dias de Atraso'} icone={'Avaliação colaborador'} valor={mediasAtraso.toFixed(0)}  color={'blue'}/>
        </Grid>
    </Grid>

       <Grid container mt={3} mb={1} spacing={1}>
       <ChartColunm title={'Atendimentos por colaborador (TOTAIS)'} titulo={'colaborador'} url={'/cobranca/atendimentos'}></ChartColunm>
        </Grid>

        <Grid container mt={3} mb={1} spacing={1}>
       <ChartColunm title={'Atendimentos por colaborador (Somente Cobrança)'} titulo={'colaborador'} url={'/cobranca/atendimentos/cobranca'}></ChartColunm>
        </Grid>
</>
  );
}
