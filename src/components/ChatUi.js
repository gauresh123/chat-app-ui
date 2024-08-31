import React, { useEffect, useMemo, useRef, useState } from "react";
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
import useSocketContext from "../context/SocketContext";
import { urlify } from "../constants/Urlify";

const ChatUi = ({ id }) => {
  const [newMessage, setNewMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const user = getLocalStorage("user");
  const { setMessages, messages } = useSocketContext();

  const chatEndRef = useRef(null);

  const socket = useMemo(
    () => io(process.env.REACT_APP_SOCETURL, { query: { id: user.unique_id } }),
    []
  );

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    });
    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [user?.unique_id, id]);
  const handleSendMessage = () => {
    try {
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
        //     senderId: user.unique_id,
        //     timestamp: new Date(),
        //     receiverId: id,
        //   },
        // ]);
      }
    } catch {
      //
    } finally {
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box width={"100%"}>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          padding: 2,
          height: {
            sm: "calc(100vh - 190px)",
            lg: "calc(100vh - 140px)",
            xs: "calc(100vh - 190px)",
          },
        }}
        className="hide-scrollbar"
      >
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
                      p: 1,
                      backgroundColor:
                        message.senderId === user.unique_id
                          ? "primary.light"
                          : "grey.300",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        wordBreak: "break-word", // Ensure long words break to the next line
                        overflowWrap: "break-word", // Ensures wrapping within the box
                      }}
                    >
                      {urlify(message.text)}
                    </Typography>
                  </Paper>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
        <div ref={chatEndRef} />
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
