import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayerAudio from '../PlayerAudio/PlayerAudio';

function ModalGraficoLigacoes(props) {
  

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          alignText: 'right',
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
          alignText: 'left',
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      



  return (
      <Dialog scroll={'body'} maxWidth={'lg'}  fullWidth={true} open={props.status} onClose={props.event}>
        <DialogTitle>Dados</DialogTitle>
        <DialogContent >
          <TableContainer component={Paper}>
                    <Table  aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            {
                                props.label.map((value, index)=>{
                                    const label  = value[0].toUpperCase() + value.substring(1);

                                    return(
                                        <StyledTableCell key={index}>{label}</StyledTableCell>
                                    )
                                })
                            }
                            
                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                       {props.dados.map((row,index) =>{

                           return(
                            <StyledTableRow key={index}>
                                {row.map((column, index_column)=>{
                                   if((index_column%4!=0) || index_column==0){
                                    return(
                                        <StyledTableCell key={index_column} align="left">{column}</StyledTableCell>
                                    )
                                   }else{
                                    return(
                                      <StyledTableCell key={index_column} mt={2} align="left">
                                        <PlayerAudio gravacao={column} pasta={props.pasta}></PlayerAudio>
                                        </StyledTableCell>
                                  )
                                   }
                                })}
                            </StyledTableRow>
                           )

                        })}
                        </TableBody>
                    </Table>
    </TableContainer>

          
        </DialogContent>
        <DialogActions>
          <Button onClick={props.event}>Sair</Button>
        </DialogActions>
      </Dialog>
  );
}
export default ModalGraficoLigacoes;