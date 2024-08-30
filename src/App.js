import React from "react";
import Router from "./Route";
import { SocketContextProvider } from "./context/SocketContext";

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
