import { createContext, useContext, useState } from "react";


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
