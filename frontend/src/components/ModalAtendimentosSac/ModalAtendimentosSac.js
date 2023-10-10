import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react';

function ModalAtendimentosSac(props) {

  const [dados, setDados] = useState(props.dados)

  const columns = [
    { field: 'id', headerName: 'ID', width: 50},
    { field: 'protocolo', headerName: 'Protocolo', width: 200},
    { field: 'cliente', headerName: 'Nome', width: 300},
    { field: 'tipo', headerName: 'Tipo', width: 200},
    { field: 'data_cadastro', headerName: 'data', width: 100},
    { field: 'cidade', headerName: 'Cidade', width: 200 },
    { field: 'colaborador', headerName: 'Colaborador', width: 200 },
    { field: 'numero_os', headerName: 'Nº O.S', width: 130 },
  ];
  
          
useEffect(()=>{
    console.log(props.dados)
    setDados(props.dados)

},[props.status])


  return (
      <Dialog scroll={'body'} maxWidth={'xl'}  fullWidth={true} open={props.status} onClose={props.event}>
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
export default ModalAtendimentosSac;