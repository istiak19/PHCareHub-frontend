"use client";

import { AuthResponse, UserInterface } from "@/types";
import checkAuthStatus from "@/utility/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextInterface {
  user: UserInterface | null;
  isAuthenticated: boolean;
  setAuth: React.Dispatch<React.SetStateAction<AuthResponse>>;
};

const UserContext = createContext<UserContextInterface | undefined>(undefined);

export const UseUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UseUser must be used within a UserProvider.");
  };
  return context;
};

export const UserProvider = ({ initialUser, children }: { initialUser?: AuthResponse | null; children: React.ReactNode }) => {

  const [auth, setAuth] = useState<AuthResponse>({
    isAuthenticated: initialUser?.isAuthenticated ?? false,
    user: initialUser?.user ?? null,
  });

  console.log(auth)

  useEffect(() => {
    const revalidateUser = async () => {
      try {
        const res = await checkAuthStatus();
        setAuth(res);
      } catch {
        setAuth({ isAuthenticated: false, user: null });
      }
    };

    revalidateUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: auth.user,
        isAuthenticated: auth.isAuthenticated,
        setAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};