
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import api from "../../../services/api";
import {Checkbox} from "@mui/material";



const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
 }));



function Cadastro(){
   const[paginas, setPaginas] = useState();
   const[dados, setDados] = useState({
      name: '',
      email: '',
      senha: ''
   })
   
useEffect(()=>{
const getPages = async()=>{
   const result = await api.get('/pages');
   console.log(result.data);
   result.data.map((item) => {
      item.status=false;
   })
   setPaginas(result.data)
}
console.log('setou')
getPages();
},[])


const handleClick = async (event)=>{
console.log(dados.name.length)
 if(dados.name.length > 3 && dados.email.length >5 && dados.senha.length >4){
   const pais = [];
   const filhos =[];
   paginas.map((item)=>{
      if(item.status === true){
         pais.push(item.id_page_pai)
         filhos.push(item.id_page)
      }
   })
   const masters = [...new Set(pais)]
   const arrayPages = masters.concat(filhos)
   const acesso = arrayPages.toString();
   const result = await api.post('/users/cadastro',{ name: dados.name,email: dados.email,senha: dados.senha, nivel_acesso: acesso});
   console.log(result.data)
   alert(result.data.message)
}else{
   alert("Preencha os campos corretamente, a senha deve ter no mínimo 4 caracteres")
}
}

const handleChangeCheckBox = (event)=>{
   const newpaginas = [...paginas]
   newpaginas.map((item) =>{
    if(item.id_page == event.target.value){
      item.status = event.target.checked;
    }
   })
   setPaginas(newpaginas)
}

const handleChange = (e)=>{
var newDados = dados;
const event = e.target.getAttribute('id')
const value = e.target.value;
newDados = {...newDados,
[event]: value
}
setDados(newDados)
}
    return(<>
    
       <Grid>
       <Grid item xs={4} md={4} sm={4} sx={{
          display: 'flex',
          justifyContent: 'center'
          }}>
       <TextField
          required
          id="name"
          label="name"
          value={dados.name}
          onChange={handleChange}
        />
    </Grid>
       <Grid item xs={4} md={4} mt={2}  sm={4} sx={{
          display: 'flex',
          justifyContent: 'center'
          }}>
       <TextField
          required
          id="email"
          value={dados.email}
          label="E-mail"
          onChange={handleChange}
        />
    </Grid>
    <Grid item xs={4} md={4} sm={4} mt={2}  sx={{
          display: 'flex',
          justifyContent: 'center'
            }}>
        <TextField 
        id="senha"
        label="Password"
        value={dados.senha}
        onChange={handleChange}
        type="password">
        </TextField>
    </Grid>
    <Grid item xs={4} md={4} sm={4} mt={2}  sx={{
          display: 'flex',
          justifyContent: 'center'
            }}>
        <Button variant="contained" onClick={handleClick}>Adicionar</Button>
        </Grid>
       </Grid>
       <Grid
mt={3}
container
spacing={3}
direction="row"
justifyContent="center"
alignItems="flex-start"
>
{paginas && paginas.map((item)=>{
if(item.id_page_pai === null){
return(
<Grid item key={item.id_page} >
<Item>{item.nome}</Item>
{paginas && paginas.map((subitem, index)=>{
if(subitem.id_page_pai === item.id_page){
return(
<Grid key={subitem.id_page}>
<Checkbox 
checked={paginas[index].status}
value={subitem.id_page}
onChange={handleChangeCheckBox}
/>{subitem.nome}
</Grid>
)
}
})}
</Grid>
)
}
})}
</Grid>

   
    </>)
} 

export default Cadastro;