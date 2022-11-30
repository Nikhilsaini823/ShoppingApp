import "./App.css";
import { About } from "./MyComponents/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./MyComponents/Home";
import { Login } from "./MyComponents/Login";
import { Register } from "./MyComponents/Register";
import Product from "./MyComponents/Product";
import Cart from "./MyComponents/Cart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
