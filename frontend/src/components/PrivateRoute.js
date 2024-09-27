import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { authState } = useAuth(); // Get authState from context

  return (
    <Route
      {...rest}
      element={
        authState.loggedIn ? (
          Component
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
