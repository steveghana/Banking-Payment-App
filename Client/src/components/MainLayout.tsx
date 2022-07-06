import React from "react";
import {
  AuthMachineEvents,
  AuthMachineSchema,
  AuthMachineContext,
} from "../Machines/AuthMachine";
import {
  Interpreter,
  ResolveTypegenMeta,
  TypegenDisabled,
  BaseActionObject,
  ServiceMap,
} from "xstate";

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
  return (
    <div>
      <div>Mainlayout</div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
