import "./formLogin.css";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function FormLogin() {
  return (
    <div>
      <FormGroup
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "40px",
          padding: "100px",
        }}
      >
        <div className="widthFix boxshodow1">
          <div className="signButtonContainer">
            <NavLink to="/login/register" className="signButton">
              <Button
                className="bold"
                variant="contained"
                sx={{
                  fontSize: "16px",
                  // backgroundColor: "#49DEE9",
                  color: "#ffffff",
                  borderRadius: "20px",
                  height: "40px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  boxShadow: "0 2px 5px #dddddd",
                }}
              >
                Create New User
              </Button>
            </NavLink>
          </div>
          <form className="loginForm" dir="rtl">
            <div className="loginButtonContainer" style={{ marginTop: "0" }}>
              <Button color="success" variant="outlined">
                <NavLink to="/login/LoginAdmin" className="loginButton">
                  Admin Login
                </NavLink>
              </Button>

              <Button color="error" variant="outlined">
                <NavLink to="/login/LoginUser" className="loginButton">
                  User Login
                </NavLink>
              </Button>
            </div>
          </form>
        </div>
      </FormGroup>
    </div>
  );
}
