import api from "../services/api"
import { createContext, useState, useEffect} from "react";
import React from 'react';
import {useNavigate} from 'react-router-dom';
export const AuthContext = createContext();

//!!user é para transformar o user em boleano
//criar provider

export const AuthContextProvider = ({children})=>{

    const navigate = useNavigate();
    const[user, setUser] = useState(null);
    const[token, setToken] = useState(null);
    const[loading, setLoading] = useState(true);


    useEffect(()=>{
        const recoveredUser = localStorage.getItem('user');
        const recoveredToken = localStorage.getItem('token');
     
        if(recoveredUser){
            setUser(recoveredUser)
            setToken(recoveredToken);
            api.defaults.headers.common['Authorization']  = `Bearer ${recoveredToken}`;
        }
        setLoading(false)
    },[])

    
    const login = async(email, password) => {
  
       const result = await  api.post('/users/login', {email,password})
    


       setUser(result.data.dados['email']);
       setToken(result.data.dados['token']);

       localStorage.setItem('user', result.data.dados['email']);
       localStorage.setItem('token', result.data.dados['token']);
       api.defaults.headers.common['Authorization'] =`Bearer ${result.data.dados['token']}`;
  
       navigate('/home')
        
           
    }

    const logout= () =>{
        setUser(null);
        localStorage.setItem('user', null);
        localStorage.setItem('token', null);
        api.defaults.headers.Authorization = null;
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}



