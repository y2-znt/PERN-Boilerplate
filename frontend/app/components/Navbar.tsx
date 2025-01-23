import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="font-bold md:text-2xl">y2 Boilerplate</div>
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
