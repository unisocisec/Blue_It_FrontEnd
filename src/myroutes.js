import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { isAuthenticated } from "./providers/sessionStorage";
import routes from "./providers/Routes.jsx";
import LoginPage from "./pages/login";
import LayoutPage from "./pages/layout";

const MyRoutes = () => {
    const authenticated = isAuthenticated();
    const navigate = useNavigate()

    const nav = () => {
        navigate('/')
    }

    return (
        <Routes>
            <Route
              key='Login'
              path='/'
              //element={<ValidateRoutes {...route} />}
              element={<LoginPage />}
            />

            {routes.map(route => {
              if (route.privated) {
                if (authenticated) {
                  return (
                    <Route element={<LayoutPage />}>
                      <Route
                        key={route.path}
                        path={route.path}
                        //element={ValidateRoutes(route)}
                        element={route.component}
                      />
                    </Route>
                  )
                } else {
                  nav()
                }
              }
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  //element={ValidateRoutes(route)}
                  element={route.component}
                />
              )
            })}

          </Routes>
    )
}

export default MyRoutes