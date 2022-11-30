import React, { useEffect, useState } from "react";
import "./Login";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstErr, setFirstErr] = useState("");
  const [lastErr, setLastErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const navigate = useNavigate();

  const handleFirstChange = (event) => {
    setFirstErr("");
    setFirst(event.target.value);
  };
  const handleLastChange = (event) => {
    setLastErr("");
    setLast(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailErr("");
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordErr("");
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsernameErr("");
    setUsername(event.target.value);
  };

  const validate = () => {
    let status = true;
    if (first.length === 0) {
      setFirstErr("This field is required");
      status = false;
    }
    if (last.length === 0) {
      setLastErr("This field is required");
      status = false;
    }
    if (email.length === 0) {
      setEmailErr("This field is required");
      status = false;
    }
    if (password.length === 0) {
      setPasswordErr("This field is required");
      status = false;
    }
    if (username.length === 0) {
      setUsernameErr("this field is required");
      status = false;
    }
    return status;
  };
  const Submit = () => {
    validate();
    if (validate()) {
      const payload = {
        first_name: first,
        last_name: last,
        email: email,
        password: password,
        username: username,
      };
      axios
        .post("http://localhost:8000/auth/register/", payload)
        .then(function (response) {
          console.log(response);
          window.alert("account created sucessfully");
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div
                className="card shadow-2-strong card-registration"
                style={{ border_radius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration Form
                  </h3>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            className="form-control form-control-lg"
                            onChange={handleFirstChange}
                          />
                          <label
                            className="form-label"
                            value={first}
                            htmlFor="firstName"
                          >
                            First Name
                          </label>
                          <p className="textcolor">{firstErr}</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="lastName"
                            className="form-control form-control-lg"
                            onChange={handleLastChange}
                          />
                          <label
                            className="form-label"
                            value={last}
                            htmlFor="lastName"
                          >
                            Last Name
                          </label>
                          <p className="textcolor">{lastErr}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            onChange={handleEmailChange}
                          />
                          <label
                            className="form-label"
                            value={email}
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <p className="textcolor">{emailErr}</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 ">
                        <div className="form-outline">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            onChange={handlePasswordChange}
                          />
                          <label
                            className="form-label"
                            value={password}
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <p className="textcolor">{passwordErr}</p>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 ">
                        <div className="form-outline">
                          <input
                            type="username"
                            id="username"
                            className="form-control form-control-lg"
                            onChange={handleUsernameChange}
                          />
                          <label
                            className="form-label"
                            value={username}
                            htmlFor="username"
                          >
                            Username
                          </label>
                          <p className="textcolor">{usernameErr}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-2">
                      <input
                        className="btn btn-primary btn-lg"
                        onClick={Submit}
                        type="button"
                        value="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
