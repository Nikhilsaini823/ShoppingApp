import React, { useEffect, useState } from "react";
import { Footer } from "./Footer";
import Headers from "./Headers";
import axios from "axios";
import "./Product.css";

function Product() {
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState("");
  const images = [
    "ipad.jpg",
    "laptop.jpg",
    "images123.jpeg",
    "images11.jpg",
    "images.jpg",
  ];

  const addToCard = (product) => {
    const payload = {
      product: product.id,
      price: product.price,
      quantity: 1,
    };
    const header = { headers: { Authorization: "Token " + token } };
    axios
      .post("http://localhost:8000/cart/add_product/", payload, header)
      .then(function (response) {
        console.log(response);
        window.alert("Product added to Cart sucessfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    async function getToken() {
      setToken(localStorage.getItem("token"));
    }
    getToken();
  }, [token]);

  useEffect(() => {
    console.log(token);
    if (token) {
      getProduct();
    }
  }, [token]);

  const getProduct = () => {
    axios
      .get("http://localhost:8000/product/", {
        headers: { Authorization: "Token " + token },
      })
      .then(function (response) {
        setProduct(response.data.results);
      });
  };

  function randomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  function renderProducts() {
    return product.map((p) => {
      return (
        <section key={p.id}>
          <div className="container py-5">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6 col-xl-4 size">
                <div className="card cardCss">
                  <div
                    className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={`image/${randomImage()}`}
                      className="img-fluid imgCss"
                      alt="Laptop"
                    />
                    <a href="#!">
                      <div className="mask"></div>
                    </a>
                  </div>
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between">
                      <div>
                        <p>
                          <a href="#!" className="text-dark">
                            {p.title}
                          </a>
                        </p>
                        <p className="small text-muted">Laptops</p>
                      </div>
                      <div>
                        <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <p className="small text-muted">Rated 4.0/5</p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body pb-0">
                    <div className="d-flex justify-content-between">
                      <p>
                        <a href="#!" className="text-dark">
                          ${p.price}
                        </a>
                      </p>
                      {/* <p className="text-dark">#### 8787</p> */}
                    </div>
                    {/* <p className="small text-muted">VISA Platinum</p> */}
                  </div>
                  <hr className="my-0" />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                      <a href="#!" className="text-dark fw-bold">
                        Cancel
                      </a>
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCard(p)}
                      >
                        {" "}
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    });
  }

  return (
    <div>
      <Headers />
      <div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {renderProducts()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
