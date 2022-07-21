import React from "react";
import Home from "../pages/Home";
import MainLayout from "./MainLayout";
import {
  AuthMachineEvents,
  AuthMachineSchema,
  AuthMachineContext,
} from "../Machines/AuthMachine";
import { useNavigate } from "react-router-dom";
import {
  Interpreter,
  ResolveTypegenMeta,
  TypegenDisabled,
  BaseActionObject,
  ServiceMap,
} from "xstate";
import PrivateRoute from "./PrivateRoute";
interface Props {
  isLoggedIn: boolean;
  authService: Interpreter<
    AuthMachineContext,
    AuthMachineSchema,
    AuthMachineEvents,
    any,
    ResolveTypegenMeta<
      TypegenDisabled,
      AuthMachineEvents,
      BaseActionObject,
      ServiceMap
    >
  >;
}
const AuthorizedRoute: React.FC<Props> = ({ isLoggedIn, authService }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    // <Home />
    <MainLayout authService={authService}>
      <PrivateRoute isLoggedIn={isLoggedIn} path="/">
        <Home />
      </PrivateRoute>
    </MainLayout>
  );
};

export default AuthorizedRoute;
