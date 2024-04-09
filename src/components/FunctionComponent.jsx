import React, { useEffect, useState } from "react";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImliYWR0b2ZmQGdtYWlsLmNvbSIsImlkIjo2MjIsImlhdCI6MTcxMTkxNTAzMH0.ovejTfPPzlPYaAWAAVm_kSzArE_-aFaSPbG-DtcUcjw"

export const FunctionComponent = React.memo(() => {

        const [state, setState] = useState({
            count: 0,
            todos: []
        });

        useEffect(() => {
            console.log("Component Did Mount from Function Component");
            fetch("https://todo-redev.herokuapp.com/api/todos?isCompleted=false", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(todoList => setState(prev => ({ ...prev, todos: todoList })));
        }, []);

        useEffect(() => {
            console.log("Component Did Update from Function Component");
            if(state.count % 2 === 0) {
                console.log(state.count);
            } 
        }, [state.count]);
        
        useEffect(() => {
            return () => {
                console.log("Component Will Unmount from Function Component");
            }
        }, [state.todos]);

        return (
            <>
                <div>Function Component</div>
                <div>
                    {
                        state.count
                    }
                </div>
                <button onClick={() => setState(prev => ({...prev, count: prev.count + 1}))}>Click</button>
                {
                    !!state.todos.length &&
                    state.todos.map(({id, title}) => <div key={id+5}>{title}</div>)
                }
                <button onClick={() => setState(prev => ({...prev, todos: []}))}>Unmount</button>
            </>
        );
    }, (prevProps, nextProps) => {
        if(prevProps !== nextProps) {
            console.log("Component Should Update From Function Component");
            return true;
        } return false;
    }
)