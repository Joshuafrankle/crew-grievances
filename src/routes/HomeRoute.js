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
          if (data.user === "user") {
            setUser("user");
          } else if (data.user === "admin") {
            setUser("admin");
          } else if (data.user === "false") {
            setUser("false");
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
      ) : user === "user" || user === "admin" ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
}
