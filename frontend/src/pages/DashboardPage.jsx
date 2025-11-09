import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { getDashboardData } from '../features/dashboard/dashboardSlice';
import { Button, Container, Typography, Box, CircularProgress, Alert, Grid, Paper } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1 }}>
        <Typography variant="body2">{`${label} : ${payload[0].value}`}</Typography>
      </Paper>
    );
  }

  return null;
};

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, message } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to login after logout
  };

  if (isLoading || !data) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="h6">
          Welcome, {user ? user.name : 'User'}!
        </Typography>
        <Typography>
          Your role is: {user ? user.role : 'N/A'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/leads"
            sx={{ mr: 1 }}
          >
            Manage Leads
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>

        {isError && <Alert severity="error">{message}</Alert>}

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Leads by Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="80%"
                  barSize={10}
                  data={data.leadsByStatus}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="count"
                    nameKey="status"
                  >
                    {data.leadsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </RadialBar>
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                  <Tooltip content={<CustomTooltip />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Leads by Owner
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.leadsByOwner}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="owner.name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="count" fill="url(#colorUv)" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default DashboardPage;