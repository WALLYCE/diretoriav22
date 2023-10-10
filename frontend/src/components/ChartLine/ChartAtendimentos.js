import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import api from "../../services/api"

function ChartAtendimentos(props) {
    const [menuRapido, setMenuRapido] = React.useState('Geral');
    const [dados, setDados] = React.useState([])
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
    const [cidades, setCidades] = React.useState(0);
  
    

    useEffect(()=>{
        const array =[];
        array.push(['Data', 'Atendimentos',{type: 'string', role:'annotation'}, 'Viraram O.S', {type: 'string', role:'annotation'}]);
        if(dados.length >0){
            dados.forEach((item)=>{
            array.push([`${item['periodo']}`, parseInt(item['quantidade']), parseInt(item['quantidade']), parseInt(item['viraram_os']),parseInt(item['viraram_os'])])
            })
        }else{
            array.push(['sem dados',0,0, 0,0])
        }
       setGrafico(array);
       console.log(array)
       setBackdrop(!backdrop)
     
    },[dados])


    useEffect(()=> {        
     setBackdrop(!backdrop)
     api.post(`/atendimentos_sac/periodo`,{Local: menuRapido})
        .then((result)=> {
           setDados(result.data);
           });
      
        }, [menuRapido])



    const handleChange = (event) => {
     setMenuRapido(event.target.value)
    };

 useEffect(()=>{
    async function atualizaCidade(){
    const cidades = await api.get(`/cidades/atendidas`);
    setCidades(cidades.data);
    }
 atualizaCidade();
 },[])

    const options = {
        title: 'Atendimentos mês a mês',
        hAxis: {
          title: "Mês/Ano",
        },
        vAxis: {
          title: "Quantidade",
        },
        series: {
          1: { curveType: "function" },
        },
        pointSize: 10,
      };



  return (
      <>
      
      <Grid container spacing={2}>
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
          <MenuItem key={Math.random()} value={'Geral'}>Geral</MenuItem>
          {cidades && cidades.map((cidade)=>{
            return(
                <MenuItem key={Math.random()} value={cidade['nome']}>{cidade['nome']}</MenuItem>
            )
          })}
          
        </Select>
      </FormControl> 
    </Grid>

    
    </Grid>
    {grafico && (
      
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={grafico && grafico}
      options={options}
    />
   
  )}

       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
   </>
  );
}
export default ChartAtendimentos;