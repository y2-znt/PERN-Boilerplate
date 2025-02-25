"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingIndicator from "../../components/shared/LoadingIndicator";
import UserForm from "../../components/shared/UserForm";
import UsersList from "../../components/shared/UsersList";
import { Button } from "../../components/ui/button";
import { ThemeToggle } from "../../components/ui/themeToggle";
import { useAuthContext } from "../../context/authContext";
import { useLogout } from "../../hooks/useLogout";

export default function Dashboard() {
  const { logout, isLoading } = useLogout();
  const router = useRouter();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (!authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative mx-auto flex justify-center">
        <div className="absolute right-8 top-8 flex items-center gap-4">
          <Button
            onClick={() => logout()}
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? <LoadingIndicator text="Logout..." /> : "Logout"}
          </Button>
          <ThemeToggle />
        </div>
        <div className="mt-12 w-full px-8 md:w-1/2">
          <h1 className="pb-12 text-center text-4xl font-bold">
            User Management
          </h1>
          <div className="space-y-12">
            <UserForm />
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}
