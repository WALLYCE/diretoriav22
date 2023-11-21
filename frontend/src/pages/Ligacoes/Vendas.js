import { Grid } from "@mui/material";
import ChartLigacoesRealizadas from '../../components/ChartColunm/ChartLigacoesRealizadas';
import ChartLigacoesRecebidas from "../../components/ChartColunm/ChartLigacoesRecebidas";

function Vendas(){
    return (
    <Grid >
  

        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRecebidas color={''} title="Ligações recebidas Vendas" titulo={'Ligações recebidas Vendas'} url={'/ligacoes/recebidas/vendas'}/>
       
        </Grid>
        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRealizadas color={''} title="Ligações realizadas Vendas (Efetivas)" titulo={'Ligações realizadas Vendas (Efetivas)'} url={'/ligacoes/realizadas/vendas'}/>
       
        </Grid>

        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRealizadas color={''} title="Ligações realizadas Vendas Bruto (Atendidas+ Não Atendidas)" titulo={'Ligações realizadas Vendas Bruto (Atendidas+ Não Atendidas)'} url={'/ligacoes/realizadas/vendas/bruto'}/>
       
        </Grid>
        
          </Grid>
       
    )
}
export default Vendas;