import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#212121', // Dark gray
    },
    secondary: {
      main: '#f50057', // Pink
    },
  },
});

class Nav extends React.Component {
  renderMenuItems = (selectedItem) => {
    this.setState({
      actualPage: selectedItem
    });
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoApp
          </Typography>
          {menuItems.map((item) => (
            <Button color="inherit" component={Link} to={item.link} key={item.name}>
              {item.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
          </ThemeProvider>
    );
  }
}

export default Nav;
