import React,{useEffect} from "react";


const CustomSelect = ({optionsList, setDefaultSelectText,defaultSelectText,setShowOptionList,showOptionList}) => {

  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
}, [])

  const handleClickOutside = (e) => {

    if (
      !e.target.classList.contains("custom-select-option") && e.target.classList.attributes &&
      e.target.classList.attributes[0].value("selected-text")
    ) {
setShowOptionList(true)
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
setShowOptionList(false)
  };


    return (
      <div className="custom-select-container">
        <div
          className={showOptionList === true ? "selected-text active" : "selected-text"}
          onClick={handleListDisplay}
        >
          {defaultSelectText}
        </div>
        {showOptionList === true && (
          <ul className="select-options">
            {optionsList.map(option => {
    
              return (
                <li
                  className="custom-select-option"
                  data-name={option.email ? (option.name + "-"+ (option.email)) : (option.name)}
            
                  key={option.name}
                  onClick={handleOptionClick}
                >
                  {option.name} {option.email  && " - " + (option.email)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
export default CustomSelect;