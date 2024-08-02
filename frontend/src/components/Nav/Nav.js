import React, { useContext, useState } from 'react';
import { AppBar,Toolbar,Typography,IconButton,Button,ThemeProvider,createTheme,Drawer,List,ListItem,ListItemText,Box,useMediaQuery,useTheme, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext, ModeContext } from '../Common';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness7';
import Brightness7Icon from '@mui/icons-material/Brightness4';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const darkModeSwitch = () => {
    setDarkMode(!isDarkMode);
  }

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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
      name: 'Home',
    },
    {
      link: '/myactivities',
      name: 'My Activities'
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
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{marginRight:3}}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              TodoApp
            </Link>
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex' }}>
              {menuItems.map((item) => (
                <Button color="inherit" component={Link} to={item.link} key={item.name}>
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
          <IconButton sx={{ ml: 1 }} onClick={darkModeSwitch} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {isMobile && (
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} sx={{ '& .MuiDrawer-paper': { width: '50%' } }}>
              <List>
                {menuItems.map((item) => (
                  <ListItemButton component={Link} to={item.link} key={item.name} onClick={toggleDrawer(false)}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Drawer>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Nav;
