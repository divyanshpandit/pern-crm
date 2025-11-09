import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Grid,
  Link,
} from '@mui/material';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '', // For confirmation
  });

  const { name, email, password, password2 } = formData;
  const [notify, setNotify] = useState({ type: '', text: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // This effect runs when the registration API call finishes
    if (isError) {
      setNotify({ type: 'error', text: message });
    }

    if (isSuccess && message) {
      // Registration was successful, show a success message
      setNotify({ type: 'success', text: message });
      
      // After 2 seconds, redirect to the login page
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      
      // Return a cleanup function just for the timer
      return () => clearTimeout(timer);
    }
    
    // 
    // dispatch(reset()); // <-- REMOVED FROM HERE
    // 

  }, [isError, isSuccess, message, navigate, dispatch]);


  // --- ADD THIS NEW useEffect HOOK ---
  // This hook will run only once, and its cleanup function
  // will be called when the component unmounts (navigates away).
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]); // The dependency array ensures this sets up only once

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setNotify({ type: '', text: '' }); // Clear previous notifications

    if (password !== password2) {
      setNotify({ type: 'error', text: 'Passwords do not match' });
    } else if (!name || !email || !password) {
      setNotify({ type: 'error', text: 'Please fill in all fields' });
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
          
          {/* This will now show the success message for 2 seconds */}
          {notify.text && <Alert severity={notify.type}>{notify.text}</Alert>}

          <Grid container spacing={2}>
            {/* ... all your Grid item TextFields ... */}
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={onChange}
                error={!/^[a-zA-Z\s]*$/.test(name) && name !== ''}
                helperText={!/^[a-zA-Z\s]*$/.test(name) && name !== '' ? 'Name can only contain letters and spaces' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={onChange}
                error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== ''}
                helperText={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== '' ? 'Invalid email format' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                value={password2}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;