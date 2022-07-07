import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import useAuth from 'hooks/useAuth';
import Loader from 'components/Loader';
import Problem from 'components/Problem';

export default function LoginRoute() {
  const { data, loading, error } = useFetch('/auth');
  const { role } = useAuth();
  const location = useLocation();

  function handleLogin(role: string) {
    if (role === 'user') {
      return <Navigate to="/home" state={{ from: location }} replace />;
    } else if (role === 'admin') {
      return <Navigate to="/grievance-list" state={{ from: location }} replace />;
    } else if (role === 'superAdmin') {
      return <Navigate to="/user-manage" state={{ from: location }} replace />;
    } else {
      return <Problem />;
    }
  }

  if (!role) {
    if (loading) {
      return <Loader />;
    } else if (error === 'Internal server error' || error === 'No server response') {
      return <Problem />;
    } else if (!data.role) {
      return <Outlet />;
    } else {
      return handleLogin(data.role);
    }
  } else {
    return handleLogin(role);
  }
}
