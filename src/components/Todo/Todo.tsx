import React, { useRef, useState } from "react";
import { Button } from "../Buttons/Button"
import { PropsType } from "./types/TodoTypes";
import { TodoTypes } from "../../types/TodoTypes";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { withLogging } from "../HOC/withLogger";

const style = { 
    display: "flex", 
    justifyContent: "space-between", 
    backgroundColor: "rgb(128, 90, 246)", 
    borderRadius: "5px",
    marginTop: "3vh",
    padding: "2vh",
    alignItems: "center"
}

const inputStyle = { 
    backgroundColor: "transparent",
    border: "1px solid rgb(128, 90, 246)",
    width: "90%",
    color: "white",
    fontSize: "4vmin"
}



export const Todo: React.FC<PropsType> = ({ id, title, setTodos, isCompleted, logUserAction }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [state, setState] = useState<string>(title);
    const ref = useRef(null);

    const handleClick = (id: number) => {
        setTodos((prev: TodoTypes[]) => prev.map((i: TodoTypes) => i.id === id ? {...i, isCompleted: !i.isCompleted} : i));
    };

    const handleEdit = (id: number) => {
        setTodos((prev: TodoTypes[]) => prev.map((i: TodoTypes) => i.id === id ? {...i, title: state} : i));
        setIsEditing(prev => !prev);
    };

    const handleDelete = (id: number) => {
        setTodos((prev: TodoTypes[]) => prev.filter((i: TodoTypes) => i.id !== id));
    };

    const handleLoggerFn = (message: string): void => {
        if(logUserAction) {
            return logUserAction(message);
        } else {
            console.log("ERROR");
        }
    };

    return (
        <div style={style}>
            {
                isEditing ? (
                    <>
                        <input style={inputStyle} 
                            ref={ref}
                            onClick={() => handleLoggerFn("Пользователь хочет изменить todo")}  
                            onKeyDown={() => handleLoggerFn(`Пользователь меняет todo на ${state}`)}
                            onChange={(e) => setState(e.target.value)} value={state}/>
                        <Button handleClick={() => (handleEdit(id), handleLoggerFn(`User updated todo with id: ${id}`))}>Update</Button>
                    </>
                ) : (
                    <>
                    <div onClick={() => (handleClick(id), handleLoggerFn(!isCompleted ? `User completed the todo` : `User canceled completed the todo`))} 
                        style={{ width: "100%", color: "white", fontSize: "3vmin", textDecoration: isCompleted ? "line-through" : "none" }}
                    >
                        {title}
                    </div>
                    <div style={{ display: "flex", width: "7vw", justifyContent: "space-around" }}>
                        <Button 
                            handleClick={() => (setIsEditing(prev => !prev), handleLoggerFn(`User click to EDIT button`))}>
                                <FaRegEdit />
                        </Button>
                        <Button 
                            handleClick={() => (handleDelete(id), handleLoggerFn(`User click to DELETE button and deleted todo with id: ${id}`))}>
                                <MdDelete />
                        </Button>
                    </div>
                </>
                )
            }
        </div>
    )
};

export const TodoListWithLogging = withLogging(Todo);