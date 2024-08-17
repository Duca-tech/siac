import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageLayout from "./pages/pageLayout";
import Forms from "./pages/Forms";
import Settings from "./pages/Settings";
import HelpPage from "./pages/HelpPage";
import Form from "./pages/Form";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="forms" element={<Forms />}>
          <Route path=":formId" element={<Form />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<HelpPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
