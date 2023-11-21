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

function ChartBalance(props) {
    const [menuRapido, setMenuRapido] = React.useState('hoje');
    const [dataInicial, setDataInicial] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dataFinal, setDataFinal] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dados, setDados] = React.useState([])
    const [vendas, setVendas] =  React.useState([])
    const [cancelamentos,setCancelamentos] = React.useState([])
    const [vendasValor, setVendasValor] =  React.useState()
    const [cancelamentosValor,setCancelamentosValor] = React.useState()
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
    const [modalStats, setModalStats] = React.useState(false);
    const [dadosModal, setDadosModal] = React.useState([]);
    const [labelModal, setLabelModal] = React.useState([]);
    const [quantidade, setQuantidade] = React.useState(0);


 useEffect(()=> {
  
 
  api.post(`/vendas/cidade`, { data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
   .then(result => {
      setVendas(result.data);
      var counts=[];
        (result.data && result.data.forEach((x) => {
          counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
        }))  
      api.post(`/cancelamentos/cidade`,{ data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
          .then(resultado => {
            var cancels=[];
            (resultado.data && resultado.data.forEach((x) => {
              cancels[x['cidade']] = (cancels[x['cidade']] || 0) + 1;
            }))
            calculaSaldo(counts, cancels);
          })
   })
   }, [menuRapido])

function calculaSaldo(vendas, cancelamentos){
  const mapped_vendas = Object.entries(vendas).map(([k,v]) => [`${k}`,parseInt(`${v}`)]);
  const mapped_cancelamentos =  Object.entries(cancelamentos).map(([k,v]) => [`${k}`,parseInt(`${v}`)]);
  console.log(mapped_cancelamentos)
  var arrayGrafic = []
  var somatorio = 0;
  mapped_vendas.map((item) =>{
    const index = mapped_cancelamentos.findIndex((obj) => obj[0] == item[0])
      if(index!=-1){   
        const val = mapped_cancelamentos[index][1];
        var saldo = item[1] - mapped_cancelamentos[index][1];
        somatorio += saldo     
        arrayGrafic.push([item[0], parseInt(item[1]), item[1], val,  val, saldo,  saldo])
        mapped_cancelamentos.splice(index,1);
      }else{
        somatorio += item[1];
        arrayGrafic.push([item[0], parseInt(item[1]),item[1], 0, '0', parseInt(item[1]),  item[1]])
      }
  })
  mapped_cancelamentos.map((item) =>{
    somatorio -= item[1];
    arrayGrafic.push([item[0], 0,'0', parseInt(-1*item[1]),parseInt(-1*item[1]),  parseInt(-1*item[1]),  parseInt(-1*item[1])])
  })
console.log(arrayGrafic.length )
  if(arrayGrafic.length == 0){
    
    arrayGrafic.push(["Sem valores", 0,'0',0,'0',0,'0'])
  }
if(backdrop){
  setBackdrop(!backdrop)
}
function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
      
}

arrayGrafic = arrayGrafic.sort(sortFunction)
arrayGrafic.unshift(["Cidade", "Venda",  { role: "annotation", type: "string" }, "Cancelamento", { role: "annotation", type: "string" }, "Saldo", { role: "annotation", type: "string" }])

setQuantidade(somatorio)
setGrafico(arrayGrafic)
}





const handleFiltrarClick = () => {
setBackdrop(true)
   api.post(`/vendas/cidade`,{ data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
   .then(result => {
      setVendas(result.data);
      var counts=[];
        (result.data && result.data.forEach((x) => {
          counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
        }))
        
      api.post(`/cancelamentos/cidade`, { data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
          .then(resultado => {
            var cancels=[];
            (resultado.data && resultado.data.forEach((x) => {
              cancels[x['cidade']] = (cancels[x['cidade']] || 0) + 1;
            }))
            calculaSaldo(counts, cancels);
            setBackdrop(false)

          })
        })

}




    const handleChange = (event) => {
      setBackdrop(!backdrop)
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
      }else{
        var date = new Date();
        var data_inicial = new Date(date.getFullYear(), 0, 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        var data_final = new Date(date.getFullYear(), 11, 31).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
        setDataInicial(data_inicial);
        setDataFinal(data_final);
      }
      setMenuRapido(event.target.value);
    };


    const options = {
        title:
        'Balanço de Vendas e Cancelamentos',
        legend: {
            position: "none"
        },
            chartArea:{ 
              width: '90%'
      },
      hAxis: {
        textStyle : {
          fontSize: 15 // or the number you want
      }
      },
      };


      const chartEvents = [
        {
          eventName: "select",
          callback({ chartWrapper }) {
    
            const itemSelected = grafico[chartWrapper.getChart().getSelection()[0].row + 1][0]
            chartWrapper.getChart().setSelection(null,null);
            
           var modal = []; 
            dados.map((element)=>{
             if(Object.values(element)[0] === itemSelected){
              const minimodal = Object.keys(element).map(function(key) {
                return  element[key];
              }); 
              modal.push(minimodal) 
            }      
            })

            const cabecalho = Object.keys(dados[0])
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
export default ChartBalance;