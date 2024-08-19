

const DropdownFilter = ({text}) => {
  return (
    <div className="form-control">
        <label
        className="label cursor-pointer text-start justify-normal gap-x-2"
        >
            <input
            type="checkbox"
            className="checkbox"
            value={text}
            />
            <span type="label-text" className="text-black text-start">{text}</span>
        </label>
    </div>
  )
}

export default DropdownFilter