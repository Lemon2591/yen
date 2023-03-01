import React, { useState } from "react";
import "../../css/login.css";
import { Loading } from "../Loading";
import { NavLink } from "react-router-dom";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<{ userName: string; passWord: string }>({
    userName: "",
    passWord: "",
  });

  const onGetUser = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setIsLogin(false);
  };

  const login = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      setIsLoading(true);
      fetch("https://alo-server.onrender.com/api/user/data/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setIsLoading(false);
            window.localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "/home";
          } else {
            setUser({
              userName: "",
              passWord: "",
            });
            setIsLoading(false);
            setIsLogin(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="align">
        <div className="grid">
          <form className="form login">
            <div className="form__field">
              <label htmlFor="login__username">
                <svg className="icon">
                  <use xlinkHref="#icon-user"></use>
                </svg>
                <span className="hidden">Username</span>
              </label>
              <input
                // autocomplete="username"
                id="login__username"
                type="text"
                name="userName"
                className="form__input"
                placeholder="Tài khoản"
                required
                value={user.userName}
                onChange={onGetUser}
              />
            </div>

            <div className="form__field">
              <label htmlFor="login__password">
                <svg className="icon">
                  <use xlinkHref="#icon-lock"></use>
                </svg>
                <span className="hidden">Password</span>
              </label>
              <input
                id="login__password"
                type="password"
                name="passWord"
                className="form__input"
                placeholder="Mật khẩu"
                required
                value={user.passWord}
                onChange={onGetUser}
              />
            </div>
            {isLogin ? (
              <div>
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    margin: "15px 0 0 0",
                  }}
                >
                  Thông tin tài khoản hoặc mật khẩu không chính xác !
                </p>
              </div>
            ) : (
              <div>
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    margin: "15px 0 0 0",
                  }}
                >
                  &ensp;
                </p>
              </div>
            )}

            <div className="form__field">
              <button
                onClick={login}
                className="btn-log"
                style={{
                  padding: "2rem",
                  cursor: "pointer",
                  width: "100%",
                  background: "none",
                }}
              >
                Đăng nhập
              </button>
            </div>
          </form>

          <p className="text--center">
            <NavLink
              className="nav-link"
              to="/register"
              style={{ fontSize: "16px", color: "#000" }}
            >
              Đăng ký ngay !
            </NavLink>
          </p>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" className="icons">
          <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
            <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
          </symbol>
          <symbol id="icon-lock" viewBox="0 0 1792 1792">
            <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
          </symbol>
          <symbol id="icon-user" viewBox="0 0 1792 1792">
            <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
          </symbol>
        </svg>
      </div>
    </>
  );
}

export { Login };
