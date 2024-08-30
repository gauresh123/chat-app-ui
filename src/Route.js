import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Messages from "./pages/Messages";
import SignUpPage from "./pages/SignUpPage";
import { getLocalStorage } from "./constants/LocalStorageData";
import GroupMessages from "./pages/GroupMessages";
import AudioCall from "./pages/AudioCall";

const Router = () => {
  const user = getLocalStorage("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/message/:ID" element={<Messages />} />
        <Route path="/groupchat/:groupId" element={<GroupMessages />} />
        <Route path="/audiocall" element={<AudioCall />} />

        {!user ? (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </>
        ) : (
          <Route path="/home" element={<HomePage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
