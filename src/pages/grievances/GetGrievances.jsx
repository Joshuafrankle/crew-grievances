import { useEffect, useState } from "react";
import Problem from "components/Problem";
import Loader from "components/Loader";
import { axiosRequest } from "components/DataFetch";
import GrievanceList from "./DisplayGrievances";

export default function GetGrievances() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [grievanceList, setGrievanceList] = useState({});

  async function getGrievances() {
    try {
      const { data } = await axiosRequest("/admin");
      setGrievanceList(data);
    } catch ({ response }) {
      setError(true);
    }
    setLoading(false);
  }

  useEffect(() => getGrievances(), []);

  if (loading) return <Loader />;
  else if (error) return <Problem />;
  else return <GrievanceList grievances={grievanceList} />;
}
