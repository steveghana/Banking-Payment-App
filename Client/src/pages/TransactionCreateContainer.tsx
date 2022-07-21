import React, { useEffect } from "react";
import { useMachine, useActor } from "@xstate/react";
import { User, TransactionPayload } from "../models";
import TransactionCreateStepOne from "../components/TransactionCreateStepOne";
import TransactionCreateStepTwo from "../components/TransactionCreateStepTwo";
import TransactionCreateStepThree from "../components/TransactionCreateStepThree";
import { createTransactionMachine } from "../Machines/createTransactionMachine";
import { usersMachine } from "../Machines/usersMachine";
import { debounce } from "lodash/fp";
import { Interpreter } from "xstate";
import {
  ResolveTypegenMeta,
  TypegenDisabled,
  BaseAction,
  BaseActionObject,
  ServiceMap,
} from "xstate";
//@ts-ignore
import {
  AuthMachineContext,
  AuthMachineEvents,
  AuthMachineSchema,
} from "../Machines/AuthMachine";
import {
  SnackbarSchema,
  SnackbarContext,
  SnackbarEvents,
} from "../Machines/snackbarMachine";
import { Stepper, Step, StepLabel } from "@material-ui/core";

export interface Props {
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

const TransactionCreateContainer: React.FC<Props> = ({
  authService,
  snackbarService,
}) => {
  const [authState] = useActor(authService);
  const [, sendSnackbar] = useActor(snackbarService);

  const [
    createTransactionState,
    sendCreateTransaction,
    createTransactionService,
  ] = useMachine(createTransactionMachine);

  // Expose createTransactionService on window for Cypress
  // @ts-ignore
  // window.createTransactionService = createTransactionService;

  const [usersState, sendUsers] = useMachine(usersMachine);

  useEffect(() => {
    sendUsers({ type: "FETCH" });
  }, [sendUsers]);

  const sender = authState?.context?.user;
  const setReceiver = (receiver: User) => {
    // @ts-ignore
    sendCreateTransaction({ type: "SET_USERS", sender, receiver });
  };
  const createTransaction = (payload: TransactionPayload) => {
    sendCreateTransaction("CREATE", payload);
  };
  const userListSearch = debounce(200, (payload: any) =>
    sendUsers({ type: "FETCH", ...payload })
  );

  const showSnackbar = (payload: SnackbarContext) =>
    sendSnackbar({ type: "SHOW", ...payload });

  let activeStep;
  if (createTransactionState.matches("stepTwo")) {
    activeStep = 1;
  } else if (createTransactionState.matches("stepThree")) {
    activeStep = 3;
  } else {
    activeStep = 0;
  }

  return (
    <>
      <Stepper>
        <Step key={"stepOne"}>
          <StepLabel>Select Contact</StepLabel>
        </Step>
        <Step key={"stepTwo"}>
          <StepLabel>Payment</StepLabel>
        </Step>
        <Step key={"stepThree"}>
          <StepLabel>Complete</StepLabel>
        </Step>
      </Stepper>
      {createTransactionState.matches("stepOne") && (
        <TransactionCreateStepOne
          setReceiver={setReceiver}
          users={usersState.context.results!}
          userListSearch={userListSearch}
        />
      )}
      {sender && createTransactionState.matches("stepTwo") && (
        <TransactionCreateStepTwo
          receiver={createTransactionState.context.receiver}
          sender={sender}
          createTransaction={createTransaction}
          showSnackbar={showSnackbar}
        />
      )}
      {createTransactionState.matches("stepThree") && (
        <TransactionCreateStepThree
          //@ts-ignore
          createTransactionService={createTransactionService}
        />
      )}
    </>
  );
};

export default TransactionCreateContainer;
