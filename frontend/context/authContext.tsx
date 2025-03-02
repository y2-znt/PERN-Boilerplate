"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { fetchAuthUser } from "../lib/api/AuthApi";
import { AuthUserType } from "../types/types";

interface AuthContextType {
  authUser: AuthUserType | null;
  setAuthUser: (user: AuthUserType | null) => void;
  isLoading: boolean;
  error: string | null;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const {
    data: authUser,
    isLoading,
    error,
    refetch,
  } = useQuery<AuthUserType | null>({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: 1,
  });

  const refetchUser = () => refetch().catch(console.error);

  const setAuthUser = (user: AuthUserType | null) => {
    queryClient.setQueryData(["authUser"], user);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser: authUser as AuthUserType | null,
        setAuthUser,
        isLoading,
        error: error ? error.message : null,
        refetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
