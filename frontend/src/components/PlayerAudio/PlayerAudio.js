import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';


function PlayerAudio(props){



    
return(

  <AudioPlayer
    elevation={2}
    width="100%"
    height='80%'
    variation="primary"
    spacing={3}
    download={false}
    autoplay={false}
    preload="auto"
    src= {"http://192.168.88.254/gravacoes/"+props.gravacao+".wav"}
  />

)
}

export default PlayerAudio;