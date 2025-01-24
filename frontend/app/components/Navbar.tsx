"use client";

import Link from "next/link";
import { useAuthContext } from "../context/authContext";
import { Button } from "./ui/button";

export default function Navbar() {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-between py-4">
      <div className="font-bold md:text-2xl">y2 Boilerplate</div>
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
      </div>
    </div>
  );
}
