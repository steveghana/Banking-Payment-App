import React from "react";
import { Route, Navigate, RouteProps, Routes } from "react-router-dom";

interface IPrivateRouteProps extends RouteProps {
  isLoggedIn: boolean;
}

function PrivateRoute({ isLoggedIn, children, ...rest }: IPrivateRouteProps) {
  return (
    <Routes>
      <Route
        {...rest}
        //   state= { from: location },
        element={
          isLoggedIn ? (
            children
          ) : (
            /* istanbul ignore next */
            <Navigate
              to={{
                pathname: "/signin",
              }}
            />
          )
        }
      />
    </Routes>
  );
}

export default PrivateRoute;
