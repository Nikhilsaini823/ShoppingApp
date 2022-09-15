import "./App.css";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./MyComponents/Home";

function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  return (
    <>
    <Router>
      <Routes>
        {/* <Route exact path = "/login" element={<LogIn/>}></Route> */}
        {/* <Route path = "/register" element={<Register/>}></Route> */}
        <Route path = "/" element={<Home />}></Route>
        <Route path = "/about" element={<About />}></Route>
      </Routes>
    </Router> 
    {/* <Router>
      <Headers title="your title here" searchBar={true} />
      <Routes>
            <Route exact path="/" render = {() => {
              return (
              <>
              <Addtodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
              </>)
            }}>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
        </Routes>
      <Footer />
    </Router> */}
    </>
  );
}

export default App;
