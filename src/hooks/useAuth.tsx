import React, { createContext, useContext, useState, useMemo } from 'react';

interface AuthContextProps {
  role: string;
  // eslint-disable-next-line no-unused-vars
  setRole: (role: string) => void;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState('');

  const value = useMemo(
    () => ({
      role,
      setRole,
    }),
    [role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export default useAuth;
