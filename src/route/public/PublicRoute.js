import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const data = window.localStorage.getItem("user");
  const token = JSON.parse(data)?.accessToken;
  return !token ? <Outlet /> : <Navigate to={{ pathname: "/home" }} />;
}

export default PublicRoute;
