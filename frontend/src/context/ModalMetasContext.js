import { createContext, useState } from "react";



export const ModalMetasContext = createContext();


//criar provider

export const ModalMetasContextProvider = ({children})=>{
    const [modalMetas, setModalMetas] = useState(false);
    return (
        <ModalMetasContext.Provider value={{modalMetas, setModalMetas}}>
            {children}
        </ModalMetasContext.Provider>
    )
}