import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginRoute from "routes/LoginRoute";
import AdminRoute from "routes/AdminRoute";
import SuperAdminRoute from "routes/SuperAdminRoute";

import LoginPage from "pages/LoginPage";
import Home from "pages/Home";
import UserManagement from "pages/UserManagement";
import GetGrievances from "pages/grievances/GetGrievances";
import Error404 from "pages/Error404";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/grievance-list" component={GetGrievances} />
        <Route exact path="/user-manage" component={UserManagement} />
        <Route exact path="/404" component={Error404} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
