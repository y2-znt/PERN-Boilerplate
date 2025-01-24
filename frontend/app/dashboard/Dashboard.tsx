"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "../api/AuthApi";
import { Button } from "../components/ui/button";
import UserForm from "../components/UserForm";
import UsersList from "../components/UsersList";
import { useAuthContext } from "../context/authContext";

export default function Dashboard() {
  const router = useRouter();
  const { setAuthUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuthUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative mx-auto flex justify-center">
        <Button
          onClick={handleLogout}
          className="absolute right-8 top-8"
          variant="outline"
        >
          Logout
        </Button>
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
