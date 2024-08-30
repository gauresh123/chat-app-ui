// LoadingButton.js
import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props}>
      {isLoading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button>
  );
};

export default LoadingButton;
