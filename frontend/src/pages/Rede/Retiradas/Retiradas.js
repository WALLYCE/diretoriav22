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
import ModalOnusNaoRetiradas from '../../../components/ModalOnusNaoRetiradas/ModalOnusNaoRetiradas';
import api from '../../../services/api';

export default function Retiradas(){
    const [menuRapido, setMenuRapido] = React.useState('hoje');
    const [dataInicial, setDataInicial] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dataFinal, setDataFinal] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [backdrop, setBackdrop] = React.useState(false);
    const [dados, setDados] = React.useState([]);
    const [dadosGrafico, setDadosGrafico] = React.useState([]);
    const [valCancelamentos, setValCancelamentos] = React.useState(0);
    const [valRetiradas, setValRetiradas] =  React.useState(0);
    const [valNaoRetiradas, setValNaoRetiradas] = React.useState(0);
    const [dadosModal, setDadosModal] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)


    useEffect(()=>{     
     getDados();
    },[])

    
    useEffect(()=>{
        getDados();
    },[menuRapido])    


    async function getDados(){
        setBackdrop(true)
        try{
        const result = await  api.post('/clientes_servicos_onus_retiradas', {data_inicial: dataInicial, data_final: dataFinal});
        setDados(result.data)

        function agregaCancelados(data){
            const counts =[]
            data.forEach((x) => {
            console.log(x)
            counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
            })
        return counts;
         } 

         function agregaRetirados(data){
            const counts =[]
            data.forEach((x) => {
            if(x.onu ==='-'){
             counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
            }
            })
        return counts;
         } 

      function agregaNaoRetirados(data){
            const counts =[]
            data.forEach((x) => {
            if(x.onu !=='-'){
             counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
            }
            })
        return counts;
         } 


        const cancelamentos = await agregaCancelados(result.data);
        const retirados = await agregaRetirados(result.data);
        const NaoRetirados = await agregaNaoRetirados(result.data);
        
        console.log(cancelamentos)
        console.log(retirados)
        const array = [
            [
                "Cidade",
                "Cancelamentos",
                {type: 'string', role: 'annotation'},
                "Retiradas",
                {type: 'string', role: 'annotation'},
                "Não Retiradas",
                {type: 'string', role: 'annotation'}
               
           
          ]
        ];
        const mappedCancel = Object.entries(cancelamentos).map(([k,v]) => [`${k}`,parseInt(`${v}`)])
        const mappedRet = Object.entries(retirados).map(([k,v]) => [`${k}`,parseInt(`${v}`)]);
        const mappedNRetirados = Object.entries(NaoRetirados).map(([k,v]) => [`${k}`,parseInt(`${v}`)])

        for(var i = 0; i<mappedCancel.length; i++){
            let  r = 0;
            let nr = 0;
             for(var j=0; j<mappedRet.length; j++){
                if(mappedCancel[i][0] === mappedRet[j][0]){
                    r = mappedRet[j][1];
                    break;
                }
             }
             for(var k =0; k<mappedNRetirados.length; k++){
                if(mappedCancel[i][0] === mappedNRetirados[k][0]){
                   nr = mappedNRetirados[k][1];
                    break;
                }
             }
          array.push([mappedCancel[i][0], mappedCancel[i][1],mappedCancel[i][1], r,r, nr,nr]);
        }
        
        var c = 0;
        var r = 0;
        var nr =0;
        for( i=1; i<array.length; i++){
        c += parseInt(array[i][1]);
        r += parseInt(array[i][3]);
        nr+= parseInt(array[i][5]);
        }
        setValCancelamentos(c);
        setValRetiradas(r);
        setValNaoRetiradas(nr);
        setDadosGrafico(array)
        setBackdrop(false)
      }catch(erro){
        console.log("erro foi ")
      } 
       }



      
      const options = {
        title: "Retiradas de ONUS",
        hAxis: { title: "Cidade" },
        seriesType: "bars",
        series: {
            0: { color: '#FF0000' },
            1: { color: '#0000FF' },
            2: { color: '#f1ca3a' },
          }
     
      };

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
  
      const handleFiltrarClick = () =>{
        getDados();
      }
  
      const chartEvents = [
        {
          eventName: "select",
          callback({ chartWrapper }) {
            const itemSelected = dadosGrafico[chartWrapper.getChart().getSelection()[0].row + 1][0]
            console.log(itemSelected)
            const array =[];
            chartWrapper.getChart().setSelection(null,null);  chartWrapper.getChart().setSelection(null,null);
            dados.map((item)=>{
             if(item.cidade === itemSelected && item.onu!=='-' ){
                console.log(item)
                array.push({id: item.id_cliente_servico, codigo: item.codigo_cliente, nome: item.nome, cidade: item.cidade, onu: item.onu, os_executadas: item.os_executadas})
             }
            })
            
            console.log(array.length)
           
            if(array.length === 0){
                alert('não existem onus a serem retiradas')
            }else{
            setDadosModal(array)
            setModalStatus(true)
            }
          }
        }
      ];
  

  
    return (
        <>
        
        <Grid container spacing={2}>
        <ModalOnusNaoRetiradas dados={dadosModal} status={modalStatus} event={()=>{setModalStatus(false)}} />
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
      <Grid item xs={12} md={1} sm={1}>
        <Button onClick={handleFiltrarClick} sx={{height: '100%'}} variant="contained">Filtrar</Button>          
      </Grid>
      <Grid item xs={12} md={1} sm={1}>
      <Typography variant="h8" gutterBottom component="div">
          Cancelados:
        </Typography> 
        <Typography variant="h8" gutterBottom component="div">
        {valCancelamentos}
        </Typography> 
               
      </Grid>
      <Grid item xs={12} md={1} sm={1}>
      <Typography variant="h8" gutterBottom component="div">
          Retirados:
        </Typography> 
        <Typography variant="h8" gutterBottom component="div">
         {valRetiradas}
        </Typography>       
      </Grid>
      <Grid item xs={12} md={2} sm={2}>
      <Typography variant="h8" gutterBottom component="div">
          Não Retirados:
        </Typography> 
        <Typography variant="h8" gutterBottom component="div">
          {valNaoRetiradas}
        </Typography> 
               
      </Grid>
      </Grid>
        <Chart
        chartType="ComboChart"
        width="100%"
        height="400px"
        data={dadosGrafico && dadosGrafico}
        options={options}
        chartEvents={chartEvents}
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