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
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { io } from "socket.io-client";
import { getLocalStorage } from "../constants/LocalStorageData";

const GroupChatUi = ({ id }) => {
  const socket = useMemo(() => io(process.env.REACT_APP_SOCETURL), []);

  const user = getLocalStorage("user");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for new messages in the current group
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.emit("joinGroup", id);

    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [id]);

  console.log(messages, "messages");

  const handleSend = () => {
    if (newMessage.trim()) {
      socket.emit("send", {
        groupId: id,
        senderId: user.unique_id,
        message: newMessage,
        name: user.user_name,
      });
    }
    setNewMessage("");
  };

  return (
    <Box width={"100%"}>
      <Box
        sx={{
          flexGrow: 1,
          height: {
            sm: "calc(100vh - 150px)",
            lg: 400,
            xs: "calc(100vh - 150px)",
          },
          overflow: "auto",
        }}
      >
        <List>
          {messages?.map((message, index) => {
            if (message.groupId == id) {
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
                      backgroundColor:
                        message.senderId === user.unique_id
                          ? "primary.light"
                          : "grey.200",
                      pl: 1,
                      pr: 1,
                      pt: 0.5,
                      pb: 0.5,
                    }}
                  >
                    <Typography variant="caption" fontWeight={"700"}>
                      {message.name}
                    </Typography>
                    <br />
                    <Typography variant="caption">{message.message}</Typography>
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
        sx={{
          position: "fixed",
          bottom: 20,
          width: { sm: "65%", xs: "92%", lg: "78%" },
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSend()} // Send message on Enter key press
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSend} color="primary">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default GroupChatUi;
