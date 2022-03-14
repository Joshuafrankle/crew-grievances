import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { axiosRequest } from "../components/DataFetch";
import Problem from "../components/Problem";
import Loader from "../components/Loader";

export default function LoginRoute({ component: Component }) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [user, setUser] = useState("");

  async function handleLogin() {
    try {
      const { data } = await axiosRequest("/login", "POST");
      if (data.success) {
        setUser(data.user);
      }
    } catch (err) {
      if (err.response.status === 500) {
        setErr(true);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    handleLogin();
  }, []);

  if (loading) {
    return <Loader />;
  } else if (err) {
    return <Problem />;
  } else if (user === "user") {
    <Redirect to={{ pathname: "/home" }} />;
  } else if (user === "admin") {
    <Redirect to={{ pathname: "/grievancelist" }} />;
  } else if (user === "superAdmin") {
    <Redirect to={{ pathname: "/user-manage" }} />;
  } else {
    return <Component />;
  }
}
