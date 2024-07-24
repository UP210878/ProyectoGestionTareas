import React, { useContext } from 'react';
import './Login.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext, ModeContext, LanguageContext } from '../Common';
import { Paper, Container, Typography, Box, Grid, Link, TextField, CssBaseline, Button, Avatar, createTheme, ThemeProvider} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const Login = () => {
  const { handleSubmit, control, setError, clearErrors, formState: { errors } } = useForm();
  const { isDarkMode } = useContext(ModeContext);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { currentLanguage } = useContext(LanguageContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const currentTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const labels = {
    en : {
      signIn: 'Sign In',
      email: 'Email',
      password: 'Password',
      emailError: 'Please input an email',
      passwordError: 'Please input a password',
      emailRegexError: 'Invalid email',
      dontHaveAccount: 'I don\'t have an account',
    },
    es : {
      signIn: 'Iniciar Sesión',
      email: 'Correo electrónico',
      password: 'Contraseña',
      emailError: 'Porfavor ingrese un correo electrónico',
      passwordError: 'Porfavor ingrese una contraseña',
      emailRegexError: 'Correo electrónico invalido',
      dontHaveAccount: 'No tengo cuenta',
    },
  };

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
              {labels[currentLanguage].signIn}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: labels[currentLanguage].emailError,
                  pattern: {
                    value: emailRegex,
                    message: labels[currentLanguage].emailRegexError,
                  },
                }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label={labels[currentLanguage].email}
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
                rules={{ required: labels[currentLanguage].passwordError }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    label={labels[currentLanguage].password}
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
                {labels[currentLanguage].signIn}
                <LoginIcon sx={{ mx: 1 }} />
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {labels[currentLanguage].dontHaveAccount}
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