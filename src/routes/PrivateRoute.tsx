import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

export default function PrivateRoute({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const { role } = useAuth();
  const location = useLocation();

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}
