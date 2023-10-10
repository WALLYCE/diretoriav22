import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { Grid } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import api from "../../services/api";

function ChartOSRede(props) {

    const [dados, setDados] = React.useState([])
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
  
    

    useEffect(()=>{
        getDadosGrafico();
     
    },[])

   const getDadosGrafico = async() =>{
    setBackdrop(true)
    const resultado = await api.post('/relatorio_tecnicos_rede/ordem_servico/periodo')
    const array =[];
    array.push(['Data', 'Quantidade', {type: 'string', role:'annotation'}]);
    if(resultado.data.length > 0){
        resultado.data.forEach((item)=>{
        array.push([item['data'], parseInt(item['quantidade']), parseInt(item['quantidade'])])
        })
    }else{
        array.push(['sem dados',0,0])
    }

    setGrafico(array)
    setBackdrop(false)
   }


    const options = {
        title: `Ordem de Serviço da Rede mês a mês`,
        hAxis: {
          title: "Data",
        },
        vAxis: {
          title: "Quantidade",
        },
        series: {
          1: { curveType: "function" },
        },
        pointSize: 20,
      };



  return (
      <>
      
      <Grid container spacing={2}>
      <Grid item xs={10} sm={2} md={2}>  
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
export default ChartOSRede;