import { createContext,useState,useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) =>
{
    const [user, setUser] = useState(null);

    useEffect(()=>{
        setUser({children})
    },[children])
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}  

//para escibir la info del usuario y mostrarla:
//const{user}useContext(UserContext);