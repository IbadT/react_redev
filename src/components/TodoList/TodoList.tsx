import React from "react"
import { TodoListType } from "./types/TodoListTypes"
import { TodoListWithLogging } from "../Todo/Todo"


export const TodoList: React.FC<TodoListType> = ({ todos, setTodos }) => {

    return (
        <div style={{ marginTop: "4vh " }}>
            {
                todos && 
                todos.map(({id, title, isCompleted}) => 
                    <TodoListWithLogging setTodos={setTodos} key={id} id={id} title={title} isCompleted={isCompleted}/>
                )
            }
        </div>
    )
}