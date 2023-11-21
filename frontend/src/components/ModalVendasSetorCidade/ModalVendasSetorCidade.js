import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react';

function ModalOrdenavel(props) {

  const [dados, setDados] = useState(props.dados)

      const columns = [
        { field: 'id', headerName: 'Nº', width: 50},
        { field: 'codigo', headerName: 'Código', width: 100},
        { field: 'nome', headerName: 'Nome', width: 300},
        { field: 'vendedor', headerName: 'Vendedor', width: 200},
        { field: 'data', headerName: 'Data Venda', width: 100},
        { field: 'setor', headerName: 'Setor', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        { field: 'plano', headerName: 'Plano', width: 400 },
      ];
      
          
useEffect(()=>{
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
        pageSize={7}
        rowsPerPageOptions={[7]}

        
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