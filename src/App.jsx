import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
