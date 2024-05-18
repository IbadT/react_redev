import { useState } from 'react'
import { InputField } from './components/InputField/InputField'
import { TodoList } from './components/TodoList/TodoList';
import { TodoTypes } from './types/TodoTypes';


function App() {

  const [todos, setTodos] = useState<TodoTypes[]>([]);

  return (
    <div style={{ 
        backgroundColor: "rgb(26, 26, 61)",  
        borderRadius: "7px",
        width: "50vw", display: "flex", 
        justifyContent: "center", 
        flexDirection: "column",
        padding: "10%",
        marginTop: "5vh"
      }}
    >
      <h1 style={{ color: "white", textAlign: "center" }}>Get things done!</h1>
      <InputField setTodos={setTodos}/>
      <TodoList setTodos={setTodos} todos={todos}/>
    </div>
  );
};

export default App;