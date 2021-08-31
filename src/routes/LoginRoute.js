import Problem from "../components/Problem";
import Loader from "../components/Loader";
import { useSWRPost } from "../components/DataFetch";
import { endpoint } from "../components/Storage";
import { Redirect } from "react-router-dom";

export default function HomeRoute(props) {
  const Component = props.component;
  const token = window.localStorage.getItem("token");

  const {
    data: user,
    isLoading,
    isError,
  } = useSWRPost(`${endpoint}/api/check`, token);

  if (isError) return <Problem />;
  if (isLoading) return <Loader />;
  if (user && user.status === "failure") {
    return <Problem />;
  }

  return (
    <>
      {user.role === "crew" ? (
        <Redirect to={{ pathname: "/home" }} />
      ) : user.role === "HR" || user.role === "VPO" || user.role === "VPE" ? (
        <Redirect to={{ pathname: "/grievancelist" }} />
      ) : (
        <Component />
      )}
    </>
  );
}
