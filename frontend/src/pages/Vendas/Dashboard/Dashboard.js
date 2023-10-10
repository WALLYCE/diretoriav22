import { Grid } from "@mui/material";
import ChartBarBalance from "../../../components/ChartBalance/ChartBalance";
import ChartCancelamentosCidade from "../../../components/ChartColunm/ChartCancelamentosCidade";
import ChartCancelamentos from '../../../components/ChartLine/ChartCancelamentos'
import ChartVendas from '../../../components/ChartLine/ChartVendas'
import ChartSetorCidade from '../../../components/ChartColunm/ChartSetorCidade'
import ChartGoal from "../../../components/ChartGoal/ChartGoal";
import ChartVendasVendedores from "../../../components/ChartColunm/ChartVendasVendedores";
import {ModalMetasContextProvider} from '../../../context/ModalMetasContext'
function Dashboard(){
    return (
        <Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ borderBottom: 1  }}>
        <ChartSetorCidade color={''} title="Vendas por Cidade" titulo={'cidade'}></ChartSetorCidade>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 5, borderBottom: 1  }}>
        <ChartVendas color={''} title="Vendas por Cidade" titulo={'cidade'}></ChartVendas>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartCancelamentosCidade color={'#FF0000'} title="Cancelamentos por Cidade" titulo={'cidade'}></ChartCancelamentosCidade>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartCancelamentos color={'#FF0000'} title="Cancelamentos por Cidade" titulo={'cidade'}></ChartCancelamentos>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartBarBalance/>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ChartVendasVendedores/>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ marginTop: 10, borderBottom: 1  }}>
        <ModalMetasContextProvider>
         <ChartGoal/>
        </ModalMetasContextProvider>   
        </Grid>
        </Grid>
    )
}
export default Dashboard;