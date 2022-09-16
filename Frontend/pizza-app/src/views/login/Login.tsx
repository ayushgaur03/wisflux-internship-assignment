import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../app/actions./authMethod";
import { authActions } from "../../app/slices/authSlice";
import { useAppDispatch } from "../../app/store";
import { AUTH_URL } from "../../components/routes";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user_email, setUser_email] = useState("");
  const [user_password, setUser_password] = useState("");
  const [user_name, setUser_name] = useState("");
  const [user_mobile, setUser_mobile] = useState<string>("");
  const [process, setProcess] = useState("SignIn");

  const verifyLogin = (e: any) => {
    e.preventDefault();
    console.log("Verifying...");
    const REG_REQ_BODY = {
      email: user_email,
      password: user_password,
    };

    axios
      .post(`${AUTH_URL}/login`, REG_REQ_BODY)
      .then((result: AxiosResponse) => {
        console.log(result);
        const data = result.data.data
        console.log(data);
        dispatch(authActions.LogInUser());
        dispatch(
          authActions.UpdateClientData({
            client_name: data.name,
            client_id: data.user_id,
          })
        );
      })
      .catch((err: AxiosError) => {
        console.log(err);
      })
      .finally(() => {
        navigate("../menu");
      });
  };

  const register = (e: any) => {
    e.preventDefault();
    const REG_REQ_BODY = {
      name: user_name,
      email: user_email,
      mobile_no: user_mobile,
      password: user_password,
    };

    console.log("Registering");
    RegisterUser(REG_REQ_BODY);
    axios
      .post(`${AUTH_URL}/register`, REG_REQ_BODY)
      .then((result: AxiosResponse) => {
        console.log(result);
        const data = result.data.data;
        dispatch(
          authActions.UpdateClientData({
            client_name: data.name,
            client_id: data.user_id,
          })
        );
      })
      .catch((err: AxiosError) => {
        console.log(err);
      })
      .finally(() => {
        navigate("../menu");
      });
  };

  return (
    <div className="login">
      <div className="container">
        <div className="upper-box">
          <h2>For PizzaMonger Family</h2>
          <p>Join us and enjoy your favourite pizza anytime</p>
        </div>
        <div className="main-box">
          <div className="tab-header">
            <div
              className={process === "SignUp" ? "active" : ""}
              onClick={() => setProcess("SignUp")}
            >
              Sign Up
            </div>
            <div
              className={process === "SignIn" ? "active" : ""}
              onClick={() => setProcess("SignIn")}
            >
              Sign In
            </div>
          </div>
          <div className="tab-content">
            <div
              className={
                process === "SignIn" ? "form-content active" : "form-content"
              }
            >
              <form onSubmit={verifyLogin}>
                <input
                  type="email"
                  value={user_email}
                  placeholder="Email"
                  autoComplete="current-email"
                  onChange={(e) => setUser_email(e.target.value)}
                />
                {/* <input
                  type="number"
                  value={user_mobile}
                  placeholder="Mobile No"
                  autoComplete="new-mobile"
                  onChange={(e) => setUser_mobile(e.target.value)}
                /> */}
                <input
                  type="password"
                  value={user_password}
                  placeholder="Password"
                  autoComplete="current-password"
                  onChange={(e) => setUser_password(e.target.value)}
                />
                <button type="submit" value="Submit">
                  Submit
                </button>
              </form>
            </div>
            <div
              className={
                process === "SignUp" ? "form-content active" : "form-content"
              }
            >
              <form onSubmit={register}>
                <input
                  type="text"
                  value={user_name}
                  onChange={(e) => setUser_name(e.target.value)}
                  autoComplete="new-name"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={user_email}
                  placeholder="Email"
                  autoComplete="new-email"
                  onChange={(e) => setUser_email(e.target.value)}
                />
                <input
                  type="number"
                  value={user_mobile}
                  placeholder="Mobile No"
                  autoComplete="new-mobile"
                  onChange={(e) => setUser_mobile(e.target.value)}
                />
                <input
                  type="password"
                  value={user_password}
                  placeholder="Password"
                  autoComplete="new-password"
                  onChange={(e) => setUser_password(e.target.value)}
                />
                <button type="submit" value="Submit">
                  <span>SUBMIT</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
