import { Grid } from "@mui/material";

import ChartLigacoesRealizadas from '../../components/ChartColunm/ChartLigacoesRealizadas';
import ChartLigacoesRecebidas from "../../components/ChartColunm/ChartLigacoesRecebidas";
import ChartSolicitacoesGravacoes from "../../components/ChartColunm/ChartSolicitacoesGravacoes";

function Ligacoes(){
    return (
    <Grid >
  

          <Grid item xs={12} mt={2} md={12} sm={12} sx={{ borderBottom: 1  }}>
           <ChartLigacoesRecebidas color={''} title="Ligações recebidas por Agente SAC" titulo={'Ligações Recebidas Sac'} url={'/ligacoes/recebidas/sac'}></ChartLigacoesRecebidas> 
          {/* <ChartLigacoes color={''} title="Ligações recebidas pela Cobrança" titulo={'ramal'} url={'/ligacoes/recebidas/cobranca'}></ChartLigacoes> */}
  
          </Grid>

          <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRecebidas color={''} title="Ligações recebidas Cobrança" titulo={'Ligações Recebidas Cobrança'} url={'/ligacoes/recebidas/cobranca'}/>
       
        </Grid>
        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRecebidas color={''} title="Ligações recebidas Vendas" titulo={'Ligações recebidas vendas'} url={'/ligacoes/recebidas/vendas'}/>
       
        </Grid>
  

        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartSolicitacoesGravacoes color={''} title="Ligações realizadas" titulo={'ramal'} />
        </Grid>
          </Grid>
       
    )
}
export default Ligacoes;