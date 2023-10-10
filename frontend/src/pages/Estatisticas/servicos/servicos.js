import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import api from "../../../services/api"
import ChartProgressaoCS from "../../../components/ChartLine/ChartProgressaoCS";

function Servicos(){
const [dados, setDados] = React.useState(null);
    
 useEffect(()=>{
    async function getDados(){
    var valores= [];
    var i=0;
    var inicio = true;
    var result = await api.get(`/servicos`);
    result.data.map((item)=>{
        if(inicio ===true){
        valores.push([item]);
        inicio = false;
        }else{
                if(valores[i][0]['nome'] === item['nome']){
                    valores[i].push(item)
                }else{
                    
                    valores.push([item])
                    i = i+1;
                }
        }  
        
       })
 setDados(valores)
    }
    

  getDados();
 },[])

    return(
        <>
        {dados && dados.map((array, index)=>{
            return(
                <Grid key={index} item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
                <ChartProgressaoCS dados={array} nome={array[0]['nome']}></ChartProgressaoCS>
                </Grid>
            )
        })}
         
        
        </>
    )

}

export default Servicos;