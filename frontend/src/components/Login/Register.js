import React from 'react';
import './Login.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { Grid, Container, Typography, Box, TextField, CssBaseline, Button, Avatar, Link, Paper } from '@mui/material';
import { useForm, Controller} from 'react-hook-form';

const Register = () => {
  const { handleSubmit, control, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password, confirmPassword, username } = data;

    if (password !== confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    const user = { username, password, email };

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
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
          setError('email', { type: 'manual', message: 'Email already in use, please choose another one' });
        } else if (bodyError === 'Username Already Exists') {
          setError('username', { type: 'manual', message: 'Username already in use, please choose another one' });
        } else {
          console.error('Registration failed')
        }
      }
    } catch (error) {
      console.error('Error fetching from the api:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={5}>
      <Box
        sx={{
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: 'Username cannot be empty, try again.' }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                placeholder='Username'
                autoFocus
                {...field}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email cannot be empty, try again.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please input a valid email',
              },
            }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                placeholder='Example@gmail.com'
                fullWidth
                label="Email"
                {...field}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Please input a password' }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                placeholder='Password'
                fullWidth
                type="password"
                label="Password"
                {...field}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{ required: 'Please confirm your password' }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                placeholder='Password'
                label="Confirm Password"
                {...field}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
              />
            )}
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
                  {"I already have an account"}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box></Paper>
    </Container>
  );
}

export default Register;
