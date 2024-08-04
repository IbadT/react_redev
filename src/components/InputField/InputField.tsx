import React, { useState } from 'react'
import { CastomButton } from '../Buttons/Button'
import { PropsType } from './types/InputFieldTypes';
import { TodoTypes } from '../../types/TodoTypes';
import { withLogging } from '../HOC/withLogger';
import { Flex, Input } from 'antd';
import styles from './style.module.css';



const InputField: React.FC<PropsType> = ({ setTodos, logUserAction }) => {
    
    const token = localStorage.getItem('token');
    const [state, setState] = useState<string>('');
    
    const handleLoggerFn = (message: string): void => {
        if(logUserAction) {
            return logUserAction(message);
        } else {
            console.log("ERROR");
        };
    };

    const handleClick = () => {
        fetch("https://todo-redev.herokuapp.com/api/todos", {
            method: "POST",
            headers: {
                "Content-type": "application/json;charset=utf-8",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title: state[0].toUpperCase() + state.slice(1)})
        })
        .then(data => data.json())
        .then(newTodo => setTodos((prev: TodoTypes[]) => [...prev, newTodo]))
        .catch(({ message }) => console.log({ message }));

        handleLoggerFn(`Пользователь нажал на кнопку ADD TASK и добавил todo: ${state}`)
        setState('');
    };

    return (
        <Flex gap={5}>

            <Input 
                size='small'
                placeholder="What is the task today?"
                onChange={e => setState(state.length > 0 ? e.target.value : e.target.value.toUpperCase())}
                onClick={() => handleLoggerFn("Пользователь хочет добавить todo")}
                value={state}
                className={styles.inputField}
            />
            <CastomButton handleClick={handleClick} title={state}>Add task</CastomButton>
        </Flex>
    )
};

export const InputFieldWithLogging = withLogging(InputField);