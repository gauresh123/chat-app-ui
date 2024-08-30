import React from "react";
import Router from "./Route";
import { SocketContextProvider } from "./context/SocketContext";
import "./App.css";

const App = () => {
  return (
    <div>
      <SocketContextProvider>
        <Router />
      </SocketContextProvider>
    </div>
  );
};

export default App;
