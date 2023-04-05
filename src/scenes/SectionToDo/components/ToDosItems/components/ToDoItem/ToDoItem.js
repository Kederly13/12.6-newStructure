import './ToDoItem.css';

const ToDoItem = ({ title, completed, handleChange, deleteItem }) => (
    <div className="todo-item">
        <h2 className='title'>{title}</h2>
        <input className='input' type="checkbox" onChange={handleChange} defaultChecked={completed}/>
        <button onClick={deleteItem} type="button">DELETE</button>       
    </div>
);

export  { ToDoItem };

