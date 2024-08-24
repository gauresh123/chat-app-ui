import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Messages from "./pages/Messages";
import SignUpPage from "./pages/SignUpPage";
import { getLocalStorage } from "./constants/LocalStorageData";

const Router = () => {
  const user = getLocalStorage("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {user ? (
          <>
            <Route path="/home" element={<HomePage />} />
            <Route path="/message/:ID" element={<Messages />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
