import { FirstComp } from './components/FirstComp';
import { SecondComp } from './components/SecondComp';
import { ThirdComp } from './components/ThirdComp';
import './App.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(prev => prev+1)
  return (
    <div className="App">
      <header className="App-header">
        <div>Количество раз: {count}</div>
        <button onClick={handleClick}>Click</button>
        <FirstComp />
        <SecondComp />
        <ThirdComp />
      </header>
    </div>
  );
}

export default App;
// git request-pull master origin