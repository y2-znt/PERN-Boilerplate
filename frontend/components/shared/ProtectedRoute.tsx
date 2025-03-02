"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../../app/Loading";
import { useAuthContext } from "../../context/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/");
    }
  }, [authUser, isLoading, router, pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return authUser ? <>{children}</> : null;
};

export default ProtectedRoute;
