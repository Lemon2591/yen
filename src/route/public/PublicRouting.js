import { Login } from "../../component/login/Login";
import { Register } from "../../component/login/Register";

const PublicRouting = [
  {
    path: "/",
    Component: Login,
    exact: true,
  },
  {
    path: "/register",
    Component: Register,
    exact: true,
  },
];

export default PublicRouting;
