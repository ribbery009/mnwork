const ButtonField = ({ text,classes,clickFunction,id,type }) => {

    return (
       <button type={type && type} id={id} className={classes} onClick={clickFunction}>{text}</button>
    );
};

export default ButtonField;