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
import api from "../../services/api";

function ChartOsRedeTecnico(props) {
    const [menuRapido, setMenuRapido] = React.useState('mesAtual');
    const [dataInicial, setDataInicial] = React.useState(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dataFinal, setDataFinal] = React.useState(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dados, setDados] = React.useState([])
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
    const [modalStats, setModalStats] = React.useState(false);
    const [dadosModal, setDadosModal] = React.useState([]);
    const [labelModal, setLabelModal] = React.useState([]);
    const [quantidade, setQuantidade] = React.useState(0);
  
    

    useEffect( ()=>{
      async function jsons(){
      setBackdrop(true)
      const counts=[];
        (dados && dados.forEach((x) => {
          counts[x['tecnicos']] = (counts[x['tecnicos']] || 0) + 1;
        }))
        return counts;
       }
        if(Object.keys(dados).length > 0){
    
        jsons().then(async (counts)=> {
          
          const mapped = Object.entries(counts).map(([k,v]) => [`${k}`,parseInt(`${v}`), `${v}`, props.color]);


          function sortFunction(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        }
          var novo = mapped.sort(sortFunction);
          novo.unshift([ 'tecnicos', "Quantidade", { role: "annotation", type: "string" }, {role: "style" }])
          setQuantidade(Object.keys(dados).length);
          
          
          return novo;
          
        }).then((result) =>  {
        setGrafico(result)
        })

        }else{
          const vazio = [['sem dados','sem dados'],[0,0]];
          setGrafico(vazio)
          setQuantidade(0)
  
     }
     setBackdrop(false)
    },[dados])



    useEffect(()=> {
      
     atualizaDados();
  
        }, [menuRapido])



  const atualizaDados = async()=>{
    setBackdrop(true)
    const resultado = await api.post('os_tecnicos_rede',{ data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
    const novo = await resultado.data.map((item) =>{
        item['tecnicos'] = removeTag(item['tecnicos'])
        return item;
         })
        setDados(resultado.data)
        setBackdrop(false)
  }

    const removeTag = (string)=>{
      if(string!=undefined){
      if(string.indexOf(")") != -1){
        var nome = string.split(')')
        return nome[1];
      }else{
        return string;
      }
    }else{
      return '';
    }
  
    }
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
    
        atualizaDados();
    }

    const options = {
        title:
        'Os por Técnico',
        legend: {
            position: "none"
        },
            chartArea:{ 
              width: '90%'
      },
      hAxis: {
        textStyle : {
          fontSize: 13 // or the number you want
      }
      }
      };


      const chartEvents = [
        {
          eventName: "select",
          callback({ chartWrapper }) {
            const itemSelected = grafico[chartWrapper.getChart().getSelection()[0].row + 1][0]
            chartWrapper.getChart().setSelection(null,null);
             console.log(itemSelected)


           var modal = []; 
            dados.map((element)=>{
              
             if(Object.values(element)[3].includes(itemSelected)){
              const minimodal = Object.keys(element).map(function(key) {
                return  element[key];
              }); 
              modal.push(minimodal) 
            }      
            })
            
            const cabecalho = Object.keys(dados[0]);
         
  
            setLabelModal(cabecalho);
            setDadosModal(modal);
            setModalStats(true);
          }
        }
      ];

  return (
      <>
      
      <Grid container spacing={2}>
     <ModalGrafico status={modalStats} label={labelModal} dados={dadosModal} event={()=>{setModalStats(false)}}></ModalGrafico>
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
export default ChartOsRedeTecnico;