import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginRoute from "./routes/LoginRoute";
import AdminRoute from "./routes/AdminRoute";
import SuperAdminRoute from './routes/SuperAdminRoute'

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import DisplayGrievances from "./pages/grievances/DisplayGrievances";
import Error404 from "./pages/Error404";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/grievancelist" component={DisplayGrievances} />
        <Route exact path="/user-manage" component={DisplayGrievances} />
        <Route exact path="/404" component={Error404} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
