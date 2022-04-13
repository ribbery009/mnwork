import React, { useEffect } from "react";
import { useState } from "react";
var _ = require('lodash');

const CustomSelect = ({ optionsList, setDefaultSelectText, defaultSelectText, title,setDefaultSelectEmail }) => {

  const [showOptionList, setShowOptionList] = useState(false);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const handleClickOutside = (e) => {

    if (
      !e.target.classList.contains("custom-select-option") &&
      !e.target.classList.contains("selected-text")
    ) {
      setShowOptionList(false)
    }

  };

  // This method handles the display of option list
  const handleListDisplay = () => {
    setShowOptionList(!showOptionList)
  };

  // This method handles the setting of name in select text area
  // and list display on selection
  const handleOptionClick = e => {
    setDefaultSelectText(e.target.getAttribute("data-name"))
console.log("target: ",e.target)
    if(e.target.getAttribute("data-email") && !_.isNull(e.target.getAttribute("data-email"))){
      setDefaultSelectEmail(e.target.getAttribute("data-email"))
    }
    setShowOptionList(false)
  };
console.log(optionsList)
  return (
    <div className="custom-select-container">
      <label>{title}</label>
      <div
        className={showOptionList === true ? "selected-text active" : "selected-text"}
        onClick={handleListDisplay}
      >
        {defaultSelectText}
      </div>
      {showOptionList === true && (

        <ul className="select-options">
          {optionsList.map((option, index) => {

            return (
              <li
                className="custom-select-option"
                data-name={option.name}
                data-email={option.email ? option.email : null}
                key={option.name + `${index}`}
                onClick={handleOptionClick}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
export default CustomSelect;