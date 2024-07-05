import React from 'react';
import './Nav.css';


const menuItems = [
  {
    link: '/',
    name: 'Inicio',
  },
  {
    link: '/login',
    name: 'Login',
  },
  {
    link: '/register',
    name: 'Register',
  }
];

class Nav extends React.Component {
  
  renderMenuItems = (selectedItem) => {
    this.setState({
      actualPage: selectedItem
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">TodoApp</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {menuItems.map(item => (
                <li className="nav-item">
                  <a className="nav-link" href={item.link}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;