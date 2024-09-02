import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "../constants/LoadingButton";
import { setEvaluated } from "ajv/dist/compile/util";
import axios from "axios";
import { getLocalStorage } from "../constants/LocalStorageData";

const Group = ({
  users,
  openCreateGroup,
  onClose,
  selectedMembers,
  setSelectedMembers,
}) => {
  const [groupName, setGroupName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [addbtnLoading, setAddbtnLoading] = useState(false);
  const user = getLocalStorage("user");

  const handleAddMember = (val) => {
    if (selectedMembers?.some((ele) => ele.unique_id == val.unique_id)) {
      alert(`Member ${val.username} is already selected`);
      return;
    }
    setSelectedMembers((prev) => [...prev, val]);
  };
  const handleAddGroup = async () => {
    const selectedids = selectedMembers?.map((val) => val?.unique_id);
    try {
      setAddbtnLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BASEURL}/user/group/addgroup`,
        {
          group_name: groupName,
          members: [...selectedids, user.unique_id],
          admin_id: user.unique_id,
        }
      );
    } catch {
      //
    } finally {
      setAddbtnLoading(false);
      alert("success!");
      setGroupName("");
      onClose();
    }
  };

  return (
    <Dialog open={openCreateGroup} onClose={onClose}>
      <DialogTitle>Add Group</DialogTitle>
      <Stack
        direction={"column"}
        gap={2}
        width={{ sm: 300, xs: 300, lg: 400 }}
        p={2}
      >
        <TextField
          placeholder="Group name"
          fullWidth
          size="small"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          select
          size="small"
          label="Select member"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          {users?.map((val) => {
            return (
              <MenuItem key={val?.userid} value={val?.username}>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  p={0.5}
                  width="100%"
                >
                  <span>{val?.username}</span>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      handleAddMember(val);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </MenuItem>
            );
          })}
        </TextField>

        {selectedMembers?.length > 0 && (
          <Stack
            direction={"column"}
            gap={1}
            border={1}
            p={2}
            borderColor={"silver"}
          >
            <Typography fontWeight={"700"}>Selected Members</Typography>
            {selectedMembers?.map((val) => {
              return (
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Typography>{val?.username}</Typography>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>
        )}
        <LoadingButton
          sx={{ alignSelf: "flex-end", textTransform: "none" }}
          variant="contained"
          size="small"
          onClick={handleAddGroup}
          isLoading={addbtnLoading}
        >
          Create
        </LoadingButton>
      </Stack>
    </Dialog>
  );
};

export default Group;
