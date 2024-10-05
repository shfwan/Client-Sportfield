const Label = ({ htmlFor, children }) => {
    return (
        <label className='label' htmlFor={htmlFor}>
            <span className="label-text text-black font-semibold text-base text-nowrap whitespace-nowrap">
                {children}
            </span>
        </label>
    )
}

export default Label