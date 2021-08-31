import Problem from "../components/Problem";
import Loader from "../components/Loader";
import { useSWRPost } from "../components/DataFetch";
import { Redirect } from "react-router-dom";
import { endpoint } from "../components/Storage";

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

  return (
    <>
      {user === "crew" ? (
        <Redirect to={{ pathname: "/home" }} />
      ) : user === "HR" || user === "VPO" || user === "VPE" ? (
        <Redirect to={{ pathname: "/grievancelist" }} />
      ) : (
        <Component />
      )}
    </>
  );
}
