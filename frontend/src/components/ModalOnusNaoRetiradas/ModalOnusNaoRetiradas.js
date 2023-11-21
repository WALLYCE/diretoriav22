import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react';

function ModalOnusNaoRetiradas(props) {

  const [dados, setDados] = useState(props.dados)

      const columns = [
        { field: 'id', headerName: 'ID', width: 100},
        { field: 'codigo_cliente', headerName: 'Código Cliente', width: 100},
        { field: 'nome', headerName: 'Nome', width: 300},
        { field: 'cidade', headerName: 'cidade', width: 200},
        { field: 'onu', headerName: 'ONU', width: 200},
        { field: 'os_executadas', headerName: 'Qtde de O.S Retirada:', width: 300 },
      ];
      
          
useEffect(()=>{
  console.log(props.dados)
    setDados(props.dados)
},[props.status])


  return (
      <Dialog scroll={'body'} maxWidth={'lg'}  fullWidth={true} open={props.status} onClose={props.event}>
        <DialogTitle>Dados</DialogTitle>
        <DialogContent >
        <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={dados && dados}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
     </div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={props.event}>Sair</Button>
        </DialogActions>
      </Dialog>
  );
}
export default ModalOnusNaoRetiradas;