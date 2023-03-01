import React from "react";
import { DasboardMain } from "./DasboardMain";
import { Menu } from "./Menu";

function Dashbard() {
  return (
    <>
      <div className="dash-board-main">
        <Menu />
        <DasboardMain />
      </div>
    </>
  );
}

export { Dashbard };
