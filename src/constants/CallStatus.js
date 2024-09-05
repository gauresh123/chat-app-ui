import React from "react";
import { Typography, Box } from "@mui/material";

const CallStatus = ({ isJoined }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" color={isJoined ? "green" : "red"}>
        {isJoined ? "Connected" : "Connecting..."}
      </Typography>
    </Box>
  );
};

export default CallStatus;
