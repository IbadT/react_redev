import React, { useState } from 'react'
import { Button } from '../Buttons/Button'
import { PropsType } from './types/InputFieldTypes';
import { TodoTypes } from '../../types/TodoTypes';

export const InputField: React.FC<PropsType> = ({ setTodos }) => {
    
    const [state, setState] = useState<string>('');
    
    const handleClick = () => {
        // ERROR --> Argument of type '(prev: TodoTypes[]) => void' is not assignable to parameter of type 'TodoTypes[]'
        setTodos((prev: TodoTypes[]) => {
            [...prev, 
                { 
                    id: prev.length > 0 ? prev[prev.length-1].id+1 : 0, 
                    title: state, 
                    isCompleted: false 
                }
            ]
        });
        setState('');
    };

    return (
        <div style={{ display: "flex" }}>
            <input 
                placeholder="What is the task today?"
                onChange={e => setState(e.target.value)}
                value={state}
                style={{ 
                    backgroundColor: "transparent",
                    border: "1px solid rgb(128, 90, 246)",
                    width: "90%",
                    color: "white",
                    fontSize: "4vmin"
                }} 
            />
            <Button handleClick={handleClick}>Add task</Button>
        </div>
    )
}