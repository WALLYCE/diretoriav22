import React, { useEffect, useLayoutEffect} from "react";
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
import api from "../../services/api"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PrintIcon from '@mui/icons-material/Print';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import ModalProdutoItemEstoque from "../../components/ModalEstoque/ModalProdutoItemEstoque";
import * as XLSX from 'xlsx'
import ModalProdutoEstoque from "../../components/ModalEstoque/ModalProdutoEstoque";
import { id } from "date-fns/locale";
function ControleCompras(props) {
    const [menuRapido, setMenuRapido] = React.useState('hoje');
    const [dataInicial, setDataInicial] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dataFinal, setDataFinal] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dados, setDados] = React.useState([])
    const [backdrop, setBackdrop] = React.useState(false)
    const [modalStats, setModalStats] = React.useState(false);;
    const [modalProdutoItemEstoque, setModalProdutoItemEstoque] = React.useState(false)
    const [dadosProdutoCompraProduto, setDadosProdutoCompraProduto] = React.useState([])
    const [modalProdutoEstoque, setModalProdutoEstoque] = React.useState(false)



    const handleImprimeClick = ()=>{
      var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(dados)
      XLSX.utils.book_append_sheet(wb, ws, "MinhaPlanilha")
      XLSX.writeFile(wb, "File.xlsx")
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




      useLayoutEffect(()=>{
       atualizaDados()
    }, []
    )

    useEffect(()=> {
  
      atualizaDados();
   
        }, [menuRapido])


 const handleClickDetalhes = async(e)=>{
  console.log(e)
  if(e.agrupado == 'Não'){
  setModalProdutoItemEstoque(true)
  setDadosProdutoCompraProduto(e)
  }else{
    console.log(e)
    setModalProdutoEstoque(true)
  }
  }


   const atualizaDados = async()=>{
   setBackdrop(true)
   setDados([])
   const result = await api.post('/estoque/compras_realizadas',{ data_inicial: dataInicial.split('T')[0], data_final: dataFinal.split('T')[0] })
   setDados(result.data)
   setBackdrop(false)

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

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];
      


  
 

  return (
      <>
      <Grid container spacing={2}>
      <ModalProdutoItemEstoque dados={dadosProdutoCompraProduto} open={modalProdutoItemEstoque} close={()=> {setModalProdutoItemEstoque(false)}}></ModalProdutoItemEstoque>
      <ModalProdutoEstoque dados={dadosProdutoCompraProduto} open={modalProdutoEstoque} close={()=> {setModalProdutoEstoque(false)}}></ModalProdutoEstoque>

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
      <Button onClick={handleImprimeClick} sx={{height: '100%'}} variant="contained"  color="success"><PrintIcon></PrintIcon></Button>          
    </Grid>
    <Grid item xs={12}>
  


    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Cod Compra</StyledTableCell>
            <StyledTableCell align="right">Nome do produto</StyledTableCell>
            <StyledTableCell align="right">Quantidade</StyledTableCell>
            <StyledTableCell align="right">Unidade de Medida</StyledTableCell>
            <StyledTableCell align="right">Data da Compra</StyledTableCell>
            <StyledTableCell align="right">Status Compra</StyledTableCell>
            <StyledTableCell align="right">Valor Unitário</StyledTableCell>
            <StyledTableCell align="right">Valor Total</StyledTableCell>
            <StyledTableCell align="right">Agrupado</StyledTableCell>
            <StyledTableCell align="right">Detalhar</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.map((row) => (
            <StyledTableRow key={row.id_produto_compra_produto}>
              <StyledTableCell  key={row.id_produto_compra_produto} component="th" scope="row">
              {row.codigo_compra}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nome}</StyledTableCell>
              <StyledTableCell align="right">{row.quantidade}</StyledTableCell>
              <StyledTableCell align="right">{row.abreviacao}</StyledTableCell>
              <StyledTableCell align="right">{row.data_compra}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.valor_unitario}</StyledTableCell>
              <StyledTableCell align="right">{row.valor_total}</StyledTableCell>
              <StyledTableCell align="right">{row.agrupado}</StyledTableCell>
              <StyledTableCell align="right">
             {row.status == 'Recebido do Fornecedor' ?  <Button variant="contained"  value={row} color="success" onClick={()=>handleClickDetalhes(row)}>
                    Visualizar Detalhes
                    </Button> 
                    :  <Button variant="contained"  value={row} color="success" onClick={()=>handleClickDetalhes(row)} disabled>
                    Aguardando Entrega
                    </Button>} 
             

              </StyledTableCell>
            </StyledTableRow>
          ))}
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
export default ControleCompras;