import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Common';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#212121', // Dark gray
    },
    secondary: {
      main: '#85C1D9', // Azul
    },
  },
});

const Nav = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const menuItems = !isAuthenticated ? [
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
  ] : [
    {
      link: '/home',
      name: 'Inicio',
    },
    {
      link: '/logout',
      name: 'Logout',
    }
  ];

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

export default Nav;
