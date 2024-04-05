import React from "react";
import { Route, Routes } from "react-router-dom";
import { User } from "../users/User";
import { Register } from "../users/Register";
import Login1 from "../users/Login1";
import OtpRegister from "../users/components/OtpRegister";
import ViewMore from "../users/components/ViewMore";
import Signin from "../users/components/Signin";
import MyProfilePage from "../users/MyProfilePage";
import OtpCenter from "../users/components/OtpCenter";
import TermsAndConditions from "../users/TermsAndConditions";

export const UserRouter = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/*" element={<User />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login1 />}></Route>
          <Route path="/OtpRegister" element={<OtpRegister />}></Route>
          <Route path="/viewmore" element={<ViewMore/>}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/myprofile" element={<MyProfilePage/>}></Route>
          <Route path="/otpCenter" element={<OtpCenter/>}></Route>
          <Route path="/termsAndConditions" element={<TermsAndConditions/>}></Route>
        </Routes>
      </div>
    </div>
  );
};
