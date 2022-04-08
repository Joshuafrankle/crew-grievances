import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Problem from "components/Problem";
import Loader from "components/Loader";
import { axiosRequest } from "components/DataFetch";
import GrievanceList from "./DisplayGrievances";

export default function GetGrievances() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [grievanceList, setGrievanceList] = useState({});

  async function getGrievances() {
    try {
      const { data } = await axiosRequest("/admin");
      setGrievanceList(data.grievanceList);
    } catch ({ response }) {
      if (response.status === 5000) {
        setError(true);
      } else {
        history.push("/");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getGrievances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;
  else if (error) return <Problem />;
  else return <GrievanceList grievances={grievanceList} />;
}
