import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * This component checks if a user is authenticated.
 * If yes, it renders the 'children' components (e.g., the Dashboard).
 * If no, it redirects them to the /login page.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    // Optional: Show a loading spinner
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so we can send them back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;