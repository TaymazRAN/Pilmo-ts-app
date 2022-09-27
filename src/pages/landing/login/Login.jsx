import React from "react";
import FormLogin from "../../../component/formLogin/FormLogin";
import { Routes, Route } from "react-router-dom";
import "./login.css";
import FormRegister from "../../../component/formRegister/FormRegister";
import LoginAdmin from "./loginAdmin/LoginAdmin";
import LoginUser from "./loginUser/LoginUser";
import MenuTop from "../../../component/menuTop/MenuTop";

export default function Login() {
  return (
    <div>
      <MenuTop />
      <Routes>
        <Route exact path="/" element={<FormLogin />} />
        <Route exact path="/register" element={<FormRegister />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/LoginUser" element={<LoginUser />} />
      </Routes>
      {/* <Faq /> */}
      {/* <Footer /> */}
    </div>
  );
}
