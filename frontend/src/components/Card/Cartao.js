import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useState, useLayoutEffect, useEffect} from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CancelIcon from '@mui/icons-material/Cancel';
import WarehouseIcon from '@mui/icons-material/Warehouse';

 function Cartao (props) {
    
    const[dados, setDados] = useState([]);
   
    useEffect(()=>{
        setDados(props.dados)

    })

    return (
        
  <Card {...props} variant="outlined" style={{border: '2px solid black'}}> 
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {props.titulo}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {props.valor}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: props.color,
              height: 56,
              width: 56
            }}
          >
            
            {props.icone &&
                (() => {
                  if(props.icone == 'Ligações Recebidas'){
                   return(<PhoneCallbackIcon/>)
                  }else if(props.icone == 'Avaliação colaborador'){
                   return(<AnalyticsIcon/>)
                  }else if(props.icone =='Tempo de Espera'){
                    return(<PhoneInTalkIcon/>)
                 }else if(props.icone =='Estoque'){
                    return(<WarehouseIcon/>)
                  
                }else if(props.icone =='Comodato'){
                  return(<PersonIcon/>)
                
              }else if(props.icone =='funcionario'){
                return(<EngineeringIcon/>)
                  
                }else if(props.icone =='perdido'){
                  return(<CancelIcon/>)
                }
              else if(props.icone =='outros'){
                return(<InventoryIcon/>)
              }else{
                    return(<AnalyticsIcon/>)
                  }
                })()  
            }  
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 1
        }}
      >
        <ArrowUpwardIcon color="success" /> 
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
        
        
        </Typography>
       <Typography
          color="textSecondary"
          variant="caption"
        >
          {dados && dados.map((item)=>{
              return (
                <>
                {item.nome}: {item.valor}
                <br/>
                </>
              )
          })}
       
        </Typography> 
      </Box>
    </CardContent>
  </Card>
);
        }export default Cartao;