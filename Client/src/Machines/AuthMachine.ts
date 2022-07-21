import { assign, interpret, State, Machine } from "xstate";
import { Navigate } from "../util/navigation";
import axios from "axios";
import { User } from "../models/user";
export interface StateProps {
  states: {
    signup: {};
    signin: {};
    unauthorized: {};
    refreshing: {};
    authorized: {};
  };
}
const backendPort = 5000;
const backendRoute = `http://localhost:${backendPort}/user`;
export interface AuthMachineSchema {
  states: {
    unauthorized: {};
    signup: {};
    signin: {};
    // updating: {};
    // logout: {};
    refreshing: {};
    // google: {};
    authorized: {};
  };
}

const getError = (data: any) => {
  let message = null;
  if (data.response.status === 400) {
    message = data.response.data;
  } else {
    message = data;
  }
  return message;
};
export type AuthMachineEvents =
  | { type: "SIGNIN" }
  | { type: "REFRESH" }
  | { type: "SIGNUP" };

export interface AuthMachineContext {
  user?: User;
  message?: string;
  serverError?: string;
}

export const authMachine = Machine<
  AuthMachineContext,
  AuthMachineSchema,
  AuthMachineEvents
>(
  {
    id: "authentication",
    initial: "unauthorized",
    context: {
      // used to determine the user and message from actions
      user: undefined,
      message: undefined,
      serverError: undefined,
    },
    states: {
      unauthorized: {
        //actions a user can perform when unauthorised
        entry: "resetuser", //actions
        on: {
          SIGNIN: "signin",
          SIGNUP: "signup",
        },
      },
      authorized: {
        //actions user can perform when authorised
        entry: "returnHomeAfterLigin", //actions
        on: {
          //actions
          // UPDATE: "updating",
          REFRESH: "refreshing",
          // LOGOUT: "logout",
        },
      },
      // when authorised
      refreshing: {
        invoke: {
          src: "getUserProfile",
          onDone: { target: "authorized", actions: "setUserProfile" },
          //if it fails dont authorise
          onError: { target: "unauthorized", actions: "onError" },
        },
      },
      //unauthorised

      signup: {
        invoke: {
          src: "performSignup",

          onDone: { target: "unauthorized", actions: "onSuccess" },
          onError: { target: "unauthorized", actions: "onError" },
        },
      },
      signin: {
        invoke: {
          src: "performSignin",
          onDone: { target: "authorized", actions: "onSuccess" },
          onError: { target: "unauthorized", actions: "onError" },
        },
      },
      //unauthorised
    },
  },
  {
    services: {
      //src
      performSignup: async (ctx, event) => {
        let payload = event;
        const resp = await axios.post(`${backendRoute}/signup`, payload);

        if (resp.data) {
          Navigate.push("/signin");
          window.location.reload();
        }
      },
      performSignin: async (ctx, event) => {
        let payload = event;
        const resp = await axios.post(`${backendRoute}/signin`, payload);

        try {
          if (resp.data) {
            Navigate.push("/");
            window.location.reload();
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
      getUserProfile: async (ctx, event) => {
        const resp = await axios.get(`${backendRoute}/checkAuth`);
        return resp.data;
      },
    },
    actions: {
      returnHomeAfterLigin: async (ctx, event) => {
        if (window.location.pathname === "/signpup") {
          window.location.pathname = "/";
          window.location.reload();
        }
      },
      setUserProfile: assign((ctx: any, event: any) => ({
        user: event?.data?.user,
      })),
      onSuccess: assign((ctx: any, event: any) => ({
        user: event?.data?.user,
        message: event.data?.message || undefined,
      })),
      onError: assign((ctx: any, event: any) => ({
        serverError: getError(event?.data),
      })),
    },
  }
);
// @ts-ignore
const stateDefinition = JSON.parse(localStorage.getItem("auth"));
let resolvedState;
if (stateDefinition) {
  let previousState = State.create(stateDefinition);
  //@ts-ignore
  resolvedState = authMachine.resolveState(previousState);
}
export const authService = interpret(authMachine)
  .onTransition((state) => {
    if (state.changed) {
      localStorage.setItem("auth", JSON.stringify(state));
    }
  })
  .start(resolvedState);
