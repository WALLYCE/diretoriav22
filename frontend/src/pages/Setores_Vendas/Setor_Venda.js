import { Grid } from "@mui/material";
import ChartColunm from "../../components/ChartColunm/ChartColunm";
import ChartSetorCidade from '../../components/ChartColunm/ChartSetorCidade'
function Setor_Venda(){
    return (
        <Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ borderBottom: 1  }}>
        <ChartColunm url={`/setor/venda`} color={''} title="Vendas por Setor" titulo={'setor'}></ChartColunm>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ borderBottom: 1 , marginTop: 2}}>
             <ChartSetorCidade url={`/setor/venda`} color={''} title="Vendas por Setor" titulo={'setor'}></ChartSetorCidade>
        </Grid>
        </Grid>
    )
}
export default Setor_Venda;