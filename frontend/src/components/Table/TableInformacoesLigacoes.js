import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('ss', 159, 6.0, 24, 4.0),
];

export default function TableLigacoesSac(props) {
    console.log(props.atendidas)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Ligações Atendidas</StyledTableCell>
            <StyledTableCell align="right">Ligações com espera 20 (s) ou maior </StyledTableCell>
            <StyledTableCell align="right">Tempo Máximo de Espera na Fila</StyledTableCell>
            <StyledTableCell align="right">Tempo Espera médio da Fila</StyledTableCell>
            <StyledTableCell align="right">Nível de Serviço (Atendidas)</StyledTableCell>
            <StyledTableCell align="right">Nota média (Avaliadas)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
         
              <StyledTableCell align="right">{props.atendidas}</StyledTableCell>
              <StyledTableCell align="right">{props.foraMeta} </StyledTableCell>
              <StyledTableCell align="right">{props.tempoMaximo} (s)</StyledTableCell>
              <StyledTableCell align="right">{parseFloat(props.tempoTotal/props.atendidas).toFixed(2)} (s)</StyledTableCell>
              <StyledTableCell align="right">{parseFloat(((props.atendidas-props.foraMeta)*100)/(props.atendidas)).toFixed(2)} %</StyledTableCell>
              <StyledTableCell align="right">{props.notaMediaTotal}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}