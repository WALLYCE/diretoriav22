import * as React from 'react';
import { useContext } from 'react';
import { Collapse } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Routes, Route} from 'react-router-dom';
import Vendas from '../../pages/Vendas/Dashboard/Dashboard';
import StatusContratos from '../../pages/Vendas/Status_Contratos/Status_Contratos';
import StatusContratosDownload from '../../pages/Vendas/Status_Contratos/Status_ContratosDownload';
import Vendedores from '../../pages/Vendas/Vendedor/Vendedores'
import Home from '../../pages/Home/Home';
import ErroProcedimento from '../../pages/Outros/erro_procedimento/erro_procedimento';
import Projetos from '../../pages/Projetos/Projetos';
import Renovacoes from '../../pages/Vendas/Renovacoes/Renovacoes';
import Setor_Venda from '../../pages/Setores_Vendas/Setor_Venda';
import Reincidencia_OS from '../../pages/Rede/Reincidencia_OS/Reincidencia_OS'
import { Link } from 'react-router-dom';
import Retiradas from '../../pages/Rede/Retiradas/Retiradas';
import Clientes_Inadimplentes from '../../pages/Cobranca/Clientes_Inadimplentes/Clientes_Inadimplentes2'
import Ex_Clientes_Prospecto from '../../pages/Vendas/Ex_Clientes_Prospecto/Ex_Clientes_Prospecto'
import OrdemServico from '../../pages/Rede/OrdemServico/OrdemServico';
import Hdtvs from '../../pages/Vendas/Hdtvs/hdtvs';
import Ligacoes from '../../pages/Ligacoes/Ligacoes'
import Drawer from '@mui/material/Drawer';
import { useLocation } from 'react-router-dom';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import TecnicosDeRede from '../../pages/Rede/TecnicosDeRede/tecnicos_rede';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListSubheader from '@mui/material/ListSubheader';
import Servicos from "../../pages/Estatisticas/servicos/servicos";
import AtendimentosSac from '../../pages/Suporte/atendimentosSac/AtendimentosSac';
import Cadastro from "../../pages/ControleAcesso/Cadastro/Cadastro";
import {AuthContext} from '../../context/AuthContext';
import api from "../../services/api"
import Ticket from '../../pages/Estatisticas/Ticket/Ticket';
import DashBoardRede from '../../pages/Rede/DashBoard_Rede/DashBoard_Rede';
import MediaExecucaoOS from '../../pages/Rede/TempoMedioOSTecnico/tecnicos_os_media'
import OrdemServicoTempoExecutada from  '../../pages/Rede/OrdemServicoTempoExecutada/OrdemServicoTempoExecutada';
import Gravacoes from '../../pages/Ligacoes/Gravacoes';
import LigacoesSac from '../../pages/Ligacoes/Sac';
import LigacoesVendas from '../../pages/Ligacoes/Vendas';
import LigacoesCobranca from '../../pages/Ligacoes/Cobranca';
import LigacoesQualidade from '../../pages/Ligacoes/Qualidade';
import DashBoardCobranca from '../../pages/Cobranca/Dashboard';
import ControleCompras from '../../pages/Estoque/ControleCompras';
import DashBoardQualidade from '../../pages/Qualidade/Dashboard';
const drawerWidth = 260;









