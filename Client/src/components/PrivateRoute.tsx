import { Route, Navigate, RouteProps, Routes } from "react-router-dom";

interface IPrivateRouteProps extends RouteProps {
  isLoggedIn: boolean;
}

function PrivateRoute({ isLoggedIn, children, ...rest }: IPrivateRouteProps) {
  return (
    <Routes>
      <Route
        {...rest}
        element={
          isLoggedIn ? (
            children
          ) : (
            /* istanbul ignore next */
            <Navigate
              to={{
                pathname: "/signup",
              }}
            />
          )
        }
      />
    </Routes>
  );
}

export default PrivateRoute;
