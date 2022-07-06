import React from "react";
import Home from "../pages/Home";
import MainLayout from "./MainLayout";
import {
  AuthMachineEvents,
  AuthMachineSchema,
  AuthMachineContext,
} from "../Machines/AuthMachine";
import { Route, Routes } from "react-router-dom";
import {
  Interpreter,
  ResolveTypegenMeta,
  TypegenDisabled,
  BaseActionObject,
  ServiceMap,
} from "xstate";
import PrivateRoute from "./PrivateRoute";
import { Navigator } from "react-router-dom";
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
  return (
    // <Home />
    <MainLayout authService={authService}>
      <Routes>
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Home />
        </PrivateRoute>
        <Route path="/*" element={<Home />} />
      </Routes>
    </MainLayout>
  );
};

export default AuthorizedRoute;
