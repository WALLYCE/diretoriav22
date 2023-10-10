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

function ChartOsTecnicoTempoRedeMap(props) {
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
    const [qtd_dentro_prazo, setQtd_dentro_prazo] = React.useState(0);
    const [qtd_fora_prazo, setQtd_fora_prazo] = React.useState(0);
  
    

    useEffect( ()=>{
      async function jsons(){
      const dentroPrazo=[];
      const foraPrazo =[];
        (dados && dados.forEach((x) => {
          if(x['situacao'] == 'Dentro do tempo estipulado'){
            dentroPrazo[x['tecnico']] = (dentroPrazo[x['tecnico']] || 0) + 1;
          }else{
            foraPrazo[x['tecnico']] = (foraPrazo[x['tecnico']] || 0) + 1;
          }
          
      
        }))
    

        var final = [];
        for(var i in dentroPrazo){
          var achou = false;
          for(var j in foraPrazo){
            if(i === j){
              achou = true;
              var valor = [dentroPrazo[i], foraPrazo[j]];
              final[i] = valor
              
            }
          }
          if(achou === false){
            final[i]  = [dentroPrazo[i], 0]
          }
        }
       console.log(final)

        return final;
       }
        if(Object.keys(dados).length > 0){
         
        jsons().then(async (counts)=> {

          var novo =[];
          
          var dentroPrazo =0;
          var foraPrazo =0;
          for (const [key, value] of Object.entries(counts)) {
            novo.push([key, parseInt(value[0]), parseInt(value[0]), parseInt(value[1]), parseInt(value[1])])

            
            dentroPrazo += parseInt(value[0]);
            foraPrazo +=  parseInt(value[1]);
           
          }
          setQtd_dentro_prazo(dentroPrazo)
          setQtd_fora_prazo(foraPrazo)
          novo.unshift([ 'Tecnico', "Dentro do Prazo",{ role: "annotation", type: "string" }, "Fora do Prazo",{ role: "annotation", type: "string" }])
        
          
          
          return novo;
          
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
      console.log(dataInicial)
      const novadataInicial_array = dataInicial.split(',')

      api.post('/relatorio_tecnicos_rede/ordem_servico/tempo_execucao',{ data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
        .then(result => {
          
           setDados(result.data);

           });
        }, [menuRapido])


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
      setBackdrop(!backdrop)
      api.post('/relatorio_tecnicos_rede/ordem_servico/tempo_execucao',{ data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })

        .then(result => {
          setDados(result.data); 
        });
    }

    const options = {
      title: "Rede e Map - Ordem de serviços realizadas e não realizadas no prazo",
      vAxis: { title: "Quantidade" },
      hAxis: { title: "Tecnico", 
      textStyle : {
        fontSize: 13 // or the number you want
    }},
      seriesType: "bars",
      series: { 5: { type: "line" } }
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
             console.log(Object.values(element)[2])
             if(Object.values(element)[2] === itemSelected){
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
    <Grid item xs={12} md={4} sm={4}>
    <Typography variant="h4" gutterBottom>
       Total: {qtd_dentro_prazo  + qtd_fora_prazo  }
    
     <br/> Média no Prazo: {(qtd_dentro_prazo*100/(qtd_dentro_prazo  + qtd_fora_prazo)).toFixed(2) }%
      </Typography>     
    </Grid>
 
    
    </Grid>
    {grafico && (
      
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="600px"
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
export default ChartOsTecnicoTempoRedeMap;