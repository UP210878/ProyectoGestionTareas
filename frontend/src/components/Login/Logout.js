import React, { useEffect, useContext } from 'react';
import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Common';

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const logToken = sessionStorage.getItem('token');
    if (logToken !== null) {
      sessionStorage.removeItem('token');
    }
    
    setIsAuthenticated(false);
    
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, setIsAuthenticated]);

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          You've been logged out.
        </Typography>
        <Typography variant="h3" component="h2" gutterBottom>
          Redirecting...
        </Typography>
        <CircularProgress color="primary" />
      </Box>
    </Container>
  );
}

export default Logout;
