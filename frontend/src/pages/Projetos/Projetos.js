    
import { Grid } from "@mui/material";
import Clients from '../../components/Card/Clients';
import Cancellations from '../../components/Card/cancellations';
import Sales from '../../components/Card/Sales';
import Hdtvs from '../../components/Card/hdtvs';
import AllCities from '../../components/ChartColunm/AllCities';
import Projetos_Total from '../../components/Card/Projetos_Total';
import Projetos_Erro from '../../components/Card/Projetos_Erro';

    function Projetos(){

                return (
                    <>
                <Grid container spacing={2}>
                    <Grid  item xs={12} md={3} sm={3}>
                        <Projetos_Total/>
                    </Grid>
                    <Grid  item xs={12} md={3} sm={3}>
                        <Projetos_Erro/>
                    </Grid>
                    <Grid  item xs={12} md={3} sm={3}>
                        <Cancellations/>
                    </Grid>                 
                </Grid>
                    
                    </>
                )

    }export default Projetos;