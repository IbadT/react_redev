import React, { useState } from "react";
import { CastomButton } from "../Buttons/Button"
import { PropsType } from "./types/TodoTypes";
import { TodoTypes } from "../../types/TodoTypes";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { withLogging } from "../HOC/withLogger";
import { Flex, Input } from "antd";
import styles from './style.module.css';



export const Todo: React.FC<PropsType> = ({ id, title, setTodos, isCompleted, logUserAction }) => {

    const token = localStorage.getItem('token')

    const [isEditing, setIsEditing] = useState(false);
    const [state, setState] = useState<string>(title);

    const handleClick = (id: string) => {
        fetch(`https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(data => data.json())
        .then(data => setTodos((prev: TodoTypes[]) => prev.map((i: TodoTypes) => i.id === data[0].id ? data[0] : i)))
        .catch(({ message }) => console.log(message));
    };

    const handleEdit = (id: string) => {
        fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: state })
        })
        .then(data => data.json())
        .then(data => setTodos((prev: TodoTypes[]) => prev.map((i: TodoTypes) => i.id === id ? {...data} : i)))
        .catch(({ message }) => console.log(message));
        setIsEditing(prev => !prev);
    };

    const handleDelete = (id: string) => {
        fetch(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(data => data.json())
        .then(data => setTodos((prev: TodoTypes[]) => prev.filter((i: TodoTypes) => i.id !== data.id)))
        .catch(({ message }) => console.log(message));
    };

    const handleLoggerFn = (message: string): void => {
        if(logUserAction) {
            return logUserAction(message);
        } else {
            console.log("ERROR");
        }
    };

    const executerFunction = (fn: void, str: string) => {
        handleLoggerFn(str);
    }

    return (
        <Flex className={styles.todo}>
            {
                isEditing ? (
                    <Flex gap={5} style={{ width: "100%" }} justify="space-between">
                        <Input size="small" className={styles.inputStyle} 
                            onClick={() => handleLoggerFn("Пользователь хочет изменить todo")}  
                            onKeyDown={() => handleLoggerFn(`Пользователь меняет todo на ${state}`)}
                            onChange={(e) => setState(e.target.value)} value={state}/>
                        <CastomButton handleClick={() => executerFunction(handleEdit(id), `Пользователь изменил todo с id: ${id}`)}>Update</CastomButton>
                    </Flex>
                ) : (
                    <>
                    <Flex onClick={() => executerFunction(handleClick(id), !isCompleted ? `Пользователь выполнил todo` : `Пользователь отменил выполнение todo`)} 
                        style={{ width: "100%", color: "white", fontSize: "3vmin", textDecoration: isCompleted ? "line-through" : "none" }}
                    >
                        {title}
                    </Flex>
                    <Flex style={{ display: "flex", width: "7vw", justifyContent: "space-around"}}>
                        <CastomButton 
                            handleClick={() => executerFunction(setIsEditing(prev => !prev), `Пользователь нажал на кнопку EDIT`)}>
                                <FaRegEdit />
                        </CastomButton>
                        <CastomButton 
                            handleClick={() => executerFunction(handleDelete(id), `Пользователь нажал на кнопку DELETE и удалил todo с id: ${id}`)}>
                                <MdDelete />
                        </CastomButton>
                    </Flex>
                </>
                )
            }
        </Flex>
    )
};

export const TodoListWithLogging = withLogging(Todo);