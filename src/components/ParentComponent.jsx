import { useState } from 'react';
import { ChildComponent } from './ChildComponent';
import { SiblingComponent } from './SiblingComponent'
import { arrayValues } from '../helpers/values';


export const ParentComponent = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <ChildComponent name={"Pavel"} counter={counter}/>
        {
          arrayValues.map(( {text, fn}, index ) => <button key={index} onClick={() => fn(setCounter)}>{text}</button>)
        }
        <SiblingComponent />
      </header>
    </div>
  );
}


// export const ParentComponent2 = () => {
//   const [counter, setCounter] = useState(0);

//   const increment = () => setCounter(prev => prev+1);
//   const decrement = () => setCounter(prev => prev-1);
//   const randomCounter = () => {
//  const rand = Math.floor(Math.random() * 11);
//  setCounter(rand)
//   }
// const remove = () => setCounter(0);
//   return (

//     <div className="App">
//       <header className="App-header">
//         <ChildComponent name={"Pavel"} counter={counter}/>
//           <button onClick={() => increment()}>Увеличить</button>
//           <button onClick={() => setCounter(0)}>Сбросить</button>
//           <button onClick={() => randomCounter()}>Случайное значение</button>
//           <button onClick={() => decrement()}>Уменьшить</button>
//         <SiblingComponent />
//       </header>
//     </div>
//   )
// }