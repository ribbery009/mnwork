const ButtonField = ({ text,classes,clickFunction }) => {

    return (
       <button className={classes} onClick={clickFunction}>{text}</button>
    );
};

export default ButtonField;