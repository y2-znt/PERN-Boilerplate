"use client";

import { LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useLogout } from "../../../hooks/useAuth";

interface DashboardHeaderProps {
  children?: ReactNode;
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
  const router = useRouter();
  const { logout } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 lg:h-[60px]">
      {children}
      <div className="flex flex-1 items-center justify-between">
        <h1 className="ml-12 text-lg font-semibold lg:mx-0 lg:text-xl">
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <form
            className="hidden items-center gap-2 md:flex"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px]"
            />
            <Button variant="outline" size="icon" type="submit">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <Button onClick={handleLogout} variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
