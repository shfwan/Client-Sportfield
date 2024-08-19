const Input = (
    {
        id,
        name,
        disabled = false,
        type,
        placeholder,
        Required = false,
        onChange = () => { },
        value,
        isInvalid = ''
    }) => {
    return (
        <input
            id={id}
            className={`w-full font-semibold bg-transparent border-2
            input input-md input-bordered  rounded-md  outline-none
            ${isInvalid ? 'input-error' : ''}`}
            type={type}
            name={name}
            placeholder={placeholder}
            required={Required}
            onChange={onChange}
            value={value}
            disabled={disabled}
        />
    )
}

export default Input