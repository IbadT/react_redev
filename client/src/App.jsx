import { Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';
import { Navigation } from './components/Navigation';
import { Todos } from './components/Todos';

// передать токен в useContext и пользоваться им

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<Todos />}/>
        <Route path='/login' element={<LoginForm />}/>
        <Route path='/register' element={<RegistrationForm />}/>
      </Routes>
    </>
  );
};

export default App;