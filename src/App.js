import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import HomeRoute from "./routes/HomeRoute";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import ThankyouPage from "./pages/ThankyouPage";
import DisplayGrievances from "./pages/grievances/DisplayGrievances";
import Error404 from "./pages/Error404";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <HomeRoute exact path="/home" component={Home} />
        <HomeRoute exact path="/thankyou" component={ThankyouPage} />
        <AdminRoute exact path="/grievancelist" component={DisplayGrievances} />
        <Route exact path="/404" component={Error404} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
