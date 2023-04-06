import { useState, useEffect } from 'react';
import axios from 'axios';

import { ToDoItem } from './components/ToDoItem/ToDoItem.js';
import { todosData } from './data/todosData.js';

const ToDosItems = ({ newTask }) => {  

    const [toDos, setToDos] = useState(todosData);
    const requestUrl = 'https://jsonplaceholder.typicode.com/todos/';
    const changeUrl = 'https://jsonplaceholder.typicode.com/todos/${id}'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(requestUrl);
                const filteredData = response.data.filter(({id}) => id <= 8)
                setToDos(filteredData);    
            } catch (error) {
            console.error(error);
            }
        }
        fetchData();
    }, []);

    
    let newTasks = [];

  

    const deleteItem = async (id) => {
        try {
            await axios.delete(changeUrl)
            newTasks = [...toDos].filter((task) => task.id !== id)
            setToDos(newTasks)
        } catch (error) {
            console.error(error);
        }     
    };

    const addTask = async () => {
        try {
                await axios.post(requestUrl, {
                id: newTask.id,
                title: newTask.title,
                completed: false
            });
            newTasks = [...toDos, newTask]; 
            setToDos(newTasks);
        } catch (error) {
            console.error(error);
        }
    };

    
    const handleChange = id => {
        newTasks = [...toDos].map((task) => {
            if(task.id === id) {
                return {...task,completed: !task.completed}
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