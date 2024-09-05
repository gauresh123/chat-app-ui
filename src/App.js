import React from "react";
import Router from "./Route";
import { SocketContextProvider } from "./context/SocketContext";
import "./App.css";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

const App = () => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  return (
    <div>
      <SocketContextProvider>
        <AgoraRTCProvider client={client}>
          <Router />
        </AgoraRTCProvider>
      </SocketContextProvider>
    </div>
  );
};

export default App;
