import axios from "axios";
import { useEffect, useState } from "react";

const useGetUsers = (id) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/user/getusers/${id}`
      );
      setUsers(res.data.data);
    };

    getUserData();
  }, [id]);

  return { users };
};

export default useGetUsers;
