import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import Headers from "./Headers";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const images = [
    "ipad.jpg",
    "laptop.jpg",
    "images123.jpeg",
    "images11.jpg",
    "images.jpg",
  ];

  useEffect(() => {
    async function getToken() {
      setToken(localStorage.getItem("token"));
    }
    getToken();
  }, [token]);

  useEffect(() => {
    console.log(token);
    if (token) {
      getCart();
    }
  }, [token]);

  const getCart = () => {
    axios
      .get("http://localhost:8000/cart/", {
        headers: { Authorization: "Token " + token },
      })
      .then(function (response) {
        setCart(response.data.results);
      });
  };

  function randomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  function renderCart() {
    return cart.map((c) => {
      return (
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img
              src={`image/${randomImage()}`}
              className="img-fluid rounded-3"
              alt="Cotton T-shirt"
            />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <p className="lead fw-normal mb-2">{c.product.title}</p>
            <p>
              <span className="text-muted">Size: </span>M{" "}
              <span className="text-muted">Color: </span>Grey
            </p>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 className="mb-0">{c.product.price}</h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <a href="#!" className="text-danger">
              <i className="fas fa-trash fa-lg"></i>
            </a>
          </div>
        </div>
      );
    });
  }
  return (
    <div>
      <Headers />
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              <div>
                <p className="mb-0">
                  <span className="text-muted">Sort by:</span>{" "}
                  <a href="#!" className="text-body">
                    price <i className="fas fa-angle-down mt-1"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="h-100">
        <div className="card rounded-3 mb-4">
          <div className="card-body p-4">{renderCart()}</div>
        </div>
        <div className="card">
          <div className="card-body">
            <button type="button" className="btn btn-warning btn-block btn-lg">
              Proceed to Pay
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
