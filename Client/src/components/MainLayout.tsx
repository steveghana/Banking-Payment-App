import React from "react";
import {
  AuthMachineEvents,
  AuthMachineSchema,
  AuthMachineContext,
} from "../Machines/AuthMachine";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import {
  Interpreter,
  ResolveTypegenMeta,
  TypegenDisabled,
  BaseActionObject,
  ServiceMap,
} from "xstate";
import { makeStyles } from "@material-ui/core";
const mainStyles = makeStyles((theme) => ({
  layout_container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    minWidth: "18%",
    background: "white",
    height: "100%",
  },
  main: {
    width: "100%",
    height: "100%",
  },
}));

interface Props {
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
  children: React.ReactNode;
}
const MainLayout: React.FC<Props> = ({ authService, children }) => {
  const classes = mainStyles();
  return (
    <div className={classes.layout_container}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.main}>
        <div className="nav">
          <Navigation />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
