import React, { Component } from 'react';
import Login, { Register, Logout } from '../Login';
import MyActivity from '../Activity/MyActivity';
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
        <Route path="/logout" element={<PrivateRoute element={Logout} />} />
        <Route path='/myactivities' element={<PrivateRoute element={MyActivity} />} />
        <Route path="/" element={<Landing/>} />
        <Route path="*" element={<Error404/>}/>
      </Routes>
      
    );
  }
}

export default Main;