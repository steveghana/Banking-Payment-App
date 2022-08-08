import React from "react";
import Home from "../pages/Home";
import MyAccount from "../pages/MyAccount";
import TransactionCreateContainer from "../pages/TransactionCreateContainer";
import MainLayout from "./MainLayout";
//@ts-ignore
import {
  AuthMachineContext,
  AuthMachineEvents,
  AuthMachineSchema,
} from "../Machines/AuthMachine";
import {
  snackbarMachine,
  SnackbarContext,
  SnackbarEvents,
  SnackbarSchema,
} from "../Machines/snackbarMachine";

import { useNavigate } from "react-router-dom";
import {
  Interpreter,
  ResolveTypegenMeta,
  TypegenDisabled,
  BaseActionObject,
  ServiceMap,
} from "xstate";
import PrivateRoute from "./PrivateRoute";
import BankAccounts from "../pages/BankAccounts";
import { useMachine } from "@xstate/react";
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
  snackbarService: Interpreter<
    SnackbarContext,
    SnackbarSchema,
    SnackbarEvents,
    any,
    ResolveTypegenMeta<
      TypegenDisabled,
      SnackbarEvents,
      BaseActionObject,
      ServiceMap
    >
  >;
}
const AuthorizedRoute: React.FC<Props> = ({
  isLoggedIn,
  authService,
  snackbarService,
}) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <MainLayout authService={authService}>
      <PrivateRoute isLoggedIn={isLoggedIn} path="/">
        <Home />
      </PrivateRoute>
      <PrivateRoute isLoggedIn={isLoggedIn} path="/myaccount">
        <MyAccount />
      </PrivateRoute>
      <PrivateRoute isLoggedIn={isLoggedIn} path="/bankaccounts">
        <BankAccounts />
      </PrivateRoute>
      <PrivateRoute isLoggedIn={isLoggedIn} path="/bankaccounts/new">
        <TransactionCreateContainer
          authService={authService}
          snackbarService={snackbarService}
        />
      </PrivateRoute>
    </MainLayout>
  );
};

export default AuthorizedRoute;
