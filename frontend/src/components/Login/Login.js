import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '../Common';
import { Paper, Container, Typography, Box, Grid, Link, TextField, CssBaseline, Button, Avatar} from '@mui/material'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputCorrect, setInputCorrect] = useState(true);
  const [isMailWrong, setMailWrong] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password }),
      });

      if (response.ok) {
            const token = await response.json();
            sessionStorage.setItem('token',token)
            setIsAuthenticated(true);
        navigate('/home');
      } else {
        setInputCorrect(false);
      }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={5}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            paddingBlockEnd: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMailWrong(e.target.value !== '' && !emailRegex.test(e.target.value));
                setInputCorrect(true);
              }}
              error={isMailWrong || !inputCorrect}
              helperText={(isMailWrong && "Please input a valid email.")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setInputCorrect(true);
              }}
              error={!inputCorrect}
              helperText={(!inputCorrect && "Username/Password are incorrect.")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
              <LoginIcon sx={{mx:1}}/>
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Paper>
      </Container>
  );
};

export default Login;