import React from "react";
import { Alert } from "@material-ui/lab";
import { Form, Formik, Field, FieldProps, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  makeStyles,
  Typography,
  CssBaseline,
  TextField,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import { useActor } from "@xstate/react";
import { object, string, ref } from "yup";
import { SignUpPayload } from "../models/user";

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
const validationSchema = object({
  firstName: string().required("Enter your first Name"),
  lastName: string().required("Enter your first lastName"),
  userName: string().required("UserName is required"),
  email: string().required("Enter your Email addres"),
  password: string()
    .min(5, "Password must contain at least 5 characters")
    .required("Please enter a valid password"),
  confirmPassword: string()
    .required("Confirm your password")
    .oneOf([ref("password")], "Passwords dont match"),
});
interface SignupProps {
  authService: any;
  authstate: any;
  isLoggedIn: boolean;
}

const Signup: React.FC<SignupProps> = ({
  authService,
  authstate,
  isLoggedIn,
}) => {
  const classes = useStyles();
  const [, send] = useActor(authService);
  let serverErrorMessage = authstate.context.serverError;
  let customeErrorMessage = authstate.context.message;
  const initialValues: SignUpPayload = {
    firstName: "",
    password: "",
    userName: "",
    email: "",
    lastName: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  let pendingSignUp = (payload: SignUpPayload) =>
    send({ type: "SIGNUP", ...payload });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {(customeErrorMessage.signupError || serverErrorMessage) && (
          <Alert
            data-test="signin-error"
            severity="error"
            className={classes.alertMessage}
          >
            {customeErrorMessage.signupError || serverErrorMessage}
          </Alert>
        )}
        <div>{/* <RWALogo className={classes.logo} /> */}</div>
        <Typography component="h1" variant="h5" data-test="signup-title">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (
            values: SignUpPayload,
            helpers: FormikHelpers<SignUpPayload>
          ) => {
            setTimeout(() => helpers.setSubmitting(false), 400);

            pendingSignUp(values);
          }}
        >
          {({ isValid, isSubmitting }) => (
            <Form className={classes.form}>
              <Field name="firstName">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    type="text"
                    data-test="signup-first-name"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="lastName">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    type="text"
                    data-test="signup-last-name"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="userName">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    data-test="signup-username"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="email">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    data-test="signup-email"
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
                    required
                    fullWidth
                    label="Password"
                    autoFocus
                    type="password"
                    id="password"
                    data-test="signup-password"
                    error={touched && value !== initialValue && Boolean(error)}
                    helperText={touched && value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="confirmPassword">
                {({
                  field,
                  meta: { error, value, initialValue, touched },
                }: FieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    autoFocus
                    fullWidth
                    label="Confirm Password"
                    id="confirmPassword"
                    data-test="signup-confirmPassword"
                    type="password"
                    error={touched && value !== initialValue && Boolean(error)}
                    helperText={touched && value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-test="signup-submit"
                disabled={!isValid || isSubmitting}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin">{"Have an account? Sign In"}</Link>
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

export default Signup;
