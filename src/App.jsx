import { useEffect, useState, useRef, useContext } from 'react';
import { List } from './components/List';
import { ThemeContext } from './contexts/ThemeContext';
import { getTheme } from './helpers/getTheme'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImliYWR0b2ZmQGdtYWlsLmNvbSIsImlkIjo2MjIsImlhdCI6MTcxMTkxNTAzMH0.ovejTfPPzlPYaAWAAVm_kSzArE_-aFaSPbG-DtcUcjw"


function App() {
  const [state, setState] = useState([]);
  const [text, setText] = useState('');
  const [theme, setTheme] = useState(getTheme);
  
  const themes = useContext(ThemeContext);

  const ref = useRef(null);
    
  useEffect(() => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("theme", theme);
  }, [theme]);

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
    <>
    <nav>
      
    </nav>
      <input 
        ref={ref} 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => addTodo(e)}
      />
      <button onClick={() => addFocus()}>Add Focus</button>
      <List state={state} setState={setState}/>

      <input 
        type="checkbox"
        onClick={() => {
          if(theme === themes.dark) setTheme(themes.light);
          if(theme === themes.light) setTheme(themes.dark);
        }}
      />
    </>
  );
};

export default App;