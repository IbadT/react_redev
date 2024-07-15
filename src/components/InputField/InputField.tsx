import React, { useState } from 'react'
import { Button } from '../Buttons/Button'
import { PropsType } from './types/InputFieldTypes';
import { TodoTypes } from '../../types/TodoTypes';
import { withLogging } from '../HOC/withLogger';
import { v4 as uuidv4 } from 'uuid';

const inputStyle = { 
    backgroundColor: "transparent",
    border: "1px solid rgb(128, 90, 246)",
    width: "90%",
    color: "white",
    fontSize: "4vmin"
}

const InputField: React.FC<PropsType> = ({ setTodos, logUserAction }) => {
    
    const [state, setState] = useState<string>('');
    
    const handleLoggerFn = (message: string): void => {
        if(logUserAction) {
            return logUserAction(message);
        } else {
            console.log("ERROR");
        }
    };

    const handleClick = () => {

        setTodos((prev: TodoTypes[]) => [...prev, 
            { 
                id: uuidv4(),
                title: state, 
                isCompleted: false 
            }
        ]);
        handleLoggerFn(`Пользователь нажал на кнопку ADD TASK и добавил todo: ${state}`)
        setState('');
    };

    return (
        <div style={{ display: "flex" }}>
            <input 
                placeholder="What is the task today?"
                onChange={e => setState(e.target.value)}
                onClick={() => handleLoggerFn("Пользователь хочет добавить todo")}
                value={state}
                style={inputStyle} 
            />
            <Button handleClick={handleClick}>Add task</Button>
        </div>
    )
};

export const InputFieldWithLogging = withLogging(InputField);