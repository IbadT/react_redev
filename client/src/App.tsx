import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Login } from './components/Login/Login';
import { SearchList } from './components/SearchList/SearchList';
import { Favorites } from './components/Favorites/Favorites';
import { NotFound } from './components/ErrorPage/NotFound';
import { MainPage } from './components/MainPage/MainPage';
import { SaveRequest } from './components/SaveRequest/SaveRequest';
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
// import { ErrorPage } from './components/ErrorPage/ErrorPage';

// import { scan } from 'react-scan';

// if (typeof window !== 'undefined') {
//   scan({
//     enabled: true,
//     log: true,
//   });
// }



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/register"} element={<Login />}/>
        <Route element={<ProtectedRoute />}>
          <Route path={"/"} element={<MainPage />}>
            <Route path={"/favorites"} element={<Favorites />}/>
            <Route path={"/search/:favorite_id?"} element={<SearchList />}/>
          </Route>
          <Route path={"/save-request/:favorite_id?"} element={<SaveRequest />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;