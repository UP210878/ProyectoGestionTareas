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
      <navbar>
        <li>
          {menuItems.map(item => (
            <ul key={item.name}
              onClick={() => this.renderMenuItems(item.id)}>
              {item.name}
            </ul>
          ))}
        </li>
      </navbar>
    );
  }
}

export default Nav;