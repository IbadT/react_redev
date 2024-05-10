import React from "react"
import { Todo } from "../Todo/Todo"
import { PropsType } from "./types/TodoListTypes"


export const TodoList: React.FC<PropsType> = ({ todos, setTodos }) => {

    return (
        <div style={{ marginTop: "4vh " }}>
            {
                !todos.length ? 
                    null : 
                    todos?.map(({id, title, isCompleted}) => 
                        <Todo setTodos={setTodos} key={id} id={id} title={title} isCompleted={isCompleted}/>
                    )
            }
        </div>
    )
}