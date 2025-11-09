import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getLead, updateLead, reset } from '../features/leads/leadSlice';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';

function EditLeadPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lead, isLoading, isError, message } = useSelector(
    (state) => state.leads
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
  });

  useEffect(() => {
    dispatch(getLead(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
      });
    }
  }, [lead]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateLead({ leadId: id, leadData: formData }));
    navigate(`/leads/${id}`);
  };

  if (isLoading || !lead) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Lead
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
            value={formData.name}
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
            value={formData.email}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="status"
            label="Status"
            name="status"
            value={formData.status}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Update Lead'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default EditLeadPage;

