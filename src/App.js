import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRouter from "./Routers/AdminRouter";
import { UserRouter } from "./Routers/UserRouter";
import RegistrationForm from "./users/components/RegistrationForm";
import VaccineCenterRouter from "./Routers/VaccineCenterRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRouter />}></Route>
          <Route
            path="/vaccinecenter/*"
            element={<VaccineCenterRouter />}
          ></Route>
          <Route path="/*" element={<UserRouter />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
