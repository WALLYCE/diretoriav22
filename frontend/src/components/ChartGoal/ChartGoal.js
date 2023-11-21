import React, { useEffect } from "react";
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
import Typography from '@mui/material/Typography';
import ModalSetMetas from "../ModalSetMetas/ModalSetMetas";
import {useContext} from 'react';
import {ModalMetasContext} from "../../context/ModalMetasContext";
import api from "../../services/api"

function ChartGoal(props) {
    const {modalMetas, setModalMetas} = useContext(ModalMetasContext);
    const [menuRapido, setMenuRapido] = React.useState('semanaAtual');
    const [dataInicial, setDataInicial] = React.useState(
      () => {
        const dateNow = new Date();
        const semana_inicio = dateNow.getDate() - dateNow.getDay();
        const semana_ultimo = semana_inicio + 6;
          if (semana_inicio + 6 < 6) {
              const data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
              return data_inicial        
          } else {
              const data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
              return data_inicial;             
          }
      }
    );

    const [dataFinal, setDataFinal] = React.useState(
    ()=> {
      const dateNow = new Date();
      const semana_inicio = dateNow.getDate() - dateNow.getDay();
      const semana_ultimo = semana_inicio + 6;
        if (semana_inicio + 6 <= 6) {
            const data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
            const data_final_aux = new Date(dateNow.setDate(semana_ultimo));
            const data_final = new Date(data_final_aux.setMonth(data_final_aux.getMonth() + 1)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
            return data_final;
        } else {
            const data_final = new Date(dateNow.setDate(semana_ultimo)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
         
           return data_final;
        }

    });


    const [dados, setDados] = React.useState([])
    const [metas, setMetas] = React.useState( ([['Cidade', 'Vendas'],['sem valor', 0]]))
    const [vendas, setVendas] = React.useState( ([['Cidade', 'Vendas'],['sem valor', 0]]))
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
    const [dadosModal, setDadosModal] = React.useState([]);
    const [labelModal, setLabelModal] = React.useState([]);
    const [quantidade, setQuantidade] = React.useState(0);


    


    const handleChange = (event) => {
     
       if(event.target.value === 'semanaAtual'){
        const dateNow = new Date();
        const semana_inicio = dateNow.getDate() - dateNow.getDay();
        const semana_ultimo = semana_inicio + 6;
          if (semana_inicio + 6 < 6) {
              const data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
              const data_final_aux = new Date(dateNow.setDate(semana_ultimo));
              const data_final = new Date(data_final_aux.setMonth(data_final_aux.getMonth() + 1)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
              setDataInicial(data_inicial);
              setDataFinal(data_final);
          } else {
              const data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
              const data_final = new Date(dateNow.setDate(semana_ultimo)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
              setDataInicial(data_inicial);
              setDataFinal(data_final);
          }
          
      }else if(event.target.value === 'semanaPassada'){
        let dateNow = new Date();
        let dateNow2 = new Date();
        let semana_inicio = dateNow.getDate() - dateNow.getDay() - 7;
        let semana_ultimo = semana_inicio + 6;
        let data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        let data_final = new Date(dateNow2.setDate(semana_ultimo)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        setDataInicial(data_inicial);
        setDataFinal(data_final);
      }else if(event.target.value === 'mesAtual'){
        let date = new Date();
        let data_inicial = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        let data_final = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        setDataInicial(data_inicial);
        setDataFinal(data_final);
      }else if(event.target.value === 'mesPassado'){
        let date = new Date();
        let data_inicial = new Date(date.getFullYear(), date.getMonth() - 1, 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        let data_final = new Date(date.getFullYear(), date.getMonth(), 0).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        setDataInicial(data_inicial);
        setDataFinal(data_final);
      }
      setMenuRapido(event.target.value);
    };



    useEffect(()=>{
      console.log('entrou')
     api.post(`/metas`).then(resposta=>{
       const oldData= [['Cidade', 'Venda']];
       console.log(resposta.data)
      {resposta.data && resposta.data.map(item=>{
         if(item.cidade_nome !='Total'){
              if(menuRapido == 'semanaPassada' || menuRapido == 'semanaAtual'){
                oldData.push([item.cidade_nome, parseInt(item.meta_vendas/4)])
              }else{
              oldData.push([item.cidade_nome, item.meta_vendas])
              }
         }
         
       })}
       setMetas(oldData)
       return resposta;
     }).then(respostaMeta => {
       api.post(`vendas/cidade/total`, { data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
       .then(resposta=>{
        const newData= [['Cidade', 'Venda']];
         respostaMeta.data.map((item)=>{
          if(item.cidade_nome != 'Total'){
          const valor = resposta.data.find((obj) => (obj.cidade == item.cidade_nome));
         if(valor){
           newData.push([item.cidade_nome, parseInt(valor.quantidade)])
         }else{
          newData.push([item.cidade_nome, 0])
         }
        }
        })
     
         setVendas(newData)
       })
  
       
     })
     console.log(diffdata)
    },[menuRapido, modalMetas])


    const options = {
        title:
        props.title,
        legend: {
            position: "none"
        },
            chartArea:{ 
              width: '90%'
      },
      colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
      };


 
      
      
      const diffdata = {
        old:metas,
        new: vendas
      };



  return (
      <>
         
      <Grid container spacing={2}>
      <ModalSetMetas></ModalSetMetas> 
      <Grid item xs={10} sm={2} md={2}>  
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filtro Rápido</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={menuRapido}
          label="Filtro Rápido"
          onChange={handleChange}
        >
          <MenuItem value={'semanaAtual'}>Semana Atual</MenuItem>
          <MenuItem value={'semanaPassada'}>Semana Passada</MenuItem>
          <MenuItem value={'mesAtual'}>Mês Atual</MenuItem>
          <MenuItem value={'mesPassado'}>Mês Passado</MenuItem>
        </Select>
      </FormControl> 
    </Grid>
    <Grid item xs={12} md={2} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Data Inicial"
                value={dataInicial}
                
                inputFormat="dd/MM/yyyy"
                onChange={(newValue) => {
                setDataInicial(newValue.toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
                }}
                renderInput={(params) => <TextField {...params} disabled/>}
            />
            </LocalizationProvider>          
    </Grid>
    
    <Grid item xs={12} md={2} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Data Final"
                value={dataFinal}
                
                inputFormat="dd/MM/yyyy"
                onChange={(newValue) => {
                setDataFinal(newValue.toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
                }}
                renderInput={(params) => <TextField {...params} disabled/>}
            />
            </LocalizationProvider>          
    </Grid>
    <Grid item xs={12} md={2} sm={2}>
      <Button onClick={()=> (setModalMetas(true))} sx={{height: '100%'}} variant="contained" color="success">Definir Metas</Button>          
    </Grid>
    <Grid item xs={12} md={2} sm={2}>
    <Typography variant="h4" gutterBottom component="div">
        Total: {quantidade}
      </Typography>        
    </Grid>
    
    </Grid>
 
      
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      diffdata={diffdata}
      options={options}
     
    />
   


       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
   </>
  );
}
export default ChartGoal;