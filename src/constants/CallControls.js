import React from "react";
import { Button, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const CallControls = ({ isMicMuted, onMicToggle }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={isMicMuted ? <MicOffIcon /> : <MicIcon />}
        onClick={onMicToggle}
      >
        {isMicMuted ? "Unmute" : "Mute"}
      </Button>
    </Box>
  );
};

export default CallControls;
