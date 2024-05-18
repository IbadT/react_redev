import React, { useState } from 'react'
import { Button } from '../Buttons/Button'
import { PropsType } from './types/InputFieldTypes';
import { TodoTypes } from '../../types/TodoTypes';

const inputStyle = { 
    backgroundColor: "transparent",
    border: "1px solid rgb(128, 90, 246)",
    width: "90%",
    color: "white",
    fontSize: "4vmin"
}

export const InputField: React.FC<PropsType> = ({ setTodos }) => {
    
    const [state, setState] = useState<string>('');
    
    const handleClick = () => {
        setTodos((prev: TodoTypes[]) => [...prev, 
            { 
                id: prev.length > 0 ? prev[prev.length-1].id+1 : 0, 
                title: state, 
                isCompleted: false 
            }
        ]);
        setState('');
    };

    return (
        <div style={{ display: "flex" }}>
            <input 
                placeholder="What is the task today?"
                onChange={e => setState(e.target.value)}
                value={state}
                style={inputStyle} 
            />
            <Button handleClick={handleClick}>Add task</Button>
        </div>
    )
};