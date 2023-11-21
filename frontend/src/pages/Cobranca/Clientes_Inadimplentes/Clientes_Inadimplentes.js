import React, { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Clientes_Inadimplentes(props) {
    const [backdrop, setBackdrop] = React.useState(false);
    const [minimoFaturas, setMinimoFaturas] = useState(2);
    const [labels, setLabels] = useState([]);
    const [dados, setDados] = useState([])
 
    
    useEffect(()=>{
      setBackdrop(true)
      handleGetDados();
    },[])
   
    const handleGetDados = () =>{
      fetch(`${process.env.REACT_APP_BASE_URL}/clientes_em_inadimplencia`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({minimo: minimoFaturas})
       }).then(res => res.json())
        .then(result => { 
  
          if(result.length== 0){
            setLabels(['dados']);
            setDados([])
          }else{
          setLabels(Object.keys(result[0]));
          setDados(result)
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
  setMinimoFaturas(value);
 }

 const handleClickFiltrar = () =>{
  setBackdrop(true)
  handleGetDados()
 }

  return (
      <>
        <Typography variant="h3">Clientes em inadimplência</Typography>
  <Grid container mt={2} spacing={2}>
  
    <Grid item xs={12} md={2} sm={2}>
         <TextField id="outlined-basic" sx={{width: '100%'}} type="number" value={minimoFaturas} onChange={handleChangeOS} label="Nº mínimo de faturas" variant="outlined" />
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
                  <StyledTableCell align="left">{row.cidade}</StyledTableCell>     
                  <StyledTableCell align="left">{row.faturas}</StyledTableCell>  
                  <StyledTableCell align="left">{row.valor}</StyledTableCell>  
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
export default Clientes_Inadimplentes;