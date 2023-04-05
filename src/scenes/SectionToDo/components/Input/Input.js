const Input = ({ value, onChange }) => (
    <div>
        <input type="text" name="text" placeholder="enter text" value={value} onChange={onChange}/>
    </div>
)

export { Input };