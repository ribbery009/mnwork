import { createContext, useReducer, useEffect } from "react";
import { isHamburgeReducer } from "../reducers/hamReducer";

export const IsHamburgerContext = createContext()

export default function HambContextProvider(props) {
    

    const [isHamburgerIcon, dispatch] = useReducer(isHamburgeReducer, [], () => {
        if (typeof window !== 'undefined') {    
        const initialState = localStorage.getItem("isHamburgerIcon")
        return initialState ? JSON.parse(initialState) : ""
        }
    })

    useEffect( () => {
        localStorage.setItem("isHamburgerIcon", JSON.stringify(isHamburgerIcon))
    }, [isHamburgerIcon])

    return (
        <IsHamburgerContext.Provider value={{isHamburgerIcon, dispatch}} userValue={isHamburgerIcon}>
            { props.children }
        </IsHamburgerContext.Provider>
    )
}