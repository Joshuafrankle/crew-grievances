import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Problem from "../components/Problem";
import Loader from "../components/Loader";
import { endpoint } from "../components/Storage";

export default function HomeRoute(props) {
  const Component = props.component;
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");

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
            setUser("false");
          } else if (data.status === "expired") {
            window.localStorage.removeItem("token");
            setUser("false");
          } else if (data.status === "success") {
            setUser(`${data.role}`);
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
      ) : user === "crew" ? (
        <Redirect to={{ pathname: "/home" }} />
      ) : user === "admin" ? (
        <Redirect to={{ pathname: "/grievancelist" }} />
      ) : (
        <Component />
      )}
    </>
  );
}
