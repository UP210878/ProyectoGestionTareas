import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext, ModeContext } from '../Common';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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
  const { isDarkMode, setDarkMode } = useContext(ModeContext);

  const darkModeSwitch = () => {
    isDarkMode ? setDarkMode(false): setDarkMode(true);
  }
  

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TodoApp
          </Typography>
          {menuItems.map((item) => (
            <Button color="inherit" component={Link} to={item.link} key={item.name}>
              {item.name}
            </Button>
          ))}
        <IconButton sx={{ ml: 1 }} onClick={darkModeSwitch} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Nav;
