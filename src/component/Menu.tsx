import React from "react";
import { AiOutlineHome, AiOutlineFileAdd } from "react-icons/ai";
import { HiStatusOnline } from "react-icons/hi";
import { FiSettings, FiLogIn } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="menu-main">
        <div className="menu-container">
          <div className="menu-header">
            <p>.todo-app </p>
          </div>
          <div className="menu-content">
            <ul>
              <li>
                <NavLink className="nav-link" to="/home">
                  <span>
                    <AiOutlineHome />
                  </span>
                  <span>Overview</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-link" to="/add">
                  <span>
                    <AiOutlineFileAdd />
                  </span>
                  <span>Add List</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="menu-footer menu-content">
            <ul>
              <li>
                <span>
                  <FiSettings />
                </span>
                <span>Setting</span>
              </li>
              <li>
                <span>
                  <FiLogIn />
                </span>
                <span onClick={logout}>Log out</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export { Menu };
