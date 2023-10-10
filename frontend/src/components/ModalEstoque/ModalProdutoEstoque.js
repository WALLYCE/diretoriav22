import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Cartao from '../Card/Cartao';
import api from '../../services/api';
import ModalProdutoItemEstoqueLista from './ModalProdutoItemEstoqueLista';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModalProdutoEstoque(props) {
  const [openLista, setOpenLista] = React.useState(false);
  const [estoqueGlobal, setEstoqueGlobal] = React.useState([])
  const [estoque, setEstoque] = React.useState([])
  const [comodato, setComodato] = React.useState([])
  const [usuario, setUsuario] =  React.useState([])
  const [perdidos, setPerdidos] =  React.useState([])
  const [outros, setOutros] =  React.useState([])
  const [dadosLista, setDadosLista] = React.useState([])
  const [colunasLista, setColunasLista]= React.useState([])

  const coluna_estoque = [ 
    { field: 'id', headerName: 'Código Item',flex: 1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'numero_serie', headerName: 'Nº de Série', flex: 1},
    { field: 'descricao', headerName: 'Estoque', flex: 1 }
  ]

  const coluna_comodato = [ 
    { field: 'id', headerName: 'Código Item',flex: 1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'numero_serie', headerName: 'Nº de Série', flex: 1},
    { field: 'nome_razaosocial', headerName: 'Cliente', flex: 1 },
    { field: 'descricao', headerName: 'Status', flex: 1 }
  ]
  const coluna_usuario = [ 
    { field: 'id', headerName: 'Código Item',flex: 1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'numero_serie', headerName: 'Nº de Série', flex: 1},
    { field: 'name', headerName: 'Funcionário', flex: 1 }
  ]
  const coluna_perdidos = [ 
    { field: 'id', headerName: 'Código Item',flex: 1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'numero_serie', headerName: 'Nº de Série', flex: 1}
  ]

  const coluna_outros = [ 
    { field: 'id', headerName: 'Código Item',flex: 1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'numero_serie', headerName: 'Nº de Série', flex: 1},
    { field: 'descricao', headerName: 'Status', flex: 1 }
  ]

  React.useEffect(()=>{
    if(props.dados.id_produto !=undefined){
    atualizaDados();
    }
  }, [props.dados])

const atualizaDados = async()=>{

//const estoque_aux = await api.post('/estoque/produto_compra/estoque', {id_produto_compra: props.dados.id_produto_compra, id_produto: props.dados.id_produto})
//const comodato_aux = await api.post('/estoque/produto_compra/comodato', {id_produto_compra: props.dados.id_produto_compra, id_produto: props.dados.id_produto})
//const usuario_aux = await api.post('/estoque/produto_compra/usuario', {id_produto_compra: props.dados.id_produto_compra, id_produto: props.dados.id_produto})
//const perdido_aux = await api.post('/estoque/produto_compra/perdido', {id_produto_compra: props.dados.id_produto_compra, id_produto: props.dados.id_produto})
//const outros_aux = await api.post('/estoque/produto_compra/outros', {id_produto_compra: props.dados.id_produto_compra, id_produto: props.dados.id_produto})


//setEstoque(estoque_aux.data);
//setComodato(comodato_aux.data);
//setUsuario(usuario_aux.data);
//setPerdidos(perdido_aux.data);
//setOutros(outros_aux.data);
}

  return (
   
      <BootstrapDialog
        onClose={props.close}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth={true}
        maxWidth={'lg'}
      >
           <ModalProdutoItemEstoqueLista open={openLista} dados={dadosLista} colunas={colunasLista} event={()=> setOpenLista(false)}/>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.close}>
          Produtos
        </BootstrapDialogTitle>
        <DialogContent dividers>

          <Grid container mt={1} mb={1} spacing={3}>
                <Grid item xs={3} md={3}  sm={3}>
                <Button  
                    variant="inherit"  sx={{
                ':hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                },
                p: 0.5
                }} 
                onClick={()=>{
            
                }} >
                    <Cartao titulo={'Estoque Central'} icone={'Estoque'} valor={'20'} color={'green'}/>
         </Button>
                
                </Grid>  
          </Grid>
        
     
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close}>
            Sair
          </Button>
        </DialogActions>
      </BootstrapDialog>
 
  );
}
