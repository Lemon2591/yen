import { Navigate, Outlet } from "react-router-dom";
import AppPrivate from "./AppPrivate";
function PrivateRoute() {
  const data = window.localStorage.getItem("user");
  const token = JSON.parse(data)?.accessToken;
  return token ? <Outlet /> : <Navigate to={{ pathname: "/" }} />;
}

export default PrivateRoute;
