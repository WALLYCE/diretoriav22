import { Grid } from "@mui/material";
import ChartLigacoes from '../../components/ChartColunm/ChartLigacoes';
import ChartLigacoesRecebidas from "../../components/ChartColunm/ChartLigacoesRecebidas";
import ChartLigacoesRealizadas from "../../components/ChartColunm/ChartLigacoesRealizadas";

function Sac(){
    return (
    <Grid >
  

          <Grid item xs={12} mt={2} md={12} sm={12} sx={{ borderBottom: 1  }}>
           <ChartLigacoesRecebidas color={''} title="Ligações recebidas por Agente SAC" titulo={'Ligações recebidas por Agente SAC'} url={'/ligacoes/recebidas/sac'}></ChartLigacoesRecebidas> 
          {/* <ChartLigacoes color={''} title="Ligações recebidas pela Cobrança" titulo={'ramal'} url={'/ligacoes/recebidas/cobranca'}></ChartLigacoes> */}
  
          </Grid>

  
        <Grid item xs={12} mt={2} md={12} sm={12} sx={{ borderBottom: 1  }}>
           <ChartLigacoesRealizadas color={''} title="Ligações efetivas realizadas por agente" titulo={'Ligações efetivas realizadas por agente'} url={'/ligacoes/realizadas/sac'}></ChartLigacoesRealizadas> 
          {/* <ChartLigacoes color={''} title="Ligações recebidas pela Cobrança" titulo={'ramal'} url={'/ligacoes/recebidas/cobranca'}></ChartLigacoes> */}
  
          </Grid>
          </Grid>
       
    )
}
export default Sac;