const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const [openSub, setOpenSub] = React.useState(null);
  const [pages, setPages] = React.useState([]);
  const {user} = useContext(AuthContext)
  const [colapse, setColapse] = React.useState(false)
  
  const handleClick = (event) => {
 
  setOpenSub({[event.target.innerText]: !openSub[event.target.innerText]});

 
  };



  React.useEffect(()=>{
    const setPagesUser = async()=>{
      const resultado =  await api.post('/users/pages', {email: user});
      const result =  await api.post('/pages/nivel_acesso', {pages: resultado.data[0].nivel_acesso.split(',')});
        setPages(result.data)
        var aux = [];
       result.data.map((item)=>{
          if(!item.id_page_pai){
           aux[item.nome] = false;
          }
        })
       console.log(aux)
       setOpenSub(aux)
      }
      setPagesUser();
      setOpen(false);
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ background: "linear-gradient(to right, #e6323a, #693b7b)" }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            eTelecom - Conectado a Você
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
    >
      
      {pages && pages.map((item)=>{
         if(!item.id_page_pai){
          return (<div key={item.id_page}>
            <ListItemButton  name={item.nome}  onClick={handleClick}>
            <ListItemIcon>
            <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={item.nome}/>
            {openSub[item.nome] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openSub[item.nome]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
             {pages && pages.map((subitem)=>{
              if(subitem.id_page_pai === item.id_page){
                return(
                      <ListItemButton key={Math.random()} sx={{ pl: 4 }}  component={Link} to={subitem.link} onClick={ handleDrawerClose }>
                      <ListItemIcon>
                      <StarBorder />
                      </ListItemIcon>
                      <ListItemText secondary={subitem.nome} />
                      </ListItemButton>
                )
              }
             })}
             </List>
         </Collapse>     
          </div>

          )
         }
      })}






</List>
      
      

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path='/vendas/dashboard' element={<Vendas/>}></Route>
          <Route path="/vendas/renovacoes" element={<Renovacoes/>}></Route>
          <Route path="/vendas/vendedores" element={<Vendedores/>}></Route>
          <Route path="/vendas/setor_vendas" element={<Setor_Venda/>}></Route>
          <Route path="/rede/reincidencia_os" element={<Reincidencia_OS/>}></Route>
          <Route path="/cobranca/clientes_inadimplentes" element={<Clientes_Inadimplentes/>}></Route>
          <Route path="/vendas/ex_clientes_prospecto" element={<Ex_Clientes_Prospecto/>}></Route>
          <Route path="/vendas/contratos" element={<StatusContratos/>}></Route>
          <Route path="/vendas/contratos_diretoria" element={<StatusContratosDownload/>}></Route>
          <Route path="/rede/retiradas" element={<Retiradas/>}></Route>
          <Route path="/projetos" element={<Projetos/>}></Route>
          <Route path="/rede/ordem_servico" element={<OrdemServico/>}></Route>
          <Route path="/erro_procedimento" element={<ErroProcedimento/>}></Route>
          <Route path="/vendas/hdtvs" element={<Hdtvs/>}></Route>
          <Route path="/ligacoes/dashboard" element={<Ligacoes/>}></Route>
          <Route path="/estatisticas/servicos" element={<Servicos/>}></Route>
          <Route path="/acesso/cadastro" element={<Cadastro/>}></Route>
          <Route path="/suporte/atendimentos" element={<AtendimentosSac/>}></Route>
          <Route path="/estatisticas/ticket" element={<Ticket/>}></Route>
          <Route path="/rede/tecnicos_rede" element={<TecnicosDeRede></TecnicosDeRede>}></Route>
          <Route path="/rede/dashboard" element={<DashBoardRede/>}></Route>
          <Route path="/rede/media_os_execucao" element={<MediaExecucaoOS/>}></Route>
          <Route path="/rede/tempo_os_execucao_tecnico" element={<OrdemServicoTempoExecutada/>}></Route>
          <Route path="/ligacoes/gravacoes" element={<Gravacoes/>}></Route>          
          <Route path="/ligacoes/sac" element={<LigacoesSac/>}></Route>  
          <Route path="/ligacoes/vendas" element={<LigacoesVendas/>}></Route>  
          <Route path="/ligacoes/cobranca" element={<LigacoesCobranca/>}></Route>  
          <Route path="/ligacoes/qualidade" element={<LigacoesQualidade/>}></Route>  
          <Route path="/cobranca/dashboard" element={<DashBoardCobranca/>}></Route>
          <Route path="/estoque/controle_compras" element={<ControleCompras/>}></Route>
          <Route path="/qualidade/dashboard" element={<DashBoardQualidade/>}></Route>
          
                  </Routes>  
          
        </Main>
    </Box>   
   
  );
}
