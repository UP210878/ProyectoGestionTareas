import React, { useContext } from 'react';
import './Login.css';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { Grid, Container, Typography, Box, TextField, CssBaseline, Button, Avatar, Link, Paper, createTheme, ThemeProvider } from '@mui/material';
import { useForm, Controller} from 'react-hook-form';
import { ModeContext, LanguageContext } from '../Common';

const Register = () => {
  const { handleSubmit, control, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ModeContext);
  const { currentLanguage } = useContext(LanguageContext);


  const currentTheme = createTheme({
    palette: {
      mode: isDarkMode? 'dark':'light',
    },
  });

  const labels = {
    en: {
      signUp: 'Sign Up',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      alreadyHaveAnAccount: 'I already have an account',
      usernameError: 'Please input a username',
      emailError: 'Please input an email',
      emailRegexError: 'Invalid email',
      passwordError: 'Please input a password',
      confirmPasswordError: 'Please confirm your password',
      passwordMismatch: 'Password do not match',
      emailInUse: 'Email already in use, please choose another one',
      usernameInUse: 'Username already in use, please choose another one',
    },
    es: {
      signUp: 'Registrarse',
      username: 'Nombre de Usuario',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      alreadyHaveAnAccount: 'Ya tengo una cuenta',
      usernameError: 'Porfavor ingrese un usuario',
      emailError: 'Porfavor ingrese su correo electrónico',
      emailRegexError: 'Correo electrónico invalido',
      passwordError: 'Porfavor ingrese una contraseña',
      confirmPasswordError: 'Porfavor confirme su contraseña',
      passwordMismatch: 'Las contraseñas no concuerdan',
      emailInUse: 'Correo ya en uso, porfavor utilize otro',
      usernameInUse: 'Usuario ya en uso, porfavor utilize otro',
    },
  };

  const onSubmit = async (data) => {
    const { email, password, confirmPassword, username } = data;

    if (password !== confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: labels[currentLanguage].passwordMismatch });
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
          setError('email', { type: 'manual', message: labels[currentLanguage].emailInUse });
        } else if (bodyError === 'Username Already Exists') {
          setError('username', { type: 'manual', message: labels[currentLanguage].usernameInUse });
        } else {
          console.error('Registration failed')
        }
      }
    } catch (error) {
      console.error('Error fetching from the api');
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
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {labels[currentLanguage].signUp}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{ required: labels[currentLanguage].usernameError }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label={labels[currentLanguage].username}
                placeholder={labels[currentLanguage].username}
                autoFocus
                {...field}
                error={!!errors.username || !!errors.general}
                helperText={errors.username ? errors.username.message : ''}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: labels[currentLanguage].emailError,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: labels[currentLanguage].emailRegexError,
              },
            }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                placeholder='Example@gmail.com'
                fullWidth
                label={labels[currentLanguage].email}
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
            rules={{ required: labels[currentLanguage].passwordError }}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                placeholder={labels[currentLanguage].password}
                fullWidth
                type="password"
                label={labels[currentLanguage].password}
                {...field}
                error={!!errors.password || !!errors.general}
                helperText={errors.password ? errors.password.message : ''}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{ required: labels[currentLanguage].confirmPasswordError}}
            render={({ field }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                placeholder={labels[currentLanguage].password}
                label={labels[currentLanguage].confirmPassword}
                {...field}
                error={!!errors.confirmPassword || !!errors.general}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
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
            sx={{ mt: 3, mb: 2 , bgcolor: 'primary.main'}}
          >
            {labels[currentLanguage].signUp}
          </Button>
          <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  {labels[currentLanguage].alreadyHaveAnAccount}
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box></Paper>
    </Container>
    </ThemeProvider>
  );
}

export default Register;
