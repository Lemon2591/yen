import { Dashbard } from "../../component/Dashbard";
import { Add } from "../../component/Add";
const PrivateRouting = [
  {
    path: "/home",
    Component: Dashbard,
    exact: true,
  },
  {
    path: "/add",
    Component: Add,
  },
];

export default PrivateRouting;
