import './App.css';
import LifecycleComponent from './components/LifecycleComponent';
import { FunctionComponent } from './components/FunctionComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LifecycleComponent />
        <hr/>
        <FunctionComponent />
      </header>
    </div>
  );
}

export default App;
// git request-pull master origin