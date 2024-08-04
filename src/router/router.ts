import { createBrowserRouter } from "react-router-dom";
import { Register } from "../components/Register/Register";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";
import { Loading } from "../components/Loading/Loading";
import { Login } from "../components/Login/Login";
import { TodoList } from "../components/TodoList/TodoList";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: TodoList,
    ErrorBoundary: ErrorPage
  },
  {
    path: "/register",
    Component: Register,
      ErrorBoundary: ErrorPage
  },
  {
    path: "/login",
    Component: Login,
    ErrorBoundary: ErrorPage
  },
  {
  path: "/error",
    Component: ErrorPage
  },
  {
    path: "/loading",
    Component: Loading
  }
]);