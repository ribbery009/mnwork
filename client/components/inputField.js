const InputField = ({ onChange, value, label,classes }) => {

    return (
        <>
            <label>{label}</label>
            <input onChange={onChange} value={value} className={classes}>

            </input>
        </>

    );
};

export default InputField;