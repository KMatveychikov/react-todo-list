import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./components/TodoList";
import exp from "constants";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
    ])


    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function removeTask(id: string) {
        setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
           todolist.filter = value
        }
        setTodolists([...todolists])
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone

            setTasks([...tasks])
        }
    }


    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: "What to Learn", filter: "active"},
        {id: v1(), title: "What to Buy", filter: "completed"}
    ])

    return (
        <div className="App">
            {todolists.map(tl => {
                let tasksForTodoList = tasks
                if (tl.filter === "active") {
                    tasksForTodoList = tasks.filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = tasks.filter(t => t.isDone)
                }
                return <TodoList
                    id={tl.id}
                    key={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                />
            })}

        </div>
    );
}

export default App;
