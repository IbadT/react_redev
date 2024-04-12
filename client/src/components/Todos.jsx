import { useState, useEffect } from "react"
import { getTokenFromLocalStorage } from "../helpers/localstorages.ts";
import { Navigate } from "react-router-dom";

export const Todos = () => {
    
    const token = getTokenFromLocalStorage("token");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/todo', {
            headers: {
                "Content-Type": "application/json; charset=utf-8 ",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(data => data.json())
            .then(todos => setTodos(todos))
            .catch(err => console.log("error: ", err.message))
    }, [token]);

    return (
        <>
            {
                token ? todos.map(({ id, title }) => <div 
                    style={{ display: "flex", justifyContent: "center", marginTop: "1vh"}} 
                    key={id}>
                        {title}
                    </div>
                ) : <Navigate to={"/login"} replace/>
            }
            {
                !todos && <div>Вам нужно авторизироваться</div>
            }
        </>
    )
}