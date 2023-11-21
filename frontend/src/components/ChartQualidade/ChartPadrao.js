import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ModalGrafico from "../ModalGrafico/ModalGrafico";
import Typography from '@mui/material/Typography';
import api from "../../services/api";
import Cartao from "../Card/Cartao";

function ChartPadrao(props) {
  const[meta, setMeta] = React.useState(0)
  const[dados, setDados] = React.useState([ ['Mês', 'Valor', { type: 'string', role: 'annotation' }, 'Meta'], [0,0,0,0]])
  const[consolidado, setConsolidado] = React.useState(0)

    async function getData(){
        const result = await api.get(`qualidade/meta/${props.nome}`)
        setMeta(parseFloat(result.data[0].valor))
        const valorGrafico = await api.get(`qualidade/${props.nome}`)
        var data = [
            ['Mês', 'Valor', { type: 'string', role: 'annotation' }, 'Meta']
          ];

        var consoli = 0
        for await(const val of valorGrafico.data){
       
        consoli += parseFloat(val.valor);
        data.push([val.data.toString(), parseFloat(val.valor), (val.valor*100).toFixed(2)+'%', result.data[0].valor/100])
        }
        consoli = (consoli/(data.length -1))*100
        setConsolidado(consoli)
        setDados(data)
    }
    useEffect(()=>{
     
     getData();
     
    },[])

  
      const options = {
        title: props.titulo,
        hAxis: { 
          title: 'Mês', 
          titleTextStyle: { color: '#333' },
          gridlines: { color: 'transparent' } // Remove as linhas de grade no eixo horizontal
        },
        vAxes: {
          0: { 
            title: 'Valores',
            format: 'percent', // Formata o eixo y em percentagem
            viewWindow: { max: 1 }, // Define o valor máximo como 1 (correspondente a 100%)
            gridlines: { color: 'transparent' } // Remove as linhas de grade no eixo vertical
          },
          1: { 
            title: 'Meta',
            format: 'percent', // Formata o eixo y em percentagem
            viewWindow: { max: 1 }, // Define o valor máximo como 1 (correspondente a 100%)
            textPosition: 'none', // Remover rótulos do eixo y
          },
        },
        series: {
          0: { type: 'bars', targetAxisIndex: 0 },
          1: { type: 'line', targetAxisIndex: 1, color: '#FFA500', lineWidth: 4 } // Laranja e linha mais grossa
        },
        annotations: {
          textStyle: {
            fontSize: 12,
            color: '#000',
          },
          stem: {
            color: 'transparent',
          },
        },
      };
  
      return (
        <>
            <Grid container mt={1} mb={1} spacing={1}>
        <Grid item xs={3} md={3}  sm={3}>
        <Typography variant="h2" component="h2">
            {props.titulo}
            </Typography>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
        
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Meta'} icone={'Avaliação colaborador'} valor={`${meta}%`} color={'blue'}/>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Consolidado'} icone={'Avaliação colaborador'} valor={consolidado.toFixed(2)+'%'}  color={'green'}/>
        </Grid>
        </Grid>
        <Chart
          chartType="ComboChart"
          data={dados}
          options={options}
          width="100%"
          height="400px"
        />

        </>
      );
      }
    
export default ChartPadrao;