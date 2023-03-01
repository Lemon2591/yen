import React from "react";
import "./App.css";
import "../src/css/index.css";
import { Dashbard } from "./component/Dashbard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./route/public/PublicRoute";
import PublicRouting from "./route/public/PublicRouting";
import PrivateRoute from "./route/private/PrivateRoute";
import PrivateRouting from "./route/private/PrivateRouting";
import AppPrivate from "./route/private/AppPrivate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          {PublicRouting.map((privateRoute, index) => {
            const { path, Component, exact } = privateRoute;
            return (
              <Route
                key={index}
                path={path}
                element={<Component />}
                // exact={`${exact}`}
              />
            );
          })}
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          {/* <Route path="/" element={<AppPrivate />}> */}
          {PrivateRouting.map((routingPatient, index) => {
            const { path, Component, exact } = routingPatient;
            return <Route key={index} path={path} element={<Component />} />;
          })}
          {/* </Route> */}
        </Route>

        {/* <Route path="*" element={<ErrPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
