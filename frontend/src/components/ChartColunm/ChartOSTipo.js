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
import ModalGrafico from "../ModalGrafico/ModalGrafico";
import Typography from '@mui/material/Typography';
import api from "../../services/api"
import ModalOSTipo from "../ModalOSTipo/ModalOSTipo";

function ChartOSTipo() {
    const [menuRapido, setMenuRapido] = React.useState('hoje');
    const [dataInicial, setDataInicial] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dataFinal, setDataFinal] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dados, setDados] = React.useState([])
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
    const [modalStats, setModalStats] = React.useState(false);
    const [dadosModal, setDadosModal] = React.useState([]);
    const [labelModal, setLabelModal] = React.useState([]);
    const [quantidade, setQuantidade] = React.useState(0);
  
    

    useEffect( ()=>{
      async function jsons(){
      const counts=[];
        (dados && dados.forEach((x) => {
          counts[x['tipo']] = (counts[x['tipo']] || 0) + 1;
        }))
        return counts;
       }
        if(Object.keys(dados).length > 0){
               
        jsons().then(async (counts)=> {
          
          const mapped = Object.entries(counts).map(([k,v]) => [`${k}`,parseInt(`${v}`), `${v}`, 'green']);
          mapped.unshift(['Tecnico', "Quantidade", { role: "annotation", type: "string" },  { role: "style"}])
          setQuantidade(Object.keys(dados).length)
          return mapped;
          
        }).then((result) =>  {
        setGrafico(result)
        })
        setBackdrop(!backdrop)
        }else{
          const vazio = [['sem dados','sem dados'],[0,0]];
          setGrafico(vazio)
          setQuantidade(0)
          setBackdrop(!backdrop)
     }
     
    },[dados])

    useEffect(()=> {
       setBackdrop(!backdrop)
      
      api.post(`/os_realizada_concluida_map`, { data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
        .then(result => {
           setDados(result.data);
           });
        }, [menuRapido])


    const handleChange = (event) => {
      if(event.target.value === 'hoje'){
        setDataInicial(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}))
        setDataFinal(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}))   
      }else if(event.target.value === 'ontem'){
        let dateNow = new Date();
        let dia_ontem = dateNow.getDate() - 1;
        let ontem = new Date(dateNow.setDate(dia_ontem)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        setDataInicial(ontem);
        setDataFinal(ontem);
      }else if(event.target.value === 'anteontem'){
        let dateNow = new Date();
        let dia_ontem = dateNow.getDate() - 2;
        let anteontem = new Date(dateNow.setDate(dia_ontem)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        setDataInicial(anteontem);
        setDataFinal(anteontem);
      }else if(event.target.value === 'semanaAtual'){
        const dateNow = new Date();
        const semana_inicio = dateNow.getDate() - dateNow.getDay();
        const semana_ultimo = semana_inicio + 6;
          if (semana_inicio + 6 <= 6) {
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
      }else{
        var date = new Date();
        var data_inicial = new Date(date.getFullYear(), 0, 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        var data_final = new Date(date.getFullYear(), 11, 31).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        setDataInicial(data_inicial);
        setDataFinal(data_final);
      }
      setMenuRapido(event.target.value);
    };

    const handleFiltrarClick = () =>{
      setBackdrop(!backdrop)
      api.post(`/os_realizada_concluida_map`, { data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
      .then(result => {
         setDados(result.data);
         });
    }

    const options = {
        title:
        'O.S realizada por Tipo',
        legend: {
            position: "none"
        },
            chartArea:{ 
              width: '90%'
      }
      };


      const chartEvents = [
        {
          eventName: "select",
          callback({ chartWrapper }) {
            const itemSelected = grafico[chartWrapper.getChart().getSelection()[0].row + 1][0]
            chartWrapper.getChart().setSelection(null,null);
            var modal = [];
            const counts=[];
            (dados && dados.forEach((x) => {
              if(x.tipo === itemSelected){
              counts[x['tecnico_responsavel']] = (counts[x['tecnico_responsavel']] || 0) + 1;
              }
            }))

            const mapped = Object.entries(counts).map(([k,v]) => [`${k}`,parseInt(`${v}`)]);
            for(var i=0; i<mapped.length; i++){

                modal.push({id: i, tipo: mapped[i][0], quantidade: mapped[i][1]})
            }
            
           
            const cabecalho =   ['Tipo de OS', 'Quantidade']
            console.log(cabecalho)
            console.log(modal)
           setLabelModal(cabecalho);
           setDadosModal(modal);
           setModalStats(true);
          }
        }
      ];

  return (
      <>
      
      <Grid container spacing={2}>
     <ModalOSTipo status={modalStats} label={labelModal} dados={dadosModal} event={()=>{setModalStats(false)}}></ModalOSTipo>
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
          <MenuItem value={'hoje'}>Hoje</MenuItem>
          <MenuItem value={'ontem'}>Ontem</MenuItem>
          <MenuItem value={'anteontem'}>Anteontem</MenuItem>
          <MenuItem value={'semanaAtual'}>Semana Atual</MenuItem>
          <MenuItem value={'semanaPassada'}>Semana Passada</MenuItem>
          <MenuItem value={'mesAtual'}>Mês Atual</MenuItem>
          <MenuItem value={'mesPassado'}>Mês Passado</MenuItem>
          <MenuItem value={'anoCorrente'}>Ano Corrente</MenuItem>
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
                renderInput={(params) => <TextField {...params} />}
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
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>          
    </Grid>
    <Grid item xs={12} md={2} sm={2}>
      <Button onClick={handleFiltrarClick} sx={{height: '100%'}} variant="contained">Filtrar</Button>          
    </Grid>
    <Grid item xs={12} md={2} sm={2}>
    <Typography variant="h4" gutterBottom component="div">
        Total: {quantidade}
      </Typography>        
    </Grid>
    
    </Grid>
    {grafico && (
      
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={grafico && grafico}
      options={options}
      chartEvents={chartEvents}
    />
   
  )}

       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
   </>
  );
}
export default ChartOSTipo;