import { Grid } from "@mui/material";
import ChartTicketMedio from "../../../components/ChartColunm/ChartTicketMedio";
function Ticket(){
    return (
        <Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ borderBottom: 1  }}>
          <ChartTicketMedio />
        </Grid>
        
        </Grid>
    )
}
export default Ticket;