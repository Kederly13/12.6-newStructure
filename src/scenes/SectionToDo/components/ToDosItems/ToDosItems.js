import { useState, useEffect } from 'react';
import axios from 'axios';

import { ToDoItem } from './components/ToDoItem/ToDoItem.js';
import { todosData } from './data/todosData.js';

const ToDosItems = ({ newTask }) => {  

    const [toDos, setToDos] = useState(todosData);
    const requestUrl = 'https://jsonplaceholder.typicode.com/todos';
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(requestUrl);
            const filteredData = response.data.filter((({id}) => id <= 8))
            setToDos(filteredData)
        };
        fetchData();
    }, [requestUrl]);

    
    let newTasks = [];

    const deleteItem = (id) => {
        newTasks = [...toDos].filter((task) => task.id !== id)
        setToDos(newTasks)
    };

    const addTask = () => {
        newTasks = [...toDos, newTask]; 
        setToDos(newTasks)
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

        setToDos(newTasks);
    }

    const toDosItems = [...toDos];

    const activeTasks = toDosItems.filter(({completed}) => !completed)
    const completedTasks = toDosItems.filter(({completed}) => completed)

    useEffect(() => {
        if (newTask) addTask();
    }, [newTask])

    const finalTasks = [...activeTasks,...completedTasks].map(({ id, title, completed }) => (
        <ToDoItem
            title={title}
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