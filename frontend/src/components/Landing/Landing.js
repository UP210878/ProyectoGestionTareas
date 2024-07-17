import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';


const Landing = () => {

  return (
        <Container maxWidth="md" component="main">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            To Do App
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            This is a simple landing page created using Material UI. It's designed to give visitors a brief introduction to your application.
          </Typography>
            <Box display="flex" justifyContent="center">
            <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          style={{ marginTop: '20px' }}
        >
          Get Started
        </Button>
            </Box>
        </Container>
  );
}

export default Landing;