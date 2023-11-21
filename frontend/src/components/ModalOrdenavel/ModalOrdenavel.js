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

function ModalOrdenavel(props) {

  const [dados, setDados] = useState(props.dados)

      const columns = [
        { field: 'id', headerName: 'Código', width: 100},
        { field: 'nome', headerName: 'Nome', width: 300},
        { field: 'telefone', headerName: 'Telefone', width: 200},
        { field: 'vencimento', headerName: 'Venc. Contrato', width: 200},
        { field: 'cidade', headerName: 'Cidade', width: 300 },
      ];
      
          
useEffect(()=>{
    setDados(props.dados)
    console.log('entrou')
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
export default ModalOrdenavel;