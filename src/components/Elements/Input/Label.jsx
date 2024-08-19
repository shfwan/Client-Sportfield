const Label = (props) => {
    const { htmlFor, children } = props
    return (
        <label className='label text-black font-semibold text-xl' htmlFor={htmlFor}>{ children }</label>
    )
}

export default Label