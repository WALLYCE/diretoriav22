import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import api from "../../services/api"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function ChartColunm(props) {
   
    const [dados, setDados] = React.useState([])
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
    const [quantidade, setQuantidade] = React.useState(0);


    useEffect( ()=>{
      async function jsons(){
        const counts=[];
        (dados && dados.forEach((x) => {
          counts.push([x.cidade, parseInt(x.quantidade), x.quantidade, 'blue']);
        }))
        return counts;
    }
        if(Object.keys(dados).length > 0){  
        jsons().then(async (counts)=> {
          counts.unshift(['Cidade', "Quantidade", { role: "annotation", type: "string" }, {role: "style" }])
          setQuantidade(Object.keys(dados).length)
          return counts;
        }).then((result) =>  {
        setGrafico(result)});
        setBackdrop(!backdrop)
        console.log(grafico)
        }else{
        console.log('vazio')
          const vazio = [['sem dados','sem dados'],[0,0]];
          setGrafico(vazio)
          setQuantidade(0)
          setBackdrop(!backdrop)
     }
     
    },[dados])

    useEffect(()=> {
       setBackdrop(!backdrop)
      
      api.get('/cliente_servico/valor/cidade').then(res => res.json())
        .then(result => {
           setDados(result.data);
           });
        }, [])

 

    const options = {
        title:
        'Serviços por Cidade',
        legend: {
            position: "none"
        },
            chartArea:{ 
              width: '90%'
      }
      };




  return (
      <>
    {grafico && (
      
    <Chart
      chartType="ColumnChart"
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
export default ChartColunm;