import { createContext, useReducer, useEffect } from "react";
import { userReducer } from "../reducers/hamReducer";

export const UserContext = createContext()

export default function HambContextProvider(props) {
    

    const [user, dispatch] = useReducer(userReducer, [], () => {
        if (typeof window !== 'undefined') {    
        const initialusers = localStorage.getItem("user")
        return initialusers ? JSON.parse(initialusers) : ""
        }
    })

    useEffect( () => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])

    return (
        <UserContext.Provider value={{user, dispatch}} userValue={user}>
            { props.children }
        </UserContext.Provider>
    )
}