import { Grid } from "@mui/material";
import ChartColunm from "../../../components/ChartColunm/ChartColunm";
import ChartVendasVendedores from "../../../components/ChartColunm/ChartVendasVendedores";
import ChartTodasRenovacoesVendedor from "../../../components/ChartColunm/ChartTodasRenovacoesVendedor";
import ChartProspectoVendedor from "../../../components/ChartColunm/ChartProspectoVendedor";
function Vendedores(){

    return(
        <>
         <Grid>
        
        <Grid item xs={12} md={12} sm={12} sx={{ borderBottom: 1  }}>
        <ChartVendasVendedores url={`vendas/vendedores`} color={''} title="Vendas por Vendedor" titulo={'vendedor'}></ChartVendasVendedores>
        </Grid>
        <Grid item xs={12} md={12} mt={3} sm={12} sx={{ borderBottom: 1  }}>
        <ChartProspectoVendedor url={`vendas/vendedores`} color={''} title="Vendas por Vendedor" titulo={'vendedor'}></ChartProspectoVendedor>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartColunm url={`/renovacoes/vendedores`} color={'#FFFF00'} title="(Somente renovação de contrato) por Vendedor" titulo={'vendedor'}></ChartColunm>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartColunm url={`/upgrade/vendedores`} color={'green'} title="(Upgrade de Plano com renovação de Contrato) por Vendedor" titulo={'vendedor'}></ChartColunm>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartColunm url={`/migracoes/vendedores`} color={'#FFFF00'} title="(Migração de Tecnologia com renovação de contrato) por Vendedor" titulo={'vendedor'}></ChartColunm>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartTodasRenovacoesVendedor color={'#722f37'} title="(Upgrade + Renovação + Migração ) por Vendedor" titulo={'vendedor'}/>
        </Grid>
        </Grid>
        </>
    )

}

export default Vendedores;