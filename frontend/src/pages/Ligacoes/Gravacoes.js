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
import api from "../../services/api";
import { DataGrid } from '@mui/x-data-grid';
import ReactAudioPlayer from 'react-audio-player'
import { Box } from "@material-ui/core";

function Gravacoes(props) {
    const [menuRapido, setMenuRapido] = React.useState('hoje');
    const [dataInicial, setDataInicial] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dataFinal, setDataFinal] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dados, setDados] = React.useState([])
    const [backdrop, setBackdrop] = React.useState(false)
    const [ramal, setRamal] = React.useState('')
    const [telefone, setTelefone] = React.useState('')



    const columns = [
        { field: 'id', headerName: 'ID', width: (window.innerWidth*0.10)},
        { field: 'ramal', headerName: 'Ramal',width: (window.innerWidth*0.10) },
        { field: 'data_ligacao', headerName: 'Data', width: (window.innerWidth*0.15) },
        { field: 'modo', headerName: 'Contexto', width: (window.innerWidth*0.15), style: {backgroundColor: 'red'}},
        { field: 'telefone', headerName: 'Telefone',width: (window.innerWidth*0.19) },
        { field: 'download', width: (window.innerWidth*0.25), headerName: 'Gravação', renderCell: (params) => {
        var link = "http://192.168.88.254/gravacoes/"+params.row.id+".wav"
            return  <ReactAudioPlayer
            src={link}
            controls
          />
          }
        },
      ];



    useEffect(()=> {
       setBackdrop(!backdrop)
      api.post('/ligacoes/gravacoes',{ data_inicial: dataInicial, data_final: dataFinal, ramal: ramal, telefone:telefone})
        .then(result => {
        
           setDados(result.data);
           setBackdrop(false)
           });
        }, [menuRapido])


const changeRamal = (event) =>{
    setRamal(event.target.value)
}
   
const changeTelefone = (event) =>{
    setTelefone(event.target.value)
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
      api.post('/ligacoes/gravacoes',{ data_inicial: dataInicial, data_final: dataFinal, ramal: ramal, telefone:telefone})
        .then(result => {
          setDados(result.data); 
          setBackdrop(false)
        });
    }

   




  return (
      <>
      
      <Grid container spacing={1}>
      <Grid item xs={2} sm={2} md={2}>  
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
         
    <Grid item xs={2} md={2} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Data Inicial"
                value={dataInicial}
                inputFormat="dd/MM/yyyy"
                onChange={(newValue) => {
                setDataInicial(newValue.toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />}
            />
            </LocalizationProvider>          
    </Grid>

    <Grid item xs={2} md={2} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                fullWidth
                label="Data Final"
                value={dataFinal}
                inputFormat="dd/MM/yyyy"
                onChange={(newValue) => {
                setDataFinal(newValue.toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%'}} />}
            />
            </LocalizationProvider>          
    </Grid>


    <Grid item xs={1} md={1} sm={1}>
    <TextField
          id="outlined-helperText"
          label="Ramal"
          value={ramal}
          onChange={changeRamal}
        />
        
    </Grid>

    <Grid item xs={1} md={1} sm={1}>
    <TextField
          id="outlined-helperText"
          label="Telefone"
          value={telefone}
          onChange={changeTelefone}
        />
        
    </Grid>


    
    <Grid item xs={1} md={1} sm={1}>
        
      <Button onClick={handleFiltrarClick} sx={{height: '100%'}} variant="contained">Filtrar</Button>          
    </Grid>
      </Grid>

    
    
 



    <Grid container mt={2}>
     <Box
      sx={{
        height: 900,
        width: '100%',
        '& .recebida': {
          backgroundColor: '#2EBB2E',
          color: '#1a3e72',
        },
        '& .realizada': {
          backgroundColor: '#749AF7',
          color: '#1a3e72',
        },
        '& .transferida': {
            backgroundColor: '#FF5733',
            color: '#1a3e72',
          },
      }}
    >
    <DataGrid
        rows={dados}
        columns={columns}
        
        initialState={{
          pagination: {
            paginationModel: { page: 5, pageSize: 10 },
          },
        }}

        getCellClassName={(params) => {
           if(params.row.modo =='Chamada Realizada'){
            return 'realizada';
           }else if(params.row.modo =='Chamada Recebida'){
            return 'recebida';
           }else{
            return 'transferida'
           }
          
          }}

        pageSizeOptions={[5, 10]}
      />

      </Box>
    </Grid>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
   </>

   
  );
}
export default Gravacoes;