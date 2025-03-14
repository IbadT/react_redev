import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../components/MainPage/MainPage";
import { Favorites } from "../components/Favorites/Favorites";
import { SearchList } from "../components/SearchList/SearchList";
import { Login } from "../components/Login/Login";
import { SaveRequest } from "../components/SaveRequest/SaveRequest";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainPage,
    ErrorBoundary: ErrorPage
  },
  {
    path: "/favorites",
    Component: Favorites,
    ErrorBoundary: ErrorPage
  },
  // {
  //   path: "/register",
  //   Component: Register,
  //     ErrorBoundary: ErrorPage
  // },
  {
    path: "/login",
    Component: Login,
    ErrorBoundary: ErrorPage
  },
  {
    path: "/search",
    Component: SearchList,
    ErrorBoundary: ErrorPage
  },
  {
    path: "/save-request",
    Component: SaveRequest,
    ErrorBoundary: ErrorPage
  },
  // {
  //   path: "/error",
  //   Component: ErrorPage
  // },
  // {
  //   path: "/loading",
  //   Component: Loading
  // },


  
]);