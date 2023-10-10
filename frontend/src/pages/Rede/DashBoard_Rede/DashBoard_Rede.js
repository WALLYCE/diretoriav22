import ChartLineRede from '../../../components/ChartLine/ChartOSRede'
import ChartOsRedeTecnico from '../../../components/ChartColunm/ChartOSRedeTecnico';
import ChartOsRedeTipo from '../../../components/ChartColunm/ChartOSRedeTipo';
import { Grid } from '@mui/material';
export default function DashBoard_Rede(){
return(<>
<Grid>
    <Grid item xs={12}>
    <ChartLineRede />
    </Grid>
    <Grid item xs={12}>
        <ChartOsRedeTecnico></ChartOsRedeTecnico>
    </Grid>
    <Grid item xs={12} mt={2}>
        <ChartOsRedeTipo/>
    </Grid>
</Grid>

</>)


}