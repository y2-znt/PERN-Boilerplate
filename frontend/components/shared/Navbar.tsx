"use client";

import Link from "next/link";
import { useAuthContext } from "../../context/authContext";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/themeToggle";

export default function Navbar() {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-between py-4">
      <div className="relative z-[2] bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-center text-xl font-bold text-transparent">
        y2 Boilerplate
      </div>
      <div className="flex items-center gap-4">
        {authUser ? (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}
