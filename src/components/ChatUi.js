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
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import { getImageBase64, IMGBBuploadImage } from "../constants/Imgbb";

const ChatUi = ({ id }) => {
  const [newMessage, setNewMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const user = getLocalStorage("user");
  const { setMessages, messages } = useSocketContext();
  const [oldMsgs, setOldMsgs] = useState([]);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    (async () => {
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/message/getMessage`,
        {
          senderId: user.unique_id,
          receiverId: id,
        }
      );
      const data = res?.data?.data[0]?.text ? res?.data?.data[0]?.text : [];
      setOldMsgs(data);
    })();
  }, []);

  const msgData = [...oldMsgs, ...messages];

  const handleSendMessage = async () => {
    try {
      if (newMessage.trim()) {
        socket.emit("sendMessage", {
          senderid: user.unique_id,
          receiverid: id,
          message: newMessage,
        });

        const data = {
          senderid: user.unique_id,
          receiverid: id,
          text: newMessage,
        };
        await axios
          .post(`${process.env.REACT_APP_BASEURL}/message/addMessage`, {
            senderId: user.unique_id,
            receiverId: id,
            message:
              messages.length == 0
                ? [...oldMsgs, data]
                : [...oldMsgs, ...messages],
          })
          .then((res) => console.log("send"))
          .catch((err) => console.log(err));
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

  const handleImageSend = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      let imageUrl = "";
      if (file) {
        const { imgurl, error: imageError } = await IMGBBuploadImage(
          await getImageBase64(file)
        );
        if (imageError) {
          //toast.error("Error", "There was an error while uploading image");
          return;
        }
        imageUrl = imgurl;
      }

      socket.emit("sendMessage", {
        senderid: user.unique_id,
        receiverid: id,
        message: newMessage || "",
        img: imageUrl,
      });

      const data = {
        senderid: user.unique_id,
        receiverid: id,
        text: newMessage || "",
        img: imageUrl,
      };

      await axios
        .post(`${process.env.REACT_APP_BASEURL}/message/addMessage`, {
          senderId: user.unique_id,
          receiverId: id,
          message:
            messages.length == 0
              ? [...oldMsgs, data]
              : [...oldMsgs, ...messages],
        })
        .then((res) => console.log("send"))
        .catch((err) => console.log(err));
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getData = async () => {
      const options = {
        method: "POST",
        url: "http://api.sd-rtn.com/dev/v1/kicking-rule",
        headers: {
          Authorization:
            "Bearer 007eJxTYPg8r1jgzF/TQwuUpNO/TDp0eLHSlMQFEy53HqrUEv1/OeagAkOapUVysmGyUVKigYGJeZKZZXKSkWWimaVBoqWliVGa6ez119IaAhkZdN5vY2FkgEAQn4ehJLW4JD45IzEvLzWHgQEATCIl4A==",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          appid: "f98cc1c2ba0047b69cb29a690a9942f5",
          cname: "test_channel",
          uid: 589517928,
          ip: "",
          time: 60,
          privileges: ["join_channel"],
        },
      };

      try {
        const { data } = await axios.request(options);
        console.log(data, "data");
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <Box width={"100%"}>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          // padding: 2,
          height: {
            sm: "calc(100vh - 190px)",
            lg: "calc(100vh - 140px)",
            xs: "calc(100vh - 190px)",
          },
        }}
        className="hide-scrollbar"
      >
        <List>
          {msgData?.map((message, index) => {
            if (
              (message.senderid === user.unique_id ||
                message.receiverid === user.unique_id) &&
              (message.senderid === id || message.receiverid === id)
            ) {
              return (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent:
                      message.senderid === user.unique_id
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <Paper
                    sx={{
                      p: 1,
                      backgroundColor:
                        message.senderid === user.unique_id
                          ? "primary.light"
                          : "grey.300",
                    }}
                  >
                    {message?.text && (
                      <Typography
                        variant="body1"
                        sx={{
                          wordBreak: "break-word", // Ensure long words break to the next line
                          overflowWrap: "break-word", // Ensures wrapping within the box
                        }}
                      >
                        {urlify(message.text)}
                      </Typography>
                    )}

                    {message.img && (
                      <Box
                        component="img"
                        src={message.img}
                        alt="sent image"
                        sx={{
                          maxWidth: "100%",
                          borderRadius: 1,
                        }}
                      />
                    )}
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
              <IconButton onClick={handleImageSend} color="primary">
                <ImageIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ChatUi;
