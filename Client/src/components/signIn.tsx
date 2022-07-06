import React from "react";
import { Form, Formik, Field, FieldProps, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import {
  AuthMachineContext,
  AuthMachineEvents,
  AuthMachineSchema,
} from "../Machines/AuthMachine";
import { Alert } from "@material-ui/lab";
import {
  Container,
  makeStyles,
  Typography,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import { object, string, ref } from "yup";
import { SignInPayload } from "../models/user";
import {
  BaseActionObject,
  Interpreter,
  ResolveTypegenMeta,
  ServiceMap,
  State,
  TypegenDisabled,
} from "xstate";
import { useActor } from "@xstate/react";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    color: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertMessage: {
    marginBottom: theme.spacing(2),
  },
}));
type FormValues = {
  userName: string;
  password: string;
};
const validationSchema = object({
  userName: string().required("UserName is required"),
  password: string()
    .min(5, "Password must contain at least 5 characters")
    .required("Please enter a valid password"),
});
interface Props {
  authService: any;
  authstate: State<
    AuthMachineContext,
    AuthMachineEvents,
    AuthMachineSchema,
    any,
    ResolveTypegenMeta<
      TypegenDisabled,
      AuthMachineEvents,
      BaseActionObject,
      ServiceMap
    >
  >;
  // State<AuthMachineContext, AuthMachineEvents, AuthMachineSchema, any, ResolveTypegenMeta<TypegenDisabled, AuthMachineEvents, BaseActionObject, ServiceMap>>;
}
const SignIn: React.FC<Props> = ({ authService, authstate }) => {
  const classes = useStyles();
  console.log(authstate.context.message);
  const [, send] = useActor(authService);
  const initialValues: SignInPayload = {
    userName: "",
    password: "",
    remember: undefined,
  };

  let pendingSignIn = (payload: SignInPayload) =>
    send({ type: "SIGNIN", ...payload });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {authstate.context?.message && (
          <Alert
            data-test="signin-error"
            severity="error"
            className={classes.alertMessage}
          >
            {authstate.context.message}
          </Alert>
        )}
        <div>{/* <RWALogo className={classes.logo} /> */}</div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (
            values: SignInPayload,
            helpers: FormikHelpers<SignInPayload>
          ) => {
            setTimeout(() => helpers.setSubmitting(false), 400);
            pendingSignIn(values);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className={classes.form}>
              <Field name="userName">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    data-test="signin-username"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="password">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    autoFocus
                    id="password"
                    data-test="signin-password"
                    error={touched && value !== initialValue && Boolean(error)}
                    helperText={
                      touched && value !== initialValue && touched ? error : ""
                    }
                    {...field}
                  />
                )}
              </Field>
              <FormControlLabel
                control={
                  <Field name={"remember"}>
                    {({ field }: FieldProps) => {
                      return (
                        <Checkbox
                          color="primary"
                          data-test="signin-remember-me"
                          {...field}
                        />
                      );
                    }}
                  </Field>
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-test="signin-submit"
                disabled={!isValid || isSubmitting}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/*<Link to="/forgotpassword">Forgot password?</Link>*/}
                </Grid>
                <Grid item>
                  <Link data-test="signup" to="/signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>{/* <Footer /> */}</Box>
    </Container>
  );
};

export default SignIn;
