import React from "react";
import { AddList } from "./add/AddList";
import { Menu } from "./Menu";

export function Add() {
  return (
    <>
      <div className="dash-board-main">
        <Menu />
        <div className="Addlist-main">
          <AddList />
        </div>
      </div>
    </>
  );
}
