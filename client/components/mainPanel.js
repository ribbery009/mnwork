import { UserContext } from "../components/context/hamburgerContext"
import { useContext } from 'react'

export default (props) => {

    const { user } = useContext(UserContext)

    return (

        <div className={`main-panel ${user ? user["actual"] ? user["actual"] : user : "closed"}`}>
        { props.children }
        </div>
    );
};
