import { FirstComp } from './components/FirstComp';
import { SecondComp } from './components/SecondComp';
import { ThirdComp } from './components/ThirdComp';
import { FourthComp } from './components/FourthComp';
import { FifthComp } from './components/FifthComp';
import './App.css';

function App() {
  const arr = [1,2,3,4,5];
  const obj = { text: "Hello React!" }
  const fn = () => "My function"
  return (
    <div className="App">
      <header className="App-header">
        <FirstComp str={"Hello"} num={22} />
        <SecondComp arr={arr}/>
        <ThirdComp bool={true}/>
        <FourthComp obj={obj}/>
        <FifthComp fn={fn}/>
      </header>
    </div>
  );
}

export default App;
