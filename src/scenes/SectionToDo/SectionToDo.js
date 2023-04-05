import { useState } from 'react';
import { toDoItem } from './components/ToDosItems/components/ToDoItem/ToDoItem.js'
import { ToDosItems } from './components/ToDosItems/ToDosItems.js';
import { Button } from './components/Button/Button.js';
import { Input } from './components/Input/Input.js';
import { Form } from './components/Form/Form.js';

const SectionToDo = () => {


    const [inputValue, setInputValue] = useState('');
    const [newTask, setNewTask] = useState();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue) {
            alert('Input value cannot be empty!');
            return;
        } 
        
        if (!isNaN(inputValue)) {
            alert('Input must be text');
            return;
        }

        setNewTask(
            {
                id: Math.round(Math.random() * 1000),
                title: inputValue,
                completed: false
            }
        )
    };


    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <section>
            <div className='container'>
                <div className='form'>
                    <Form onSubmit={handleSubmit}>
                        <Input value={inputValue} onChange={handleInputChange}/>
                        <Button/> 
                    </Form>                                    
                </div>
                <div>
                    <ToDosItems
                        newTask={newTask}
                    />
                </div>    
            </div>     
        </section>
    )

}

export { SectionToDo }