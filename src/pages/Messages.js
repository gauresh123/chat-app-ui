import { Container, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Base from "../components/Base";
import ChatUi from "../components/ChatUi";
import { io } from "socket.io-client";
import {
  clearLocalStorage,
  getLocalStorage,
} from "../constants/LocalStorageData";
import { useParams } from "react-router-dom";

const Messages = () => {
  const socket = io(process.env.REACT_APP_SOCETURL);
  const user = getLocalStorage("user");
  const { ID } = useParams();

  return (
    <Base>
      <Container sx={{ mt: 7 }}>
        <ChatUi id={ID} />
      </Container>
    </Base>
  );
};

export default Messages;
