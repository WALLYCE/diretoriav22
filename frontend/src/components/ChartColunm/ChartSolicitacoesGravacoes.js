import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, filledInputClasses } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ModalGraficoLigacoes from "../ModalGraficoLigacoes/ModalGraficoLigacoes";
import Typography from '@mui/material/Typography';
import api from "../../services/api";
import ModalGrafico from "../ModalGrafico/ModalGrafico";
import Cartao from "../Card/Cartao";
function ChartSolicitacoesGravacoes(props) {
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
    const [solicitacoes_atendidas_prazo, setSolicitacoesAtendidasPrazo] = React.useState(0);
    const [solicitacoes_atendidas_fora_prazo, setSolicitacoesAtendidasForaPrazo] = React.useState(0);
    const [solicitacoes_n_atendidas, setSolicitacoesNaoAtendidas] = React.useState(0);
    useEffect( ()=>{
     
        async function jsons(){
          const counts=[];
          var n_atendidas=0;
          var atendidas=0;
          var atendidas_fora_prazo = 0;
            (dados && dados.forEach((x) => {
              counts[x['status']] = (counts[x['status']] || 0) + 1;
              if(x['status'] == 'Não Atendidas'){
                n_atendidas++;
              }else if(x['status'] == 'Atendidas no Prazo'){
                atendidas++;
              }else{
                atendidas_fora_prazo ++;
              }
         
            }))
            setSolicitacoesAtendidasForaPrazo(atendidas_fora_prazo)
            setSolicitacoesAtendidasPrazo(atendidas)
            setSolicitacoesNaoAtendidas(n_atendidas)
            return counts;
           }
            if(Object.keys(dados).length > 0){
                   
            jsons().then(async (counts)=> {
              
              const mapped = Object.entries(counts).map(([k,v]) => [`${k}`,parseInt(`${v}`), `${v}`, 'purple']);
              mapped.unshift(['Status', "Quantidade", { role: "annotation", type: "string" },  { role: "style"}])
              setQuantidade(Object.keys(dados).length)
              return mapped;
              
            }).then((result) =>  {
            setGrafico(result)
            setBackdrop(false)
            })
           
            }else{
              const vazio = [['sem dados','sem dados'],[0,0]];
              setGrafico(vazio)
              setQuantidade(0)
              setBackdrop(false)
         }
    },[dados])

    useEffect(()=> {
       setBackdrop(false)
      
      api.post('/ligacoes/solicitacoes_gravacoes',{ data_inicial: dataInicial, data_final: dataFinal})
        .then(result => {
           
           setDados(result.data);
           setBackdrop(false)

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
      setBackdrop(false)
      api.post('/ligacoes/solicitacoes_gravacoes', { data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
        .then(result => {
          setDados(result.data); 
        });
    }

    const options = {
        title:
        'Solicitacões de Gravações',
        legend: {
            position: "bottom"
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
             if(Object.values(element)[0] === itemSelected){
             
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
        Total: {quantidade}
      </Typography>        
    </Grid>
    
    </Grid>
    <Grid container mt={1} mb={1} spacing={1}>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Solicitações Recebidas'} icone={'Avaliação colaborador'} valor={quantidade} color={'blue'}/>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Respondidas no Prazo'} icone={'Avaliação colaborador'} valor={((solicitacoes_atendidas_prazo*100)/quantidade).toFixed(2)+(' %')}  color={'green'}/>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Respondidas fora do Prazo'} icone={'Avaliação colaborador'} valor={((solicitacoes_atendidas_fora_prazo*100)/quantidade).toFixed(2)+(' %')}  color={'yellow'}/>
        </Grid>
        <Grid item xs={3} md={3}  sm={3}>
         <Cartao titulo={'Não Respondidas'} icone={'Avaliação colaborador'} valor={((solicitacoes_n_atendidas*100)/quantidade).toFixed(2)+(' %')}  color={'red'}/>
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
export default ChartSolicitacoesGravacoes;