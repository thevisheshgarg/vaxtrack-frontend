import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Admin from "../Admin/Admin";
import useAuth from "../users/components/ProtectedRoutes";

const AdminRouter = () => {
  useAuth();
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Admin />}></Route>
        
      </Routes>
    </div>
  );
};

export default AdminRouter;
