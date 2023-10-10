
import './App.css';

import Login from './pages/Login/Login';
import NavBar from './components/NavBar/NavBar';
import { DrawerContextProvider} from './context/DrawerContext';
import {AuthContextProvider} from './context/AuthContext';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import React, { useEffect, useContext } from "react";




function App() {


const Private = ({children}) =>{
  
  const {authenticated, loading} = useContext(AuthContext);
  if(loading){
    return <div>Carregando...</div>
  }
  if(!authenticated){
    return <Navigate to='/login'/>
  }else{
    return children;
  }
}


  return (
    <div className="App">
      <BrowserRouter>
  <AuthContextProvider>
    <DrawerContextProvider>
      
        <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/*' element={<Private><NavBar/></Private>}></Route>
        </Routes>
     
     </DrawerContextProvider>
   </AuthContextProvider>
   </BrowserRouter>
    </div>
  );
}

export default App;
