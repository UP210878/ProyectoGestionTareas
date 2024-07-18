import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { Grid, Container, Typography, Box, TextField, CssBaseline, Button, Avatar, Link } from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isMailWrong, setMailWrong] = useState(false);
  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isEmailEmpty, setEmailEmpty] = useState(false);
  const [isPasswordEmpty, setPasswordEmpty] = useState(false);
  const [isConfirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [isUsernameEmpty, setUsernameEmpty] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();



    setEmailEmpty(email === '');
    setPasswordEmpty(password === '');
    setConfirmPasswordEmpty(confirmPassword === '');
    setUsernameEmpty(username === '');

    if (email === '' || password === '' || username === '' || confirmPassword === '') {
      return;
    }

    if (!passwordsMatch || isMailWrong) {
      return;
    }

    const user = { username: username, password, email: email };

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User registered successfully');
        navigate("/login");
      } else {
        const bodyError = await response.text();
        if (bodyError === 'Email Already Exists') {
          setEmailAlreadyExists(true);
        } else if (bodyError === 'Username Already Exists') {
          setUsernameAlreadyExists(true);
        } else {
          console.error('Registration failed')
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          boxShadow: 5,
          marginTop: 8,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameEmpty(false);
              setUsernameAlreadyExists(false);
            }}
            error={isUsernameEmpty || usernameAlreadyExists}
            helperText={(usernameAlreadyExists && "Username already in use, please choose another one") || (isUsernameEmpty && "Username cannot be empty, try again.")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMailWrong(e.target.value !== '' && !emailRegex.test(e.target.value));
              setEmailEmpty(false);
              setEmailAlreadyExists(false);
            }}
            error={emailAlreadyExists || isMailWrong || isEmailEmpty}
            helperText={(emailAlreadyExists && "Email already in use, please choose another one") || (isMailWrong && "Please input a valid email") || (isEmailEmpty && "Email cannot be empty, try again.")}
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
              setPasswordsMatch(e.target.value === '' || confirmPassword === e.target.value || confirmPassword === '');
              setPasswordEmpty(false);
            }}
            error={!passwordsMatch || isPasswordEmpty}
            helperText={(isPasswordEmpty && "Please input a password") || (!passwordsMatch && "Passwords do not match")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordsMatch(e.target.value === '' || password === e.target.value);
              setConfirmPasswordEmpty(false);
            }}
            error={!passwordsMatch || isConfirmPasswordEmpty}
            helperText={(isConfirmPasswordEmpty && "Please confirm your password") || (!passwordsMatch && "Passwords do not match")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 , bgcolor: 'primary.main'}}
          >
            Sign Up
          </Button>
          <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {"Already have an account"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
