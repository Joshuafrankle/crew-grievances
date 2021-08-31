import Problem from "../components/Problem";
import Loader from "../components/Loader";
import { useSWRPost } from "../components/DataFetch";
import { endpoint } from "../components/Storage";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function HomeRoute(props) {
  const Component = props.component;
  const history = useHistory();
  const token = window.localStorage.getItem("token");

  const {
    data: user,
    isLoading,
    isError,
  } = useSWRPost(`${endpoint}/api/check`, token);

  if (isError) return <Problem />;
  if (isLoading) return <Loader />;
  if (user) {
    if (user.status === "failure") return <Problem />;
  }

  if (user) {
    if (user.role === "HR" || user.role === "VPE" || user.role === "VPO") {
      var isAdmin = true;
    } else {
      history.push("/");
    }
  }

  return <>{isAdmin ? <Component /> : <Redirect to={{ pathname: "/" }} />}</>;
}
