import { Grid } from "@mui/material";
import ChartColunm from "../../../components/ChartColunm/ChartColunm"
function Hdtvs(){
    return (
        <Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ borderBottom: 1  }}>
          <ChartColunm url={`/hdtvs/cidade`} color={''} title="Instalações de HDTV por cidade" titulo={'cidade'}></ChartColunm>
        </Grid>
        
        </Grid>
    )
}
export default Hdtvs;