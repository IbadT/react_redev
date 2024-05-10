import React from "react";
import { Button } from "../Buttons/Button"
import { PropsType } from "./types/TodoTypes";
import { TodoTypes } from "../../types/TodoTypes";


export const Todo: React.FC<PropsType> = ({ title, id, setTodos, isCompleted }) => {

    const handleClick = (id: number) => {
        // ERROR --> Argument of type '(prev: TodoTypes[]) => TodoTypes[]' is not assignable to parameter of type 'TodoTypes[]'
        setTodos((prev: TodoTypes[]) => {
            return prev.map((i: TodoTypes) => i.id === id ? {...i, isCompleted: !i.isCompleted} : i);
        });
    };

    const handleDelete = (id: number) => {
        // ERROR --> Argument of type '(prev: TodoTypes[]) => TodoTypes[]' is not assignable to parameter of type 'TodoTypes[]'
        setTodos((prev: TodoTypes[]) => {
            const newTodos = prev.filter((i: TodoTypes) => i.id !== id);
            return [...newTodos];
        });
    };

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            backgroundColor: "rgb(128, 90, 246)", 
            borderRadius: "5px",
            marginTop: "3vh",
            padding: "2vh"
        }}>
            <div style={{ color: "white", fontSize: "3vmin", textDecoration: isCompleted ? "line-through" : "none" }}>{title}</div>
            <div style={{ display: "flex", width: "7vw", justifyContent: "space-around" }}>
                <Button handleClick={() => handleClick(id)}>E</Button>
                <Button handleClick={() => handleDelete(id)}>D</Button>
            </div>
        </div>
    )
};



