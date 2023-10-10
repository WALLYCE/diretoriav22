import { Grid } from "@mui/material";
import ChartColunm from "../../../components/ChartColunm/ChartColunm";
import ChartVendasVendedores from "../../../components/ChartColunm/ChartVendasVendedores";
import ChartTodasRenovacoesVendedor from "../../../components/ChartColunm/ChartTodasRenovacoesVendedor";
import ChartOSTecnicoTempoMap from "../../../components/ChartColunm/ChartOSTecnicoTempoMap";
import ChartOSTecnicoTempoRede from "../../../components/ChartColunm/ChartOSTecnicoTempoRede";
import ChartOSRemarcadas from "../../../components/ChartColunm/ChartOSRemarcadas";
import ChartOSTipoTempo	 from "../../../components/ChartColunm/ChartOSTipoTempo";
import ChartOSTecnicoTempoRedeMap   from "../../../components/ChartColunm/ChartOSTecnicoTempoRedeMap";
function OrdemServicoTempoExecutada(){

    return(
        <>
         <Grid>
         <Grid item xs={12} md={12} mt={3} sm={12} sx={{ borderBottom: 1  }}>
        <ChartOSTecnicoTempoRedeMap  color={''} title="OS por Técnico" titulo={'vendedor'}></ChartOSTecnicoTempoRedeMap>
        </Grid>
        <Grid item xs={12} md={12} mt={3} sm={12} sx={{ borderBottom: 1  }}>
        <ChartOSTecnicoTempoMap  color={''} title="OS por Técnico" titulo={'vendedor'}></ChartOSTecnicoTempoMap>
        </Grid>
        <Grid item xs={12} md={12} mt={3} sm={12} sx={{ borderBottom: 1  }}>
        <ChartOSTecnicoTempoRede  color={''} title="OS por Técnico" titulo={'vendedor'}></ChartOSTecnicoTempoRede>
        </Grid>
        <Grid item xs={12} md={12} mt={3} sm={12} sx={{ borderBottom: 1  }}>
        <ChartOSRemarcadas color={''} title="Ordem de Serviço Remarcadas" titulo={'vendedor'}></ChartOSRemarcadas>
        </Grid>
        <Grid item xs={12} md={12} mt={3} sm={12} sx={{ borderBottom: 1  }}>
        <ChartOSTipoTempo color={''} title="Ordem de Serviço Tempo Total - desde Atendimento" titulo={'vendedor'}></ChartOSTipoTempo>
        </Grid>
        </Grid>
        </>
    )

}

export default OrdemServicoTempoExecutada;