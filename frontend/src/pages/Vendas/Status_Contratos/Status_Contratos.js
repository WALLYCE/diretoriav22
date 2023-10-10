
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import api from "../../../services/api"
import ModalOrdenavel from '../../../components/ModalOrdenavel/ModalOrdenavel'
import {Button} from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from 'xlsx';


export default function Status_Contratos(){
const[cidade,setCidade] = useState('Geral');
const[cidades,setCidades] = useState([]);
const[backdrop, setBackdrop] = useState(true)
const[dados, setDados] = useState([]);
const[faixa1, setFaixa1] = useState([]) // ate 9 meses
const[faixa2, setFaixa2] = useState([]) // de 9 a 12
const[faixa3, setFaixa3]= useState([]) // mais que 12 meses->vencido
const[modalStats1, setModalStats1] = useState(false);
const[modalStats2, setModalStats2] = useState(false);
const[modalStats3, setModalStats3] = useState(false);
const[label, setLabel] = useState(['codigo','Nome','Telefone','Telefone2', 'Vencimento', 'Cidade'])



const handleChange = (event) => {
    setCidade(event.target.value);
  };

useEffect(()=>{

    async function getDados(){
        const city= await api.get(`/cidades/atendidas`);
        city.data.unshift({nome: 'Geral'});
        setCidades(city.data);
        const val = await  api.get(`/clientes_contratos`);
        setDados(val.data);
        setBackdrop(false)
    }

getDados();

}, [])


useEffect(()=>{
const array1=[];
const array2=[];
const array3=[];


dados.map((item, index)=>{
    var date = item.vencimento.split('T')[0];
    var newDate = date.split('-')
    newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[0];
    if(cidade === 'Geral'){

        if(item.vencido<=-90){        
           
           array1.push({id: item.codigo,nome: item.nome,telefone: item.telefone,vencimento: newDate,cidade: item.cidade})
           
            
        }else if(item.vencido>-90 && item.vencido <=0){
            array2.push({id: item.codigo,nome: item.nome,telefone: item.telefone,vencimento: newDate,cidade: item.cidade})
          
        }else{
            array3.push({id: item.codigo,nome: item.nome,telefone: item.telefone,vencimento: newDate,cidade: item.cidade})
            
        }
    }else{
        if(cidade === item.cidade){
        if(item.vencido<=-90){        
            
        array1.push({id: item.codigo,nome: item.nome,telefone: item.telefone,vencimento: newDate,cidade: item.cidade})
        
            
        }else if(item.vencido>-90 && item.vencido <=0){
            array2.push({id: item.codigo,nome: item.nome,telefone: item.telefone,vencimento: newDate,cidade: item.cidade})
            
        }else{
            array3.push({id: item.codigo,nome: item.nome,telefone: item.telefone,vencimento: newDate,cidade: item.cidade})
            
        }
        }
    }
})
setFaixa1(array1);
setFaixa2(array2);
setFaixa3(array3);

}, [dados, cidade])

const data = [
    ["Tempo", "Quantidade"],
    ["de 0 a 9 meses", faixa1.length],
    ["3 últimos meses de contrato", faixa2.length],
    ["Vencidos", faixa3.length],

  ];
  
 const options = {
    title: "Serviços e Contratos",
    'chartArea': {'width': '180%', 'height': '100%'},
    title: 'Tasks Completed',
    pieHole: 0.5,
    colors: ['#008000', '#ffbf00', '#FF0000','#4E6282'],
    pieSliceText: 'value',
    sliceVisibilityThreshold :0,
    fontSize: 17,
    legend: {
      position: 'labeled'
    },

  };


  const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        console.log("Selected ", chartWrapper.getChart().getSelection()[0].row);
        const itemSelected = data[chartWrapper.getChart().getSelection()[0].row + 1][0]
        chartWrapper.getChart().setSelection(null,null);
        if(cidade!='Geral'){
            if(itemSelected === 'de 0 a 9 meses'){
                setModalStats1(true)
            }else if(itemSelected === '3 últimos meses de contrato'){
                setModalStats2(true)
            }else{
                setModalStats3(true)
            }
        }
       
      }
    }
    ]

    return (
        <>
        <Grid container mt={2} spacing={2}>
                <Grid item xs={2} >
                    
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

                <Grid item xs={3}>
              
                </Grid>

            


                <Grid item xs={12} md={12} sm={12}>
                <Chart
                        chartType="PieChart"
                        data={data}
                        chartEvents={chartEvents}
                        options={options}
                        width={"100%"}
                        height={"500px"}
                        />

                    </Grid>

        </Grid>

        <ModalOrdenavel status={modalStats1}  dados={faixa1} event={()=>{setModalStats1(false)}}></ModalOrdenavel>
        <ModalOrdenavel status={modalStats2}  dados={faixa2} event={()=>{setModalStats2(false)}}></ModalOrdenavel>
        <ModalOrdenavel status={modalStats3}  dados={faixa3} event={()=>{setModalStats3(false)}}></ModalOrdenavel>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
     
        </>
    )
}