import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import GrievanceList from "./GrievanceList";
import Problem from "../../components/Problem";
import { endpoint } from "../../components/Storage";

export default function DisplayGrievances() {
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
          if (data.status === "success") {
            setTheData(data);
            setLoading(false);
          } else if (data.status === "failure") {
            //console.log("DB query problem ", data.reason);
            setError(true);
            setLoading(false);
          }
        })
        .catch(() => {
          //console.log("DB Down");
          setError(true);
          setLoading(false);
        });
    });
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
