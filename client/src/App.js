import "./App.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

//reducer
import ContactState from './context/contact/ContactState'
import AuthState from './context/auth/AuthState'


const App = () => {
  return (
    <AuthState>
    <ContactState>
    <Router>
      <React.Fragment className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </React.Fragment>
    </Router>
    </ContactState>
    </AuthState>
  );
};

export default App;
