import './App.css';
import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';

const  App = () => {
  return (
    <Router>
      <React.Fragment className="App">
        <Navbar/>
       <div className="container">
       <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/about" element={<About/>} />
       </Routes>
       </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
