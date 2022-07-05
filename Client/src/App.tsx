import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useActor, useMachine } from "@xstate/react";
import { authService, authMachine } from "./Machines/AuthMachine";
import SignIn from "./components/signIn";
import SvgRwaLogo from "./components/SvgLogo";
import { Container, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import Signup from "./components/SignUp";
function App() {
  const [authstate] = useActor(authService);
  let isLoggedIn = authstate.matches("authorized");
  console.log(isLoggedIn);

  return (
    <div className="App">
      <CssBaseline />
      <Router>
        {isLoggedIn ? (
          <Routes>
            <Route element={<Home />} path="/" />
          </Routes>
        ) : (
          <Routes>
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
                    // margin: "auto",
                  }}
                >
                  <SvgRwaLogo />
                </div>
                <Route path="/">
                  <Route index element={<SignIn authService={authService} />} />
                  <Route
                    path="signup"
                    element={<Signup authService={authService} />}
                  />
                  <Route
                    path="signin"
                    element={<SignIn authService={authService} />}
                  />
                </Route>
                <Route
                  path="*"
                  element={<SignIn authService={authService} />}
                />
              </Grid>
            </Grid>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
