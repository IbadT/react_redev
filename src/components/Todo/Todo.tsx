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

    const handleClick = async (id: string) => {
        const responseJson = await fetch(`${process.env.REACT_APP_URL}/todos/${id}/isCompleted`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await responseJson.json();
        setTodos((prev: TodoTypes[]) => prev.map((i: TodoTypes) => i.id === data[0].id ? data[0] : i))

    };

    const handleEdit = async (id: string) => {
        const responseJson = await fetch(`${process.env.REACT_APP_URL}/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: state })
        })
        const data = await responseJson.json();
        setTodos((prev: TodoTypes[]) => prev.map((i: TodoTypes) => i.id === id ? {...data} : i ))
        setIsEditing(prev => !prev);
    };

    const handleDelete = async (id: string) => {
        const responseJson = await fetch(`${process.env.REACT_APP_URL}/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await responseJson.json();
        setTodos((prev: TodoTypes[]) => prev.filter((i: TodoTypes) => i.id !== data.id))
    };

    const handleLoggerFn = (message: string): void => {
        if(logUserAction) {
            return logUserAction(message);
        } else {
            console.log("ERROR");
        }
    };

    const executerFunction = async (fn: Promise<void>, str: string, value: string) => {
        // fn()
        handleLoggerFn(str);
    };

    return (
        <Flex className={styles.todo}>
            {
                isEditing ? (
                    <Flex gap={5} style={{ width: "100%" }} justify="space-between">
                        <Input size="small" className={styles.inputStyle} 
                            onClick={() => handleLoggerFn("Пользователь хочет изменить todo")}  
                            onKeyDown={() => handleLoggerFn(`Пользователь меняет todo на ${state}`)}
                            onChange={(e) => setState(e.target.value)} value={state}/>
                        <CastomButton handleFunc={() => executerFunction(handleEdit(id), `Пользователь изменил todo с id: ${id}`, id)}>Update</CastomButton>
                    </Flex>
                ) : (
                    <>
                    <Flex onClick={() => executerFunction(handleClick(id), !isCompleted ? `Пользователь выполнил todo` : `Пользователь отменил выполнение todo`, id)} 
                        style={{ width: "100%", color: "white", fontSize: "3vmin", textDecoration: isCompleted ? "line-through" : "none" }}
                    >
                        {title}
                    </Flex>
                    <Flex style={{ display: "flex", width: "7vw", justifyContent: "space-around"}}>
                        <CastomButton 
                            handleFunc={() => executerFunction(handleEdit(id), `Пользователь нажал на кнопку EDIT`, id)}>
                                <FaRegEdit />
                        </CastomButton>
                        <CastomButton 
                            handleFunc={() => executerFunction(handleDelete(id), `Пользователь нажал на кнопку DELETE и удалил todo с id: ${id}`, id)}>
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