import React, { useEffect, useMemo } from "react";
import { Container, Typography } from "@mui/material";
import Base from "../components/Base";
import { io } from "socket.io-client";
import useSocketContext from "../context/SocketContext";
import { getLocalStorage } from "../constants/LocalStorageData";

const HomePage = () => {
  const { setMessages, messages } = useSocketContext();
  const user = getLocalStorage("user");

  const socket = useMemo(
    () =>
      io(process.env.REACT_APP_SOCETURL, { query: { id: user?.unique_id } }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {});
    socket.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  return (
    <Base>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Please select any user and start conversation</Typography>
      </Container>
    </Base>
  );
};

export default HomePage;
