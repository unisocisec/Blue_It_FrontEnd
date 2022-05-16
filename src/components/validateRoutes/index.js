
import React from 'react';
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../providers/sessionStorage";

const ValidateRoutes = (route) => {
  let navigate = useNavigate();
  const authenticated = isAuthenticated();

  if (!route.privated) {
    return route.component
  } else {
    if (authenticated) {
      return (route.component)
    }
    navigate('/',  {replace: true})
  }
}

export default ValidateRoutes;