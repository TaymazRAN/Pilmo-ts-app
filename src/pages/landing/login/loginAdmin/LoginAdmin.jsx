import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import "./../../../../component/formRegister/formRegister.css";
import { Button, FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch } from "react-redux";
import FormHelperText from "@mui/material/FormHelperText";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addNewPost_Login } from "./../../../panelAdmin/loginForm/admin/adminSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    // .matches(
    // 	/ /,
    // 	""
    // )
    .required("User Name  ? "),
  password: yup.string().required("Password  ? "),
});

export default function LoginAdmin() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const formRef = useRef();
  const dispatch = useDispatch();

  const [messge, setmessge] = useState("");
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("");
  const handleOpenSuccess = (text) => {
    setSuccessText(text);
    setSuccess(true);
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleOpenError = (text) => {
    setErrorText(text);
    setError(true);
  };

  const handleCloseError = () => {
    setError(false);
  };

  const submit = (values) => {
    // alert(JSON.stringify(values, null, 2));
    try {
      dispatch(addNewPost_Login(values)).unwrap();
      const user = JSON.parse(localStorage.getItem("username"));

      user ? navigate("/admin") : setmessge("Incorect  ///// ");
    } catch (err) {
      console.error("Failed to save the post", err);
      handleOpenError("Failed to save the post" + err);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <div>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successText}
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          sx={{ direction: "right" }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorText}
          </Alert>
        </Snackbar>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
        innerRef={formRef}
      >
        {({ handleChange, values, setFieldValue, errors, touched }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
              padding: "20px",
            }}
          >
            <Form className="widthFix signup boxshodow1">
              <div className="loginForm">
                <div className="loginTitle bold">
                  Form Login Dashboard Page Admin{" "}
                </div>

                <div className="formInputContainer signup">
                  <TextField
                    className="formInput signup"
                    variant="outlined"
                    label="User Name "
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <FormControl className="formInput signup" variant="outlined">
                    <InputLabel
                      error={touched.password && Boolean(errors.password)}
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={(event) => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff className="passwordIcon" />
                            ) : (
                              <Visibility className="passwordIcon" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label=" password  "
                    />
                    <FormHelperText
                      error={touched.password && Boolean(errors.password)}
                    >
                      {touched.password && errors.password}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className="loginButtonContainer">
                  <Button
                    onClick={(event) => handleSubmit()}
                    variant="outlined"
                  >
                    Login...
                  </Button>

                  <p style={{ color: "red" }}> {messge}</p>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
