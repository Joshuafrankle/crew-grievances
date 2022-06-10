import { Routes, Route } from "react-router-dom";

import LoginPage from "pages/LoginPage";
import Home from "pages/Home";
import UserManagement from "pages/UserManagement";
import DisplayGrievances from "pages/grievances/DisplayGrievances";
import Error404 from "pages/Error404";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/grievance-list" element={<DisplayGrievances />} />
      <Route path="/user-manage" element={<UserManagement />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
