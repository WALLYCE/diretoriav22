import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react';

function ModalOSTipo(props) {

  const [dados, setDados] = useState(props.dados)

      const columns = [
        { field: 'id', headerName: 'ID', width: 100},
        { field: 'tipo', headerName: 'Técnico', width: 300},
        { field: 'quantidade', headerName: 'Quantidade', width: 300 },
      ];
      
          
useEffect(()=>{
    setDados(props.dados)
    console.log('entrou')
},[props.status])


  return (
      <Dialog scroll={'body'} maxWidth={'md'}  fullWidth={true} open={props.status} onClose={props.event}>
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
export default ModalOSTipo;