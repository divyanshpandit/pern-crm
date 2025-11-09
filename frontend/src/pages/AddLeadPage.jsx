import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createLead, reset } from '../features/leads/leadSlice';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

function AddLeadPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
  });

  const { name, email, phone, status } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.leads
  );

  useEffect(() => {
    if (isError) {
      // You can show a toast notification here if you want
    }

    if (isSuccess) {
      navigate('/leads');
    }
  }, [isError, isSuccess, navigate]);

  useEffect(() => {
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
    dispatch(createLead(formData));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Lead
        </Typography>
        {isError && <Alert severity="error">{message}</Alert>}
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="status"
            label="Status"
            name="status"
            value={status}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Add Lead'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddLeadPage;

