import { Dialog, DialogContent } from "@mui/material";
import React from "react";

const ProfilePicture = ({ open, onClose, picture }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ width: 300 }}>
        <img src={picture} width={"100%"} height={400} />
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePicture;
