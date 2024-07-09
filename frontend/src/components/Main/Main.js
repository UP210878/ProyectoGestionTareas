import React, { Component } from 'react';
import Login, { Register } from '../Login';
import { Routes, Route } from 'react-router-dom';
import Category from '../Category'
import PrivateRoute from '../Common';

class Main extends Component {

  render() {


    
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={Category} />} />
      </Routes>
      
    );
  }
}

export default Main;