import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import api from "../../../services/api"

function Ex_Clientes_Prospecto(props) {
    const [backdrop, setBackdrop] = React.useState(false);
    const [labels, setLabels] = useState([]);
    const [dados, setDados] = useState([])
    const [cidades, setCidades] = useState([]);
    const [cidade, setCidade] = useState('')
    const[prospecto, setProspecto] = React.useState(0)
 

  const handleChange = (event) => {
    setCidade(event.target.value);
  };

  const handleChangeProspecto = (event) => {
    setProspecto(event.target.value);
  };

    useEffect(()=>{
      handleGetCidades();
    },[])
   
    const handleGetCidades = () =>{
      api.get(`/cidades/atendidas`)
        .then(result => { 
          if(result.data.length=== 0){
            setLabels(['dados']);
            setDados([])
          }else{
          setCidades(result.data);
          }
          setBackdrop(false)
        })
    }

    const handleGetDados = () =>{
        api.post(`/clientes_inativos_prospecto`,{city: cidade, fprospecto: prospecto})
          .then(result => { 
    
            if(result.length=== 0){
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
        { field: 'id', headerName: 'Código', width: 100},
        { field: 'nome', headerName: 'Nome', width: 250},
        { field: 'telefone', headerName: 'Telefone', width: 200},
        { field: 'telefone2', headerName: 'Telefone2', width: 200},
        { field: 'cidade', headerName: 'Cidade', width: 200 },
        { field: 'prospecto', headerName: 'Prospecto', width: 200 }
      ];
      





 

 const handleClickFiltrar = () =>{
    console.log(prospecto)
    console.log(cidade)
  setBackdrop(true)
  handleGetDados()
 }

  return (
      <>
        <Typography variant="h3">Ex-Clientes para Prospecto</Typography>
  <Grid container mt={2} spacing={2}>
  
    <Grid item xs={12} md={2} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Cidade</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={cidade}
                        label="Cidade"
                        onChange={handleChange}
                    >
                        {cidades && cidades.map((item, index)=> {
                        return( <MenuItem key={index} value={item.nome}>{item.nome}</MenuItem>)
                        })}
                    
                    </Select>
            </FormControl>
    </Grid>

    <Grid item xs={12} md={2} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="prospecto">Prospecto</InputLabel>
                    <Select
                        labelId="prospecto"
                        id="demo-simple-select-prospecto"
                        value={prospecto}
                        label="Prospecto"
                        onChange={handleChangeProspecto}
                    >
                        <MenuItem  value={0}>Todos</MenuItem>
                        <MenuItem  value={-1}>Inexistente</MenuItem>
                        <MenuItem  value={1}>Realizado</MenuItem>
                        
                    
                    </Select>
            </FormControl>
    </Grid>

    <Grid item xs={12} md={2} sm={2}>
      <Button sx={{height: '100%'}} onClick={handleClickFiltrar} variant="contained">Filtrar</Button>          
    </Grid>
    </Grid>


    <div style={{ height: 500, width: '100%' }}>
    <DataGrid
            rows={dados && dados}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[500]}
            Height={500}
            sx={{height: '500'}} 
            MinHeight="500"
           />     
</div>

       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
   </>
  );
}
export default Ex_Clientes_Prospecto;