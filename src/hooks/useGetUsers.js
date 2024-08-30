import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useGetUsers = (id) => {
  const [users, setUsers] = useState(null);

  const getUserData = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASEURL}/user/getusers/${id}`
    );
    setUsers(res.data.data);
  }, [id]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return { users };
};

export default useGetUsers;
