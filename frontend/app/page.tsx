import Link from "next/link";
import Navbar from "../components/shared/Navbar";
import { Button } from "../components/ui/button";

export default function page() {
  return (
    <div className="mx-7 flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center">
        <main className="flex flex-1 flex-col items-center justify-center gap-6 md:gap-14">
          <div className="relative">
            <h1 className="relative z-[2] bg-gradient-to-r from-amber-500 to-red-500 bg-clip-text text-center text-4xl font-bold text-transparent md:text-6xl">
              Just a boilerplate
            </h1>
            <span className="absolute right-[-50px] top-[-40px] text-4xl md:text-6xl">
              🦇
            </span>
          </div>

          <p className="relative z-[2] w-4/5 max-w-[500px] text-center text-sm after:absolute after:bottom-[-35px] after:left-[-55px] after:z-[-1] after:rotate-[-20deg] after:text-4xl after:content-['🥳'] md:text-2xl md:after:text-6xl">
            A modern full-stack boilerplate featuring PostgreSQL, Express, React
            (Next.js), and Node.js with authentication, dark mode, and more.
          </p>

          <Link
            href="https://github.com/y2-znt/PERN-Boilerplate"
            target="_blank"
          >
            <Button
              variant="default"
              className="group relative h-12 rounded-full bg-gradient-to-r from-amber-500 to-red-500 px-6 py-2 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-amber-400 hover:to-red-400"
            >
              <span className="relative inline-flex overflow-hidden">
                <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[130%] group-hover:skew-y-12">
                  I want to use it!
                </div>
                <div className="absolute translate-y-[130%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  I want to use it!
                </div>
              </span>
            </Button>
          </Link>
        </main>

        <footer className="flex w-full items-center justify-center gap-4 py-8">
          <span>
            Made with ❤️ by{" "}
            <Link
              href="https://x.com/y2_dev"
              target="_blank"
              className="font-medium"
            >
              y2
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
