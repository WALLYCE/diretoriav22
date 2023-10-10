
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { Grid, tableContainerClasses } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import api from "../../../services/api"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const columns = [
  { field: 'id', headerName: 'Código', width: 100},
  { field: 'nome', headerName: 'Nome', width: 300},
  { field: 'plano', headerName: 'Plano', width: 300},
  { field: 'cidade', headerName: 'Cidade', width: 200},
  { field: 'faturas', headerName: 'Faturas', width: 100},
  { field: 'tempo', headerName: 'tempo', width: 100 },
  { field: 'valor', headerName: 'Valor', width: 100 },
  { field: 'status', headerName: 'Status', width: 200}
];
    


export default function DataTable() {

    const [backdrop, setBackdrop] = useState(false);
    const [minimoFaturas, setMinimoFaturas] = useState(2);
    const [labels, setLabels] = useState([]);
    const [dados, setDados] = useState([])
    const [atetrinta, setAteTrinta] = useState(0)
    const [maisquetrinta, setMaisquetrinta] = useState(0)
    const [totalatrasado, setTotalatrasado] = useState(0)
    useEffect(()=>{
        setBackdrop(true)
        handleGetDados();
      },[])
     
      const handleGetDados = () =>{
       api.post(`/clientes_em_inadimplencia`,{minimo: minimoFaturas})
          .then(result => { 

            if(result.data.length=== 0){
              setLabels(['dados']);
              setDados([])
            }else{
            setLabels(Object.keys(result.data[0]));
            setDados(result.data)
            
            }
           
          }).then(async ()=>{
            const resultado = await api.post(`/clientes_em_inadimplencia`,{minimo: 0})
            var total = 0;
            var uma = 0;
            var maisuma=0;
            for await (const i of resultado.data){
              total++;
              if(i.faturas == 1){
                uma = uma+1;
              }else{
                if(i.faturas>1){
                  maisuma = maisuma+1;
                }
              }
            }
            console.log(uma)
            console.log(maisuma)
            console.log(total)
            const res = await ((uma*100)/total).toFixed(2)
            const res2 = await ((maisuma*100)/total).toFixed(2)
            const res3 = await (((maisuma+uma)*100)/total).toFixed(2)
            setAteTrinta(res+"%")
            setMaisquetrinta(res2+"%");
            setTotalatrasado(res3+'%')
            setBackdrop(false)
          })
        }

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
      <Grid item xs={12} md={2} sm={2}>
      <TextField
          disabled
          id="filled-disabled"
          label="Até 30 dias"
          value={atetrinta}
          variant="filled"
        />         
      </Grid>
      <Grid item xs={12} md={2} sm={2}>
      <TextField
          disabled
          id="filled-disabled2"
          label="Mais de 30 dias"
          value={maisquetrinta}
          variant="filled"
        />         
      </Grid>
      <Grid item xs={12} md={2} sm={2}>
      <TextField
          disabled
          id="filled-disabled3"
          label="Total"
          value={totalatrasado}
          variant="filled"
        />         
      </Grid>
<Grid item xs={12} md={12} sm={12}>
    <div style={{ height: 1080, width: '100%' }}>
      <DataGrid
        rows={dados && dados}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[2]}
      />
    </div>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
    </Grid>
    </Grid>
</>
  );
}
