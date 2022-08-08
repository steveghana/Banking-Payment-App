import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AuthorizedRoute from "./components/AuthorizedRoute";
import { useActor, useMachine } from "@xstate/react";
import { snackbarMachine } from "./Machines/snackbarMachine";
//@ts-ignore
import { authService, authMachine } from "./Machines/AuthMachine";
import { bankAccountsMachine } from "./Machines/bankAccountsMachine";
import SignIn from "./components/signIn";
import SvgRwaLogo from "./components/SvgLogo";
import { Container, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import Signup from "./components/SignUp";
function App() {
  const [authstate] = useActor(authService);
  const [, , snackbarService] = useMachine(snackbarMachine);

  const navigate = useNavigate();
  let isLoggedIn = authstate.matches("authorized");
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn]);
  console.log(isLoggedIn);

  return (
    <div className="App">
      <CssBaseline />
      {authstate.matches("authorized") && isLoggedIn ? (
        <AuthorizedRoute
          isLoggedIn={isLoggedIn}
          authService={authService}
          snackbarService={snackbarService}
        />
      ) : (
        <Grid
          container
          style={{ height: "100vh", width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SvgRwaLogo />
            </div>
            <Routes>
              <Route
                path="/signin"
                element={
                  <SignIn
                    authstate={authstate}
                    authService={authService}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <Signup
                    authService={authService}
                    authstate={authstate}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
            </Routes>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default App;
