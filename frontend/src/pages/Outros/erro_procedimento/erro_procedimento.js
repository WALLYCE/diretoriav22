import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from "../../../services/api"
import ModalAtendimento from '../../../components/ModalAtendimento/ModalAtendimento';


export default function ErroProcedimento() {



    const [backdrop, setBackdrop] = useState(false);
    const [minimoFaturas, setMinimoFaturas] = useState(2);
    const [labels, setLabels] = useState([]);
    const [dados, setDados] = useState([])
    const [modalAtendimento, setModalAtendimento] = useState(false)
    const [protocoloAtendimento, setProtocoloAtendimento] = useState(0)
 
    useEffect(()=>{
        setBackdrop(true)
        handleGetDados();
      },[])
     
      const handleGetDados = () =>{
        api.get(`/erro_procedimento`)
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


        
        const columns = [
          { field: 'id', headerName: 'Protocolo', width: 200},
          { field: 'abertura', headerName: 'Usuario de abertura', width: 300},
          { field: 'data_cadastro', headerName: 'data', width: 300},
          { field: 'id_atendimento', headerName: 'Ação', width: 300, renderCell: (params) => {
            return <Button variant="contained" id_atendimento={params.id} onClick={handlerClickButtonVisualizar} >Visualizar</Button>;
          }}
        ];
        const handlerClickButtonVisualizar = (event) =>{
          const id = event.target.getAttribute('id_atendimento');
          setProtocoloAtendimento(id);
          setModalAtendimento(true)
          }
          

  return (
    <>
    <ModalAtendimento  status={modalAtendimento} protocolo={protocoloAtendimento} event={()=>{setModalAtendimento(false)}}/>
    <Typography variant="h3">Atendimentos de erro de procedimento</Typography>
    <Grid container mt={2} spacing={2}>
    <Grid item xs={12} md={12} sm={12}>
    <div style={{ height: 1080, width: '100%' }}>
      <DataGrid
        rows={dados && dados}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
    </Grid>
    </Grid>
</>
  );
}
