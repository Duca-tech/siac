import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PageLayout from "./pages/PageLayout";
import Settings from "./pages/Settings";
import Painel from "./pages/Painel";
import Documents from "./pages/Documents";
import Bin from "./pages/Help";
import Appointments from "./pages/appointments/Appointments";
import AppointmentSchedule from "./pages/appointments/AppointmentSchedule";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PageLayout />} >
        <Route index element={<Home />} />
        <Route path="painel" element={<Painel />} />
        <Route path="documents" element={<Documents />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="appointments/schedule" element={<AppointmentSchedule />} />
        <Route path="bin" element={<Bin />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
