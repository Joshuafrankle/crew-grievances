import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Problem from "../components/Problem";
import Loader from "../components/Loader";

export default function HomeRoute(props) {
  const Component = props.component;
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch(`${endpoint}/api/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.status === "success") {
            history.push("/thankyou");
          } else if (data.status === "failure") {
            //console.log(data.reason);
            setError(true);
          }
        })
        .catch(() => {
          setError(true);
        });
    });
    const token = window.localStorage.getItem("token");
    if (token === userToken) {
      setUser("user");
    } else if (token === adminToken) {
      setUser("admin");
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : user === "user" || user === "admin" ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
}
