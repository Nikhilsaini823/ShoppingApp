import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [userpasswordErr, setuserpasswordErr] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  const eye = <FontAwesomeIcon icon={faEye} />;
  let token = "";

  useEffect(() => {
    async function getToken() {
      token = localStorage.getItem("token");
      if (token && token.length !== 0) {
        navigate("/");
      }
    }
    getToken();
  }, []);

  const handleUsernameChange = (event) => {
    setUsernameErr("");
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordErr("");
    setPassword(event.target.value);
  };
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const validate = () => {
    let status = true;
    setuserpasswordErr("");
    if (username.length === 0) {
      setUsernameErr("This field is required");
      status = false;
    }
    if (password.length === 0) {
      setPasswordErr("This field is required");
      status = false;
    }
    return status;
  };
  const Login = () => {
    if (validate()) {
      const payload = { username: username, password: password };
      axios
        .post("http://localhost:8000/login/", payload)
        .then(function (response) {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
          setuserpasswordErr("invalid username and password");
        });
    }
  };
  return (
    <>
      <div>
        <section className="vh-100 gradient-custom bgcolor">
          <div className="container py-5 h-100 ">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ border_radius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <label className="form-label">Username</label>
                        <input
                          type={username}
                          value={username}
                          className="form-control"
                          name="username"
                          onChange={handleUsernameChange}
                          placeholder="Username"
                        />
                        <p className="textcolor">{usernameErr}</p>
                      </div>

                      <div className="form-outline form-white mb-4 ">
                        <label className="form-label">Password</label>
                        <input
                          type={passwordShown ? "text" : "password"}
                          onChange={handlePasswordChange}
                          value={password}
                          name="password"
                          className="form-control"
                          placeholder="Password"
                        />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>
                        <p className="textcolor">{passwordErr}</p>
                      </div>
                      <p className="textcolor">{userpasswordErr}</p>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        onClick={Login}
                      >
                        Login
                      </button>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1"></div>
                    </div>

                    <div>
                      <p className="mb-0">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-white-50 fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
