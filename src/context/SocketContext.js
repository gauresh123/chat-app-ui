import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { getLocalStorage } from "../constants/LocalStorageData";

const SocketContext = createContext();
const SocketContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <SocketContext.Provider value={{ messages, setMessages }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContextProvider };

const useSocketContext = () => useContext(SocketContext);

export default useSocketContext;
