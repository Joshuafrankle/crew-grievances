import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  role: string;
  setRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  role: '',
  setRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState('');

  return (
    <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};

export default useAuth;
