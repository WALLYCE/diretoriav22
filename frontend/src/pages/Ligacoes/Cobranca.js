import { Grid } from "@mui/material";
import ChartLigacoesRealizadas from '../../components/ChartColunm/ChartLigacoesRealizadas';
import ChartLigacoesRecebidas from "../../components/ChartColunm/ChartLigacoesRecebidas";

function Cobranca(){
    return (
    <Grid >
  


          <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRecebidas color={''} title="Ligações recebidas Cobrança" titulo={'Ligações recebidas Cobrança'} url={'/ligacoes/recebidas/cobranca'}/>
       
        </Grid>
        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRealizadas color={''} title="Ligações realizadas Cobranca (Efetivas)" titulo={'Ligações realizadas Cobranca (Efetivas)'} url={'/ligacoes/realizadas/cobranca'}/>
       
        </Grid>

           <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRealizadas color={''} title="Ligações realizadas Cobranca Bruto (Atendidas e Não Atendidas)" titulo={"Ligações realizadas Cobranca Bruto (Atendidas e Não Atendidas)"} url={'/ligacoes/realizadas/cobranca/bruto'}/>
       
        </Grid>

          </Grid>
       
    )
}
export default Cobranca;