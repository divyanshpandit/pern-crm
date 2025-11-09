import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLeads, reset } from '../features/leads/leadSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function LeadsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leads, isLoading, isError, message } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(getLeads());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleAddLeadClick = () => {
    dispatch(reset());
    navigate('/leads/new');
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Leads
        </Typography>
        {isError && <Alert severity="error">{message}</Alert>}
        <Button variant="contained" color="primary" onClick={handleAddLeadClick}>
          Add Lead
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.owner?.name}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/leads/${lead.id}`} size="small">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default LeadsPage;
