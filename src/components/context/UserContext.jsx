import { createContext,useState,useEffect,Children } from "react";

export const UserContext = createContext();

export const UserProvider = ({Children}) =>
{
    const [user, setUser] = useState(null);

    useEffect(()=>{
        setUser({Children})
    },[Children])
    return(
        <UserContext.Provider value={{user}}>
            {Children}
        </UserContext.Provider>
    )
}  


//praecibir la info del usuario y mostrarla:
//import {useContext}  from "react";
//import {userContext} 
//const{user}useContext(UserContext);