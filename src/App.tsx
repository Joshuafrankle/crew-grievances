import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "routes/PrivateRoute";
import LoginRoute from "routes/LoginRoute";

import LoginPage from "pages/LoginPage";
import Home from "pages/Home";
import UserManagement from "pages/UserManagement";
import DisplayGrievances from "pages/grievances";
import Error404 from "pages/Error404";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        <Route
          element={
            <PrivateRoute allowedRoles={["user", "admin", "superAdmin"]} />
          }
        >
          <Route path="/home" element={<Home />} />
        </Route>

        <Route
          element={<PrivateRoute allowedRoles={["admin", "superAdmin"]} />}
        >
          <Route path="/grievance-list" element={<DisplayGrievances />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["superAdmin"]} />}>
          <Route path="/user-manage" element={<UserManagement />} />
        </Route>

        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
