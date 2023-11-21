import { createContext, useState } from "react";



export const DrawerContext = createContext();


//criar provider

export const DrawerContextProvider = ({children})=>{
    const [open, setOpen] = useState(false);
   
    return (
        <DrawerContext.Provider value={{open,setOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}