import ChartPadrao from '../../components/ChartQualidade/ChartPadrao'
import ChartPadraoLigacoes from '../../components/ChartQualidade/ChartPadraoLigacoes'
import { Grid } from "@mui/material";


export default function Dashboard(){

    return (<>
       <Grid >
  


        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
           <ChartPadrao titulo={'Retenção'} url={'/qualidade/retencao'} nome={'retencao'}/>

        </Grid>

        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
           <ChartPadraoLigacoes titulo={'Ligações Cobrança'} url={'/qualidade/ligacoes_cobranca'} nome={'ligacoes_cobranca'}/>

        </Grid>

        <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
           <ChartPadraoLigacoes titulo={'Ligações Vendas'} url={'/qualidade/ligacoes_vendas'} nome={'ligacoes_vendas'}/>

        </Grid>
  </Grid>
    </>)
}