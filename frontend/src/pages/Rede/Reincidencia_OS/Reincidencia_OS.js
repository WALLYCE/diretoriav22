import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../../../services/api"

function Reincidencia_OS(props) {
    const [dataInicial, setDataInicial] = React.useState(() =>{
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'})});
    const [dataFinal, setDataFinal] = React.useState(() =>{
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth()+1, 0).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'})});
    const [backdrop, setBackdrop] = React.useState(false);
    const [minimoOS, setMinimoOS] = useState(2);
    const [labels, setLabels] = useState([]);
    const [dados, setDados] = useState([])
 
    
    useEffect(()=>{
      setBackdrop(true)
      handleGetDados();
    },[])
   
    const handleGetDados = () =>{
      api.post(`/reincidencia_os`,{ data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0], minimo: minimoOS })
        .then(result => { 
  
          if(result.data.length=== 0){
            setLabels(['dados']);
            setDados([])
          }else{
          setLabels(Object.keys(result.data[0]));
          setDados(result.data)
          }
          setBackdrop(false)
        })
    }
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
 const handleChangeOS = (event) =>{
  const value = event.target.value;
  setMinimoOS(value);
 }

 const handleClickFiltrar = () =>{
  setBackdrop(true)
  handleGetDados()
 }

  return (
      <>
        <Typography variant="h3">Reincidências de O.S</Typography>
  <Grid container spacing={2} mt={2}>
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
    <Grid item xs={12} md={3} sm={3}>
         <TextField id="outlined-basic" type="number" value={minimoOS} onChange={handleChangeOS} label="Nº de O.S" variant="outlined" />
    </Grid>
    <Grid item xs={12} md={2} sm={2}>
      <Button sx={{height: '100%'}} onClick={handleClickFiltrar} variant="contained">Filtrar</Button>          
    </Grid>
    <Grid item xs={12} md={12} sm={12}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {labels && labels.map((item, index)=>{
               const label  = item[0].toUpperCase() + item.substring(1);
                 return(
                 <StyledTableCell key={index} align="left">{label}</StyledTableCell>
                 )
            })}

          </TableRow>
        </TableHead>
        <TableBody>
        {dados.map((row,index) =>{
                  return(
                  <StyledTableRow key={index}>
                  <StyledTableCell align="left">{row.codigo}</StyledTableCell> 
                  <StyledTableCell align="left">{row.nome}</StyledTableCell> 
                  <StyledTableCell align="left">{row.plano}</StyledTableCell>  
                  <StyledTableCell align="left">{row.tipo}</StyledTableCell>   
                  <StyledTableCell align="left">{row.cidade}</StyledTableCell>     
                  <StyledTableCell align="left">{row.quantidade}</StyledTableCell>  
                  <StyledTableCell align="left">{row.status}</StyledTableCell>  
                  </StyledTableRow>
        )

        })}
        </TableBody>
      </Table>
    </TableContainer>        
    </Grid>



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
export default Reincidencia_OS;