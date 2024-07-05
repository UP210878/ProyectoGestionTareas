import React from 'react';
import './Nav.css';


class Nav extends React.Component {

  renderMenuItems = (selectedItem) => {
    this.setState({
      actualPage: selectedItem
    });
  }

  render() {
    return (
      <nav className="navbar">
      <div className="navbar-brand">TodoApp</div>
      <ul className="navbar-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/login">LogIn</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </nav>
    );
  }
}

export default Nav;