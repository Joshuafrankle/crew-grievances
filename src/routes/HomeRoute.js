import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import { userToken, adminToken } from "../components/Storage";

export default function HomeRoute(props) {
  const Component = props.component;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
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
