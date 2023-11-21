import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { ModalMetasContext } from '../../context/ModalMetasContext';
import api from '../../services/api'


export default function ModalSetMetas(props) {
 

 
  const [metas, setMetas] = React.useState()
  const {modalMetas, setModalMetas} = React.useContext(ModalMetasContext)

  useEffect(()=>{
    api.post(`/metas`)
     .then(resposta => {
       setMetas(resposta.data)
     })
  },[])
  
  const handleClickSave =()=> {

  api.post(`${process.env.REACT_APP_BASE_URL}/metas`, {newMetas: metas})
  .then((resposta)=>{
    alert(resposta.data)
     setModalMetas(false)
  })
  }
       
const handleChangeMeta = (event) => {
  const fieldValue = event.target.value;
  const fieldID = event.target.getAttribute('id')
  metas[fieldID]['meta_vendas'] = event.target.value;
  console.log(metas[fieldID])
}
  

  return (
    <div>
      <Dialog
        scroll={'body'}
        maxWidth={'md'}
        open={modalMetas} 
        onClose={()=>{setModalMetas(false)}}
        fullWidth={true}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Definir Metas</DialogTitle>
        <DialogContent>
      <Grid container >
      {metas && metas.map((item, index)=>{
        return (
                   <Grid item sx={{my: 3}} xs={6} sm={6} md={6} key={item.id_cidade_meta_vendas} component={TextField} 
                   id={index.toString()}
                   defaultValue={item.meta_vendas}
                   name="meta_vendas"
                   label={item.cidade_nome}
                   type="number"
                   onChange={handleChangeMeta}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 />


        )
      })
    }
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickSave} >Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
