import { Container } from "@mui/material";
import Base from "../components/Base";
import { io } from "socket.io-client";
import {
  getLocalStorage,
} from "../constants/LocalStorageData";
import { useParams } from "react-router-dom";
import GroupChatUi from "../components/GroupChatUi";

const GroupMessages = () => {
  const socket = io(process.env.REACT_APP_SOCETURL);
  const user = getLocalStorage("user");
  const { groupId } = useParams();

  return (
    <Base>
      <Container sx={{ mt: 10 }}>
        <GroupChatUi id={groupId} />
      </Container>
    </Base>
  );
};

export default GroupMessages;
