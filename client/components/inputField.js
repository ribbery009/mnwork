const InputField = ({ onChange, value, label,classes,read }) => {
    return (
        <>
            <label>{label}</label>
            {read ? <input onChange={onChange} value={value} className={classes} readonly></input> : <input onChange={onChange} value={value} className={classes}/>}
        </>

    );
};

export default InputField;