import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Problem from "../components/Problem";
import Loader from "../components/Loader";
import { endpoint } from "../components/Storage";
import { useHistory } from "react-router-dom";

export default function HomeRoute(props) {
  const Component = props.component;
  const history = useHistory();
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const tokenValue = { token };
    fetch(`${endpoint}/api/check`, {
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
          } else if (data.status === "expired") {
            window.localStorage.removeItem("token");
            history.push("/");
          } else if (data.status === "success") {
            if (
              data.role === "HR" ||
              data.role === "VPE" ||
              data.role === "VPO"
            ) {
              setIsAdmin(true);
            }
          }
          setTimeout(() => {
            setLoading(false);
          }, 3000);
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
      ) : isAdmin ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
}
