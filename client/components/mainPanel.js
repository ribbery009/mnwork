import { IsHamburgerContext } from "../components/context/hamburgerContext"
import { useContext } from 'react'

export default (props) => {

    const { isHamburgerIcon } = useContext(IsHamburgerContext)

    return (

        <div className={`main-panel ${isHamburgerIcon ? isHamburgerIcon["actual"] ? isHamburgerIcon["actual"] : isHamburgerIcon : "closed"}`}>
        { props.children }
        </div>
    );
};
