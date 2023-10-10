import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { Grid } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ModalGrafico from "../ModalGrafico/ModalGrafico";
import api from "../../services/api";

function ChartColunm(props) {
    const [menuRapido, setMenuRapido] = React.useState('hoje');
    const [dados, setDados] = React.useState([])
    const [grafico, setGrafico] = React.useState(null)
    const [backdrop, setBackdrop] = React.useState(false)
    const [modalStats, setModalStats] = React.useState(false);
    const [dadosModal, setDadosModal] = React.useState([]);
    const [labelModal, setLabelModal] = React.useState([]);
    const [quantidade, setQuantidade] = React.useState(0);
  
    

    useEffect( ()=>{

     const jsons = async ()=>{
        const mapped = [];
        dados.map((item) => {
          mapped.push([item.cidade, parseFloat(item.ticket_medio), parseFloat(item.ticket_medio)])
        });


          function sortFunction(a, b) {
              if (a[0] === b[0]) {
                  return 0;
              }
              else {
                  return (a[0] < b[0]) ? -1 : 1;
              }
          }



        var novo = mapped.sort(sortFunction);
        novo.unshift([ 'Cidade', "Valor", { role: "annotation", type: "string" }])         
        return novo;
     }
        if(Object.keys(dados).length > 0){
    
        jsons().then((result) =>  {
        setGrafico(result)
        setBackdrop(!backdrop)
        })

        }else{
          const vazio = [['sem dados','sem dados'],[0,0]];
          setGrafico(vazio)
          setQuantidade(0)
          setBackdrop(!backdrop)
     }
     
    
    }, [dados])

    useEffect(()=> {
       setBackdrop(!backdrop)
      
      api.post('/ticket_medio_pf/cidade')
        .then(result => {
           setDados(result.data);

           });
        }, [])




    const options = {
        title:
        'Ticket Médio de Pessoa Física por Cidade (Sem considerar Descontos)',
        legend: {
            position: "none"
        },
            chartArea:{ 
              width: '90%'
      },
      hAxis: {
        textStyle : {
          fontSize: 13 // or the number you want
      }
      }
      };


      const chartEvents = [
        {
          eventName: "select",
          callback({ chartWrapper }) {
            const itemSelected = grafico[chartWrapper.getChart().getSelection()[0].row + 1][0]
            chartWrapper.getChart().setSelection(null,null);
          
            api.post('/plano/ativo/cidade', {cidade: itemSelected}).then((result)=>{
                const cabecalho = ['Cidade','Quantidade', 'Plano', 'Valor'];
                const array=[]
                result.data.map((element)=>{
                    array.push([element['cidade'], element['quantidade'], element['plano'], element['valor']])
                })




                setLabelModal(cabecalho);
                setDadosModal(array);
                setModalStats(true);
            }
           
            );
           
               
            
            

          }
        }
      ];

  return (
      <>
      
      <Grid container spacing={2}>
     <ModalGrafico status={modalStats} label={labelModal} dados={dadosModal} event={()=>{setModalStats(false)}}></ModalGrafico>
      <Grid item xs={10} sm={2} md={2}>  

    </Grid>
    
    </Grid>
    {grafico && (
      
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={grafico && grafico}
      options={options}
      chartEvents={chartEvents}
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