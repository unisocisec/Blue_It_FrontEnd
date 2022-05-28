
import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import routes, { pathRoutes } from "../../providers/Routes.jsx";
import { isAuthenticated } from "../../providers/sessionStorage";
import LayoutPage from "../../pages/layout/index";

const ValidateRoutes = (route) => {
  const authenticated = isAuthenticated();

  if (!route.privated) {
    if (!authenticated) {
      document.title = `I Blue It - ${route.title}`;
      return (route.component());
    }
    document.title = `I Blue It - Painel de Informações`;
    return <Navigate to={pathRoutes.INFORMATION_PANEL} />;
  } else {
    if (authenticated) {
      document.title = `I Blue It - ${route.title}`;
      return (route.component());
    }
    document.title = `I Blue It - Entrar`;
    return <Navigate to={pathRoutes.LOGIN} />;
  }
}

const AssemblyOfRoutes = () => (
  <Routes>
    {routes.map(route => (
      (route.privated) ? (
        <Route
          key={route.path}
          element={<LayoutPage />}>
          <Route
            key={`subMenu${route.path}`}
            path={route.path}
            element={<ValidateRoutes {...route} />}
          />
        </Route>
      ) : (
        <Route
          key={route.path}
          path={route.path}
          element={<ValidateRoutes {...route} />}
        />
      )
    ))}
  </Routes>
)

export default AssemblyOfRoutes;