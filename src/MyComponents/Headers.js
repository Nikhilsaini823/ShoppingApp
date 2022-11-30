import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Headers(props) {
  const [user, setUser] = useState({ email: "", user_id: "", username: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      let token = localStorage.getItem("token");
      if (token && token.length !== 0 && token !== undefined) {
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser({
          email: userInfo.email,
          user_id: userInfo.user_id,
          username: userInfo.username,
        });
      }
      console.log(user);
    }
    getToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My Todo List
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              {user.username.length > 1 && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/product">
                      Product
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {props.searchBar ? (
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-sm btn-success me-3 " type="submit">
                  Search
                </button>
                {user.username.length == 0 && (
                  <Link className="btn btn-primary ml-3" to="/login">
                    Login
                  </Link>
                )}
                {user.username.length > 1 && (
                  <button className="btn btn-primary ml-3" onClick={logout}>
                    Logout
                  </button>
                )}
              </form>
            ) : (
              " "
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

Headers.defaultProps = {
  title: "your title here",
  searchBar: true,
};
