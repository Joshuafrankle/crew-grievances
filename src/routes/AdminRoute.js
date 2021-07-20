import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import { adminToken } from "../components/Storage";

export default function HomeRoute(props) {
  const Component = props.component;
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === adminToken) {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : isAdmin ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )}
    </>
  );
}
