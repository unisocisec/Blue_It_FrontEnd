
import React from 'react';
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../providers/sessionStorage";

const ValidateRoutes = (route) => {
  const authenticated = isAuthenticated();

  if (!route.privated) {
    if (!authenticated) {
      return (route.component())
    }
    return <Navigate to="/layout"/>;
  } else {
    if (authenticated) {
      return (route.component())
    }
    return <Navigate to="/"/>;
  }
}

export default ValidateRoutes;