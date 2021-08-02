import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import GrievanceList from "./GrievanceList";
import Problem from "../../components/Problem";
import { endpoint } from "../../components/Storage";
import { useHistory } from "react-router-dom";

export default function DisplayGrievances() {
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theData, setTheData] = useState({});

  useEffect(() => {
    const tokenValue = { token };
    fetch(`${endpoint}/api/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokenValue),
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.status === "failure") {
            setError(true);
          } else if (data.status === "false") {
            history.push("/");
          } else if (data.status === "success") {
            setTheData(data.data);
          }
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    });
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
