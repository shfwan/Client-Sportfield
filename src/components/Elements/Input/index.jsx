import Label from './Label'
import Input from './Input'

const InputForm = (
    {
        className,
        disabled,
        type,
        title,
        name,
        placeholder,
        required,
        onChange,
        value,
        isInvalid
    }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <Label htmlFor={name}>{title}</Label>
            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                Required={required}
                onChange={onChange}
                value={value}
                disabled={disabled}
                isInvalid={isInvalid}
            />
            {isInvalid && <p className="text-error text-sm mt-1">{isInvalid}</p>}
        </div>
    )
}

export default InputForm