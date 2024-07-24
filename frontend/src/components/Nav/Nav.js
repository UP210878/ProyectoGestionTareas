import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext, LanguageContext, ModeContext } from '../Common';
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
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  const darkModeSwitch = () => {
    isDarkMode ? setDarkMode(false): setDarkMode(true);
  }

  const languageSwitch = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'es' : 'en')
  }
  

  const menuItems = !isAuthenticated ? [
    {
      link: '/',
      name: currentLanguage === 'en' ? 'Home':'Inicio',
    },
    {
      link: '/login',
      name: currentLanguage === 'en' ? 'Login':'Iniciar Sesión',
    },
    {
      link: '/register',
      name: currentLanguage === 'en' ? 'Register':'Registrarse',
    }
  ] : [
    {
      link: '/home',
      name: currentLanguage === 'en' ? 'Home':'Inicio',
    },
    {
      link: '/logout',
      name: currentLanguage === 'en' ? 'Logout':'Cerrar Sesión',
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
        <IconButton sx={{ ml: 1 }} onClick={darkModeSwitch} color="inherit">
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Button sx={{ ml: 1 }} onClick={languageSwitch} color="inherit">
            {currentLanguage === 'en' ? 'ES' : 'EN'}
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Nav;
