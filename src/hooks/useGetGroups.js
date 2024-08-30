import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useGetGroups = (id) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const getGroups = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BASEURL}/user/group/getgroup/${id}`
      );
      setGroups(res.data.data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return { groups, loading, setLoading };
};

export default useGetGroups;
