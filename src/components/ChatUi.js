import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  List,
  ListItem,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import {
  clearLocalStorage,
  getLocalStorage,
} from "../constants/LocalStorageData";

const ChatUi = ({ id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const user = getLocalStorage("user");

  const socket = useMemo(
    () => io(process.env.REACT_APP_SOCETURL, { query: { id: user.unique_id } }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {
      //setSocketId(socket.id);
      console.log(socket.id);
    });
    socket.on("receiveMessage", (messageData) => {
      console.log(messageData, "message");
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [user?.unique_id, id]);
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        senderId: user.unique_id,
        receiverId: id,
        message: newMessage,
        socketId: socketId,
      });
      // setMessages([
      //   ...messages,
      //   {
      //     text: newMessage,
      //     sender: "You",
      //     senderId: 1,
      //     timestamp: new Date(),
      //     receiverId: 2,
      //   },
      // ]);

      setNewMessage("");
    }
  };
  return (
    <Box width={"100%"}>
      <Box sx={{ flexGrow: 1, overflow: "auto", padding: 2, height: 400 }}>
        <List>
          {messages?.map((message, index) => {
            if (
              (message.senderId === user.unique_id ||
                message.receiverId === user.unique_id) &&
              (message.senderId === id || message.receiverId === id)
            ) {
              return (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent:
                      message.senderId === user.unique_id
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <Paper
                    sx={{
                      padding: 1,
                      backgroundColor:
                        message.senderId === user.unique_id
                          ? "primary.light"
                          : "grey.300",
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                  </Paper>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </Box>

      <TextField
        variant="outlined"
        placeholder="Type your message..."
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        size="small"
        sx={{ position: "fixed", bottom: 20, width: "78%" }}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Send message on Enter key press
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSendMessage} color="primary">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ChatUi;
