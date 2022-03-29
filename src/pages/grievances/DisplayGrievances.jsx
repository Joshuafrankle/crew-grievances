import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import GrievanceList from "./GrievanceList";
import Problem from "../../components/Problem";
import { axiosRequest } from "../../components/DataFetch"; 

export default function DisplayGrievances() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theData, setTheData] = useState({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Problem />
      ) : (
        <GrievanceList theData={theData} />
      )}
    </>
  );
}
