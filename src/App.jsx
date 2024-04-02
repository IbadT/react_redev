import { useEffect, useState, useRef } from 'react';
import './App.css';
import { List } from './components/List';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImliYWR0b2ZmQGdtYWlsLmNvbSIsImlkIjo2MjIsImlhdCI6MTcxMTkxNTAzMH0.ovejTfPPzlPYaAWAAVm_kSzArE_-aFaSPbG-DtcUcjw"

function App() {
  const [state, setState] = useState([]);
  const [text, setText] = useState('');
  const ref = useRef(null);

  useEffect( () => {
    fetch("https://todo-redev.herokuapp.com/api/todos?isCompleted=false", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setState(data));
  }, []);

  const addFocus = () => {
    ref.current.focus();
  };

  const addTodo = (e) => {
    if(e.key === 'Enter') {
      const lastId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
      setState(prev => [...prev, { id: lastId, title: text, isCompleted: false, user_id: 622 }]);
      setText("");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input 
          ref={ref} 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => addTodo(e)}
        />
        <button onClick={() => addFocus()}>Add Focus</button>
        <List state={state} setState={setState}/>
      </header>
    </div>
  );
}

export default App;