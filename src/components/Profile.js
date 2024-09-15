import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  setRef,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  getLocalStorage,
  setLocalStorage,
} from "../constants/LocalStorageData";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { getImageBase64, IMGBBuploadImage } from "../constants/Imgbb";
import ProfilePicture from "./ProfilePicture";

const Profile = ({ userProfile, openProfile, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const user = getLocalStorage("user");
  const fileInputRef = useRef();
  useEffect(() => {
    setEmail(userProfile?.emailid);
    setName(userProfile?.user_name || userProfile?.username);
  }, [openProfile]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASEURL}/user/updateuser/${userProfile?.unique_id}`,
        { new_emailid: email, new_name: name, new_prpicture: image }
      );
      if (!res.message) {
        user.user_name = name;
        user.emailid = email;
        user.profilepicture = image || userProfile.profilepicture;
        setLocalStorage("user", user);
      }
    } catch {
    } finally {
      alert("profile updated");
      setName("");
      setEmail("");
      onClose();
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setLoadingImage(true);
      const { imgurl, error: imageError } = await IMGBBuploadImage(
        await getImageBase64(file)
      );
      if (imageError) {
        //toast.error("Error", "There was an error while uploading image");
        return;
      }
      setImage(imgurl);
      setLoadingImage(false);
    }
  };

  const handleEditProfilePicture = () => {
    fileInputRef.current.click();
  };

  const showProfilePicture = () => {
    setShowPicture(true);
  };

  return (
    <>
      <Dialog open={openProfile} onClose={onClose}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Stack direction={"column"} gap={3} width={{ sm: 300, lg: 400 }}>
            <Stack sx={{ alignSelf: "center" }} gap={2} direction={"row"}>
              {loadingImage ? (
                <CircularProgress />
              ) : (
                <Avatar
                  alt="Profile Picture"
                  src={image || userProfile?.profilepicture}
                  sx={{
                    width: 70,
                    height: 70,
                    alignSelf: "center",
                    cursor: "pointer",
                  }}
                  onClick={showProfilePicture}
                />
              )}
              {user?.unique_id == userProfile?.unique_id && (
                <EditIcon
                  color="gray"
                  sx={{ alignSelf: "center", cursor: "pointer" }}
                  onClick={handleEditProfilePicture}
                />
              )}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </Stack>

            <Box>
              <FormHelperText sx={{ fontWeight: "600" }}>Name</FormHelperText>
              <TextField
                size="small"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  readOnly: user?.unique_id !== userProfile?.unique_id && true,
                }}
              />
            </Box>
            <Box>
              <FormHelperText sx={{ fontWeight: "600" }}>
                Email Id
              </FormHelperText>
              <TextField
                size="small"
                fullWidth
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  readOnly: user?.unique_id !== userProfile?.unique_id && true,
                }}
              />
            </Box>
            {user?.unique_id == userProfile?.unique_id && (
              <Button
                size="small"
                variant="contained"
                sx={{ textTransform: "none" }}
                onClick={handleUpdate}
              >
                Save
              </Button>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
      <ProfilePicture
        open={showPicture}
        onClose={() => setShowPicture(false)}
        picture={userProfile?.profilepicture}
      />
    </>
  );
};

export default Profile;
