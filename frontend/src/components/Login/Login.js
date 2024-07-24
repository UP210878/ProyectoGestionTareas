import React, { useContext } from 'react';
import './Login.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext, ModeContext } from '../Common';
import { Paper, Container, Typography, Box, Grid, Link, TextField, CssBaseline, Button, Avatar, createTheme, ThemeProvider} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const Login = () => {
  const { handleSubmit, control, setError, formState: { errors } } = useForm();
  const { isDarkMode } = useContext(ModeContext);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const currentTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.json();
        sessionStorage.setItem('token', token);
        setIsAuthenticated(true);
        navigate('/home');
      } else {
        setError('general', { type: 'manual', message: 'Username/Password are incorrect.' });
      }
    } catch (error) {
      console.error('Error fetching from the API');
      setError('general', { type: 'manual', message: 'Unable to connect to database' });
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Email cannot be empty, try again.',
                  pattern: {
                    value: emailRegex,
                    message: 'Please input a valid email.',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    autoFocus
                    {...field}
                    error={!!errors.email || !!errors.general}
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
                    fullWidth
                    type="password"
                    label="Password"
                    {...field}
                    error={!!errors.password || !!errors.general}
                    helperText={errors.password ? errors.password.message : ''}
                  />
                )}
              />
              {errors.general && (
                <Typography color="error" variant="body2" align="center">
                  {errors.general.message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
                <LoginIcon sx={{ mx: 1 }} />
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
    </ThemeProvider>
  );
};

export default Login;