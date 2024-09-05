import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Messages from "./pages/Messages";
import SignUpPage from "./pages/SignUpPage";
import { getLocalStorage } from "./constants/LocalStorageData";
import GroupMessages from "./pages/GroupMessages";
import AudioCall from "./pages/AudioCall";
import ProtectedRoute from "./constants/ProtectedRoute";

const Router = () => {
  const user = getLocalStorage("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/message/:ID"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groupchat/:groupId"
          element={
            <ProtectedRoute>
              <GroupMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/audiocall/:Id"
          element={
            <ProtectedRoute>
              <AudioCall />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
