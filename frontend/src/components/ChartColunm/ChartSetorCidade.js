import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalVendasSetorCidade from '../../components/ModalVendasSetorCidade/ModalVendasSetorCidade';
import api from "../../services/api"

export default function ChartSetorCidade(){
    const [menuRapido, setMenuRapido] = React.useState('hoje');
    const [dataInicial, setDataInicial] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [dataFinal, setDataFinal] = React.useState(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
    const [backdrop, setBackdrop] = React.useState(false);
    const [dados, setDados] = React.useState([]);
    const [dadosGrafico, setDadosGrafico] = React.useState([]);
    const [dadosModal, setDadosModal] = React.useState([])
    const [modalStatus, setModalStatus] = React.useState(false)
    const [totalVendas, setTotalVendas] = React.useState(0)


    

    
    useEffect(()=>{
        getDados();
    },[menuRapido])    


    async function getDados(){
     
        setBackdrop(true)
        const result = await api.post(`/vendas/setor`, {data_inicial: dataInicial, data_final: dataFinal});
        const cidades_atendidas = await api.get(`/cidades/atendidas`);
        setDados(result.data)

        function agregaVendasExternas(data){
            const counts =[]
            data.forEach((x) => {
            if(x.setor == 'Vendas Externo'){
             counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
            }
            })
    
         return counts;
         }


         function agregaVendasInternas(data){
          const counts =[]
          data.forEach((x) => {
          if(x.setor == ' Vendas'){
            counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
          }
          })

       return counts;
       }

       function agregaVendasTerceirizada(data){
        const counts =[]
        data.forEach((x) => {
        if(x.setor == 'Vendas Terceirizada'){
          counts[x['cidade']] = (counts[x['cidade']] || 0) + 1;
        }
        })

     return counts;
     }

     function agregaCidades(data){
      const counts =[]
      data.forEach((x) => {
    
        counts[x['cidade']] = (counts[x['cidade']] || 0);
      
      })

      const mappedCidades = Object.entries(counts).map(([k,v]) => `${k}`);
      return  mappedCidades;
    }
        const cidades = await agregaCidades(result.data)
        const Externa = await agregaVendasExternas(result.data);
        const Interna = await agregaVendasInternas(result.data);
        const Terceirizada = await agregaVendasTerceirizada(result.data);
        const mappedExterna = Object.entries(Externa).map(([k,v]) => [`${k}`,parseInt(`${v}`)]);
        const mappedInterna = Object.entries(Interna).map(([k,v]) => [`${k}`,parseInt(`${v}`)]);
        const mappedTerceirizada = Object.entries(Terceirizada).map(([k,v]) => [`${k}`,parseInt(`${v}`)]);
        const resultado = []
        var totaldeVenda =0;

        for(var i=0; i<cidades.length; i++){
          var interna = null;
          var externa = null;
          var terceirizada = null;

          for(var j=0; j<mappedExterna.length; j++){
            if(cidades[i] == mappedExterna[j][0]){
              externa = mappedExterna[j][1];
              break;
            }
          }
          for(var k=0; k<mappedInterna.length; k++){
            if(cidades[i] == mappedInterna[k][0]){
              interna = mappedInterna[k][1];
              break;
            }
          }

          for(var l=0; l<mappedTerceirizada.length; l++){
            if(cidades[i] == mappedTerceirizada[l][0]){
              terceirizada = mappedTerceirizada[l][1];
              break
            }
          }
          var stringInterna ='';
          var stringExterna='';
          var stringTerceirizada='';

          if(interna!=null){
            stringInterna = interna.toString();
          }
          if(externa!=null){
            stringExterna = externa.toString();

          }
          if(terceirizada!=null){
            stringTerceirizada = terceirizada.toString()
          }
       
          var total = interna+externa+terceirizada;
          totaldeVenda+=total;
          resultado.push([cidades[i]+'('+total+')', interna, stringInterna, externa, stringExterna, terceirizada, stringTerceirizada])
        }
        setTotalVendas(totaldeVenda)
        cidades_atendidas.data.forEach((item)=>{
          var aux = false;
          for(var i=0; i<resultado.length; i++){
            const city = resultado[i][0].split('(');
            if(city[0] == item.nome){
              aux = true;
              break;
            }
          }  
          if(aux ===false){
            resultado.push([item.nome+'(0)',0,0,0,0,0,0])
          }
        })
        

        function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
        }
       resultado.sort(sortFunction)
       resultado.unshift([
        "Cidade",
        "Interna",
        { role: "annotation", type: "string" },
        "Externa",
        { role: "annotation", type: "string" },
        "Tercerizada",
        { role: "annotation", type: "string" }
      ])

       //console.log('este e o resultado', resultado)
        setDadosGrafico(resultado)
        setBackdrop(false)
       }


       const options = {
        title: "Vendas por Cidade",
        chartArea: { width: "90%" },
        isStacked: true,
        hAxis: {
          minValue: 0,
          textStyle : {
            fontSize: 12 // or the number you want
        }
        },
        vAxis: {
          title: "Cidade",

        },
        legend: {
          position: "top"
      },
      };
      

      const handleChange = (event) => {
        if(event.target.value === 'hoje'){
          setDataInicial(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}))
          setDataFinal(new Date().toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}))   
        }else if(event.target.value === 'ontem'){
          let dateNow = new Date();
          let dia_ontem = dateNow.getDate() - 1;
          let ontem = new Date(dateNow.setDate(dia_ontem)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          setDataInicial(ontem);
          setDataFinal(ontem);
        }else if(event.target.value === 'anteontem'){
          let dateNow = new Date();
          let dia_ontem = dateNow.getDate() - 2;
          let anteontem = new Date(dateNow.setDate(dia_ontem)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          setDataInicial(anteontem);
          setDataFinal(anteontem);
        }else if(event.target.value === 'semanaAtual'){
          const dateNow = new Date();
          const semana_inicio = dateNow.getDate() - dateNow.getDay();
          const semana_ultimo = semana_inicio + 6;
            if (semana_inicio + 6 <= 6) {
                const data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
                const data_final_aux = new Date(dateNow.setDate(semana_ultimo));
                const data_final = new Date(data_final_aux.setMonth(data_final_aux.getMonth() + 1)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
                setDataInicial(data_inicial);
                setDataFinal(data_final);
            } else {
                const data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
                const data_final = new Date(dateNow.setDate(semana_ultimo)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
                setDataInicial(data_inicial);
                setDataFinal(data_final);
            }
            
        }else if(event.target.value === 'semanaPassada'){
          let dateNow = new Date();
          let dateNow2 = new Date();
          let semana_inicio = dateNow.getDate() - dateNow.getDay() - 7;
          let semana_ultimo = semana_inicio + 6;
          let data_inicial = new Date(dateNow.setDate(semana_inicio)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          let data_final = new Date(dateNow2.setDate(semana_ultimo)).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          setDataInicial(data_inicial);
          setDataFinal(data_final);
        }else if(event.target.value === 'mesAtual'){
          let date = new Date();
          let data_inicial = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          let data_final = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          setDataInicial(data_inicial);
          setDataFinal(data_final);
        }else if(event.target.value === 'mesPassado'){
          let date = new Date();
          let data_inicial = new Date(date.getFullYear(), date.getMonth() - 1, 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          let data_final = new Date(date.getFullYear(), date.getMonth(), 0).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          setDataInicial(data_inicial);
          setDataFinal(data_final);
        }else{
          var date = new Date();
          var data_inicial = new Date(date.getFullYear(), 0, 1).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          var data_final = new Date(date.getFullYear(), 11, 31).toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'});
          setDataInicial(data_inicial);
          setDataFinal(data_final);
        }
        setMenuRapido(event.target.value);
      };
  
      const handleFiltrarClick = () =>{
        getDados();
      }
  
      const chartEvents = [
        {
          eventName: "select",
          callback({ chartWrapper }) {
            const RowSelected =  dadosGrafico[chartWrapper.getChart().getSelection()[0].row + 1][0]
            var ColSelected = dadosGrafico[0][chartWrapper.getChart().getSelection()[0].column]
            const modal = [];
            if(ColSelected === 'Interna'){
            ColSelected = ' Vendas';
            }else if(ColSelected === 'Externa'){
              ColSelected = 'Vendas Externo';
            }else{
              ColSelected = 'Vendas Terceirizada'
            }

            const removeTag = (string)=>{
              if(string!=undefined){
              if(string.indexOf(")") != -1){
                var nome = string.split(')')
                return nome[1];
              }else{
                return string;
              }
            }else{
              return '';
            }
           
            }
            
            var count = 1;
            dados.map((item)=> {
              var city = RowSelected.split('(')
              if(item.cidade === city[0] && item.setor === ColSelected){
                modal.push({id: count, codigo: item.codigo, nome: item.nome , status: item.status, vendedor: removeTag(item.vendedor), data: item.data, plano: item.plano, setor: item.setor})
                count = count+1;
              }
            })

            setDadosModal(modal)
            setModalStatus(true)
            chartWrapper.getChart().setSelection(null,null); 
            }
            
  
        }
      ];
  

  
    return (
        <>
        
        <Grid container spacing={2}>
        <ModalVendasSetorCidade dados={dadosModal} status={modalStatus} event={()=>{setModalStatus(false)}} />
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
            <MenuItem value={'hoje'}>Hoje</MenuItem>
            <MenuItem value={'ontem'}>Ontem</MenuItem>
            <MenuItem value={'anteontem'}>Anteontem</MenuItem>
            <MenuItem value={'semanaAtual'}>Semana Atual</MenuItem>
            <MenuItem value={'semanaPassada'}>Semana Passada</MenuItem>
            <MenuItem value={'mesAtual'}>Mês Atual</MenuItem>
            <MenuItem value={'mesPassado'}>Mês Passado</MenuItem>
            <MenuItem value={'anoCorrente'}>Ano Corrente</MenuItem>
          </Select>
        </FormControl> 
      </Grid>
      <Grid item xs={12} md={2} sm={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  label="Data Inicial"
                  value={dataInicial}
                  
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                  setDataInicial(newValue.toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>          
      </Grid>
      
      <Grid item xs={12} md={2} sm={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  label="Data Final"
                  value={dataFinal}
                  
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                  setDataFinal(newValue.toLocaleString("en-US", {timeZone: 'America/Sao_Paulo'}));
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
              </LocalizationProvider>          
      </Grid>
      <Grid item xs={12} md={2} sm={2}>
        <Button onClick={handleFiltrarClick} sx={{height: '100%'}} variant="contained">Filtrar</Button>          
      </Grid>
      <Grid item xs={12} md={2} sm={2}>
      <Typography variant="h4" gutterBottom component="div">
       Total: {totalVendas}
        </Typography>        
      </Grid>
      
      </Grid>
        <Chart
        chartType="ColumnChart"
        width="100%"
        height="500px"
        data={dadosGrafico}
        options={options}
        chartEvents={chartEvents}
      />
  
         <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
       
     </>
    );


}