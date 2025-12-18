'use client';

import type { ReactNode } from 'react';
import React, { createContext, useState, useCallback } from 'react';

type User = {
  displayName: string;
  role: 'user' | 'admin';
};

interface AuthContextType {
  user: User | null;
  login: (role: 'user' | 'admin') => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: 'user' | 'admin') => {
    if (role === 'admin') {
      setUser({ displayName: 'Admin', role: 'admin' });
    } else {
      setUser({ displayName: 'Demo User', role: 'user' });
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
