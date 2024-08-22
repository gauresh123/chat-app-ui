import { Box } from "@mui/material";
import React from "react";
import Navigation from "./Navigation";
import ChatAppBar from "./AppBar";

const Base = ({ children }) => {
  return (
    <>
      <ChatAppBar />
      <Box sx={{ display: "flex" }}>
        <Navigation />
        {children}
      </Box>
    </>
  );
};

export default Base;
