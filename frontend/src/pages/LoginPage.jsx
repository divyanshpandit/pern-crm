import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // 1. IMPORT Link
import { login, reset } from '../features/auth/authSlice';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link, // 2. IMPORT Link from MUI
  Grid, // 3. IMPORT Grid
} from '@mui/material';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to dashboard on successful login
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Reset any errors when the component unmounts
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
          CRM Login
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          {isError && <Alert severity="error">{message}</Alert>}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChange}
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
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          
          {/* 4. UNCOMMENT AND UPDATE THE LINK */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;