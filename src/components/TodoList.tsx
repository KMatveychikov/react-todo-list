import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function TodoList(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string>("")

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setNewTaskTitle(e.currentTarget.value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onChangeTaskTitleHandler}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            props.addTask(newTaskTitle)
                            setNewTaskTitle("")
                        }
                    }}
                     className={error ? "error" : ""}
                />
                <button onClick={() => {
                    if (newTaskTitle.trim() === "") {
                        setError("field is required")
                        return
                    }
                    props.addTask(newTaskTitle)
                    setNewTaskTitle("")
                }}>+
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t =>
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={(e) => {
                                       props.changeStatus(t.id, e.currentTarget.checked)
                                   }}
                            />
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>X
                            </button>
                        </li>
                    )
                }
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "active-filter" : ""}
                    onClick={() => {
                    props.changeFilter("all", props.id)
                }}>All
                </button>
                <button
                    className={props.filter === "active" ? "active-filter" : ""}
                    onClick={() => {
                    props.changeFilter("active", props.id)
                }}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={() => {
                    props.changeFilter("completed", props.id)
                }}>Completed
                </button>
            </div>
        </div>
    )
}