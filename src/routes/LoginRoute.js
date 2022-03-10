import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { axiosRequest } from "../components/DataFetch";
import Problem from "../components/Problem";
import Loader from "../components/Loader";

export default function LoginRoute({ component: Component }) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [user, setUser] = useState(null);

  async function handleLogin() {
    try {
      const { data } = await axiosRequest("/login", "POST");
    } catch {
      setErr(true);
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
  }
}
