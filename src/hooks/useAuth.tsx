import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  role: '',
  setRole: (_role: string) => {},
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
