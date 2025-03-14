import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Если токен есть, рендерим дочерние компоненты
  // Если токена нет, перенаправляем на /login
  return token 
    ? <Outlet /> 
    : <Navigate to="/login" replace />;
};
