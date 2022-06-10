import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseFetch from "hooks/UseFetch";
import useAuth from "hooks/useAuth";
import Loader from "components/Loader";
import Problem from "components/Problem";

export default function LoginRoute() {
  const { data, loading, error } = UseFetch("/auth");
  const location = useLocation();
  const { setRole } = useAuth();

  if (loading) {
    return <Loader />;
  } else if (error === "Internal server error") {
    return <Problem />;
  } else if (!data.role) {
    return <Outlet />;
  } else {
    setRole(data.role);
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
}
