import { Grid } from "@mui/material";
import ChartLigacoesRealizadas from '../../components/ChartColunm/ChartLigacoesRealizadas';

function Qualidade(){
    return (
    <Grid >
  


          <Grid item xs={12} md={12} sm={12} mt={2} sx={{ borderBottom: 1  }}>
         <ChartLigacoesRealizadas color={''} title="Ligações realizadas qualidade (efetivas)" titulo={'Ligações realizadas qualidade (efetivas)'} url={'/ligacoes/realizadas/qualidade'}/>
       
        </Grid>
     

          </Grid>
       
    )
}
export default Qualidade;