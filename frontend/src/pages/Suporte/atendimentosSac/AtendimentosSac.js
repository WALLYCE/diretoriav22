import { Grid } from "@mui/material";
import ChartAtendimentosSac from "../../../components/ChartColunm/ChartAtendimentosSac";
import ChartAtendimentos from "../../../components/ChartLine/ChartAtendimentos";
function AtendimentosSac(){
    return (
        <Grid>
              <Grid item xs={12} mt={3} md={12} sm={12} sx={{ borderBottom: 1  }}>
        <ChartAtendimentos ></ChartAtendimentos>
        </Grid>
        <Grid item xs={12} mt={3} md={12} sm={12} sx={{ borderBottom: 1  }}>
        <ChartAtendimentosSac color={'#0047AB'} title="Atendimentos por tipo" titulo={'tipo'}></ChartAtendimentosSac>
        </Grid>
        <Grid item xs={12} mt={3} md={12} sm={12} sx={{ borderBottom: 1  }}>
        <ChartAtendimentosSac color={'#008000'} title="Atendimentos por Colaborador" titulo={'colaborador'}></ChartAtendimentosSac>
        </Grid>

        <Grid item xs={12} mt={3} md={12} sm={12} sx={{ borderBottom: 1  }}>
        <ChartAtendimentosSac color={'#FFBF00'} title="Atendimentos por Cidade" titulo={'cidade'}></ChartAtendimentosSac>
        </Grid>

      
        </Grid>
    )
}
export default AtendimentosSac;