"use client";
import { getUserData, UserData } from '@/app/actions/getUserData';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

export const UserContext = createContext<UserData | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data: UserData | undefined = await getUserData();
      setUser(data);
    }

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};