import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Problem from "../components/Problem";
import Loader from "../components/Loader";

export default function HomeRoute(props) {
  const Component = props.component;
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(`${endpoint}/api/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.user === "admin") {
            setIsAdmin(true);
          }
          setLoading(false);
        })
        .catch(() => {
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
      ) : isAdmin ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
}
