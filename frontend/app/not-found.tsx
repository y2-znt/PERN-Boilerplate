import Link from "next/link";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-r from-amber-100 to-red-100 dark:bg-background dark:from-background dark:to-background">
      <div className="mx-7 flex min-h-screen max-w-7xl flex-col md:mx-auto">
        <div className="flex flex-1 flex-col justify-center">
          <main className="flex flex-1 flex-col items-center justify-center gap-6">
            <h1 className="bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
              Page Not Found
            </h1>
            <p className="w-4/5 max-w-[500px] text-center text-sm md:text-2xl">
              Sorry, the page you are looking for does not exist.
            </p>
            <Link href="/">
              <Button variant="default">Go Back Home</Button>
            </Link>
          </main>
        </div>
      </div>
    </div>
  );
}
