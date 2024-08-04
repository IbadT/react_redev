import { useState, useEffect } from "react";
import { TodoListWithLogging } from "../Todo/Todo";
import { TodoTypes } from "../../types/TodoTypes";
import { InputFieldWithLogging } from "../InputField/InputField";
import styles from './style.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Flex } from "antd";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const TodoList = () => {

    const [todos, setTodos] = useState<TodoTypes[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token')
        toast.success("You're successfully logged out", { autoClose: 2000, transition: Flip});
        setTimeout(() => navigate('/login'), 2000)
    }

    useEffect(() => {
        if(token) {
            fetch(`${process.env.REACT_APP_TODOS_URL}`, {
                headers: {
                    "Content-type": "application/json;charset=utf-8",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(data => data.json())
            .then(todos => setTodos(todos))
            .catch(({message}) => toast.error(message));
        } 
    }, [token]);

    return (
        <>
        {
            token ? <Flex gap={20} className={styles.todo_list} vertical>
                <Flex justify="center" style={{ color: "white", textAlign: "center", fontSize: "8vmin" }}>Get things done!</Flex>
                <InputFieldWithLogging setTodos={setTodos}/>
                <Flex vertical gap={20}>
                    {
                        todos && 
                        todos.map(({id, title, isCompleted}) => 
                            <TodoListWithLogging setTodos={setTodos} key={id} id={id} title={title} isCompleted={isCompleted}/>
                    )
                    }
                    <Flex vertical align="center" style={{ color: "white"}}>
                        <Button type="link" className={styles.logout_btn} onClick={() => logout()}>LogOut</Button>
                    </Flex>
                </Flex>
            </Flex> : <Navigate to="login" replace={true}/>
        }
        <ToastContainer autoClose={2000} transition={Flip} style={{ fontSize: "2vh"}}/>
        </>
    )
};