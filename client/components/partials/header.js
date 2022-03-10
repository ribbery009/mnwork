import Link from 'next/link';
import { useState,useEffect } from 'react';
import { UserContext } from "../context/hamburgerContext"
import { useContext } from 'react'
export default ({ currentUser }) => {

  const { user } = useContext(UserContext)
  const { dispatch } = useContext(UserContext);
  const [darkTheme, setDarkTheme] = useState(undefined);
  
const [classCss,setClass] = useState('');
  const handleClick = () => {


    if (user && user["actual"] === "closed" || user === "") {
      setClass("toggled")
      dispatch({ type: "SET_HAM", user: "toggled" })
    }
    else if (user && user["actual"] === "toggled") {
      setClass("closed")
      dispatch({ type: "SET_HAM", user: "closed" })
    }

  }  




  const handleToggle = (event) => {
    setDarkTheme(event.target.checked);
  };

  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        // Set value of  darkmode to dark
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        // Set value of  darkmode to light
        document.documentElement.removeAttribute('data-theme');
        window.localStorage.setItem('theme', 'light');
      }
    }
  }, [darkTheme]);
    useEffect( () => {
      dispatch({ type: "SET_HAM", user: "closed" })

      const root = window.document.documentElement;
      const initialColorValue = root.style.getPropertyValue(
        '--initial-color-mode'
      );
      // Set initial darkmode to light
      setDarkTheme(initialColorValue === 'dark');
  }, [])

  return (
    <nav className="navbar navbar-light bg-light">

      <div className="navbar-wrapper">
        <div className={`navbar-toggle d-inline ${classCss}`}>
          <button aria-label="Toggle navigation" type="button" className="navbar-toggler" onClick={handleClick}>
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <Link href="/">
          <a className="navbar-brand">DASHBOARD</a>
        </Link>
      </div>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center"> 
        {darkTheme !== undefined && (
              <form action="#">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkTheme}
                    onChange={handleToggle}
                  />
                  <span className="slider"></span>
                </label>
              </form>
            )}
        </ul>
      </div>
    </nav>
  );
};
