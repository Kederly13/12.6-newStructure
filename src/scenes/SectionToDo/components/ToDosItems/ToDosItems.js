import { useState, useEffect } from 'react';

import { ToDoItem } from './components/ToDoItem/ToDoItem.js';
import { todosData } from './data/todosData.js';

const ToDosItems = ({ newTask }) => {

    const archiveTasks = JSON.parse(localStorage.getItem('tasks'));
    const [toDos, setToDos] = useState(archiveTasks || todosData);
    
    let newTasks = [];

    const setTask = (newTasks) => {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setToDos(newTasks);
    };

    const deleteItem = (id) => {
        newTasks = [...toDos].filter((task) => task.id !== id)
        setTask(newTasks)
    };

    const addTask = () => {
        newTasks = [...toDos, newTask]; 
        setTask(newTasks)
    };

    
    const handleChange = id => {
        newTasks = [...toDos].map((task) => {
            if(task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                }
            }

            return task;
        });

        setTask(newTasks);
    }

    const toDosItems = [...toDos];

    const activeTasks = toDosItems.filter(({completed}) => !completed)
    const completedTasks = toDosItems.filter(({completed}) => completed)

    useEffect(() => {
        if (newTask) addTask();
    }, [newTask])
    console.log(toDos)

    const finalTasks = [...activeTasks,...completedTasks].map(({ id, text, completed }) => (
        <ToDoItem
            description={text}
            key={id}
            completed={completed}
            setToDos={setToDos}
            handleChange={() => handleChange(id)}
            deleteItem={() => deleteItem(id)}
        />
    ));

    return finalTasks;
}

export { ToDosItems };