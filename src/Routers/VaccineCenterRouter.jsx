import React from "react";
import { Route, Routes } from "react-router-dom";
import VaccineCentersDashboard from "../VaccineCenter/VaccineCenterDashboard";
import useAuth from "../users/components/ProtectedRoute";



const VaccineCenterRouter = () => {
  useAuth();
  return (
    <div>
      <Routes>
        <Route path="/*" element={<VaccineCentersDashboard />}></Route>
      </Routes>
    </div>
  );
};

export default VaccineCenterRouter;
