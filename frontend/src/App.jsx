import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from './socket';
import { leadSlice } from './features/leads/leadSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage'; // 1. IMPORT THE NEW PAGE
import LeadsPage from './pages/LeadsPage';
import AddLeadPage from './pages/AddLeadPage';
import LeadDetailsPage from './pages/LeadDetailsPage';
import EditLeadPage from './pages/EditLeadPage';

// Import Components
import ProtectedRoute from './components/ProtectedRoute';

// A simple theme for the app
const theme = createTheme({
  palette: {
    mode: 'dark', // Dark mode as a base
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      socket.connect();

      socket.on('lead_created', (lead) => {
        toast.success(`New lead created: ${lead.name}`);
        dispatch(leadSlice.actions.addLead(lead));
      });

      socket.on('lead_updated', (lead) => {
        toast.info(`Lead updated: ${lead.name}`);
        dispatch(leadSlice.actions.updateLeadState(lead));
      });

      socket.on('lead_deleted', (leadId) => {
        toast.error(`Lead deleted: ${leadId}`);
        dispatch(leadSlice.actions.deleteLeadState(leadId));
      });

      socket.on('scheduled_activity', (activity) => {
        toast.warn(`Reminder: ${activity.content}`);
      });

      return () => {
        socket.disconnect();
        socket.off('lead_created');
        socket.off('lead_updated');
        socket.off('lead_deleted');
        socket.off('scheduled_activity');
      };
    }
  }, [isAuthenticated, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This resets CSS and applies the dark mode background */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* 2. ADD THE REGISTER ROUTE */}

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads"
            element={
              <ProtectedRoute>
                <LeadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/new"
            element={
              <ProtectedRoute>
                <AddLeadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/:id"
            element={
              <ProtectedRoute>
                <LeadDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leads/edit/:id"
            element={
              <ProtectedRoute>
                <EditLeadPage />
              </ProtectedRoute>
            }
          />
          
          {/* Add more protected routes here, e.g., /leads */}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;