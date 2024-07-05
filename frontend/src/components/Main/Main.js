import React, { Component } from 'react';
import Login, { Register } from '../Login';
import { Routes, Route } from 'react-router-dom';

class Main extends Component {

  render() {


    
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
      
    );
  }
}

export default Main;