import React, { useContext } from 'react';
import './Login.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext, ModeContext } from '../Common';
import { Paper, Container, Typography, Box, Grid, Link, TextField, CssBaseline, Button, Avatar, createTheme, ThemeProvider} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import userApi from '../../api/userApi';

const Login = () => {
  const { handleSubmit, control, setError, clearErrors, formState: { errors } } = useForm();
  const { isDarkMode } = useContext(ModeContext);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const currentTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const onSubmit = async (loginForm) => {
    const { email, password } = loginForm;

    try {
      const data = await userApi.login({email, password});
      const token = data.token;
      sessionStorage.setItem('token', token);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (error) {
      setIsAuthenticated(false);
      setError('general', { type: 'manual', message: "Invalid credentials" });
      sessionStorage.removeItem('token');
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
                    onChange={(event)=> {
                      field.onChange(event);
                      clearErrors('general');
                    }}
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
                    onChange={(event)=> {
                      field.onChange(event);
                      clearErrors('general');
                    }}
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