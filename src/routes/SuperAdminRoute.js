import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { axiosRequest } from "components/DataFetch";
import Problem from "components/Problem";
import Loader from "components/Loader";

export default function LoginRoute({ component: Component }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState("");

  async function handleLogin() {
    try {
      const { data } = await axiosRequest("/auth");
      setUser(data.user);
    } catch (err) {
      if (err.response.status === 500) {
        setError(true);
      }
    }
    setLoading(false);
  }

  useEffect(() => handleLogin(), []);

  if (loading) {
    return <Loader />;
  } else if (error) {
    return <Problem />;
  } else if (!user) {
    return <Redirect to={{ pathname: "/" }} />;
  } else if (user === "superAdmin") {
    return <Component />;
  } else {
    return <Redirect to={{ pathname: "/" }} />;
  }
}
