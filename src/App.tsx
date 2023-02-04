import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DataListWindow from "./components/DataListWindow";
import AddDataWindow from "./components/AddDataWindow";
import HomePage from "./components/HomePage";
import FooterComponent from "./components/FooterComponent";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark ">
          <div style={{ marginRight: "10px", color: "white" }}>
            Fish Store Management{" "}
          </div>
          |
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/storeDataList"} className="nav-link">
                Fish Store Data List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Data
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/storeDataList" element={<DataListWindow />} />
            <Route path="/add" element={<AddDataWindow />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
