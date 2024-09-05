import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton, Stack } from "@mui/material";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";

export const AudioCall = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected(); // Store the user's connection status
  const [appId, setAppId] = useState("f98cc1c2ba0047b69cb29a690a9942f5");
  const [channel, setChannel] = useState("test_channel");
  const [token, setToken] = useState(
    "007eJxTYHjn8W/vgjVWLVp/N/3KqlDx2uPFLlPtfExPtaV26uHZj78pMKRZWiQnGyYbJSUaGJiYJ5lZJicZWSaaWRokWlqaGKWZVpXfTGsIZGQ48fU0EyMDBIL4PAwlqcUl8ckZiXl5qTkMDAAJxCVY"
  );

  useJoin(
    {
      appid: appId,
      channel: channel,
      token: token ? token : null,
    },
    calling
  );

  const [micOn, setMic] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const navigate = useNavigate();
  usePublish([localMicrophoneTrack]);

  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    setCalling(true);
  }, []);

  const handleCall = () => {
    setCalling((a) => !a);
    navigate(-1);
  };

  return (
    <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                micOn={micOn}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <samp className="user-name">You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div className="join-room" style={{ display: "none" }}>
            {/* <img alt="agora-logo" className="logo" src={agoraLogo} /> */}
            <input
              onChange={(e) => setAppId(e.target.value)}
              placeholder="<Your app ID>"
              value={appId}
            />
            <input
              onChange={(e) => setChannel(e.target.value)}
              placeholder="<Your channel Name>"
              value={channel}
            />
            <input
              onChange={(e) => setToken(e.target.value)}
              placeholder="<Your token>"
              value={token}
            />

            <button
              // className={`join-channel ${!appId || !channel ? "disabled" : ""}`}
              // disabled={!appId || !channel}
              onClick={() => setCalling(true)}
            >
              <span>Join Channel</span>
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="control">
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{ paddingBottom: "15px" }}
              width={{ sm: "50%", xs: "100%" }}
            >
              <Grid item xs={12} sm={6} md={6}>
                <Box
                  component="form"
                  noValidate
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "0.5px solid grey",
                    borderRadius: "5px",
                    p: "15px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_DEFAULT_IMG}`}
                    alt="Searching"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      padding: "15px",
                    }}
                  />
                  <Typography
                    component="h1"
                    variant="h6"
                    sx={{
                      paddingBottom: "2%",
                      width: "max-content",
                      fontSize: "0.8rem",
                      color: "grey",
                      fontWeight: 600,
                    }}
                  >
                    user 1
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box
                  component="form"
                  noValidate
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "0.5px solid grey",
                    borderRadius: "5px",
                    p: "15px",
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_DEFAULT_IMG}`}
                    alt="Searching"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      padding: "15px",
                    }}
                  />
                  <Typography
                    component="h1"
                    variant="h6"
                    sx={{
                      paddingBottom: "2%",
                      width: "max-content",
                      fontSize: "0.8rem",
                      color: "grey",
                    }}
                  >
                    user 2
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Stack
              component="form"
              noValidate
              width={{ sm: "50%", xs: "100%" }}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
              mt={1}
              border={1}
              borderColor={"silver"}
            >
              <IconButton
                className={`btn btn-phone ${calling ? "btn-phone-active" : ""}`}
                onClick={handleCall}
              >
                {calling ? (
                  <CallIcon color="error" />
                ) : (
                  <MicOffIcon color="black" />
                )}
              </IconButton>
              <IconButton onClick={() => setMic((a) => !a)}>
                {micOn ? <MicIcon /> : <MicOffIcon color="black" />}
              </IconButton>
            </Stack>
          </Container>

          {/* <div className="left-control">
            <button className="btn" onClick={() => setMic((a) => !a)}>
              <i className={`i-microphone ${!micOn ? "off" : ""}`} />
            </button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default AudioCall;
