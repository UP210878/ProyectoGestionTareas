import React, { Component } from 'react';
import Login, { Register } from '../Login';
import { Routes, Route } from 'react-router-dom';
import Category from '../Category'
import {PrivateRoute, LoginRoutes, Error404} from '../Common';
import Landing from '../Landing';

class Main extends Component {

  render() {


    
    return (
      <Routes>
        <Route path="/login" element={<LoginRoutes element={Login} />} />
        <Route path="/register" element={<LoginRoutes element={Register} />} />
        <Route path="/home" element={<PrivateRoute element={Category} />} />
        <Route path="/" element={<Landing/>} />
        <Route path="*" element={<Error404/>}/>
      </Routes>
      
    );
  }
}

export default Main;