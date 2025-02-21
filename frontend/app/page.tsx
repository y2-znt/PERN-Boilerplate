import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/shared/Navbar";

export default function page() {
  return (
    <div className="mx-7 flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center">
        <main className="flex flex-1 flex-col items-center justify-center gap-16">
          <h1 className="relative z-[2] text-center text-4xl font-bold text-primary text-red-400 after:absolute after:right-[-30px] after:top-[-25px] after:z-[-1] after:rotate-[20deg] after:content-['🦇'] md:text-6xl">
            Just a boilerplate
          </h1>

          <p className="relative z-[2] w-4/5 max-w-[500px] text-center text-base after:absolute after:bottom-[-35px] after:left-[-55px] after:z-[-1] after:rotate-[-20deg] after:text-4xl after:content-['🥳'] md:text-2xl md:after:text-6xl">
            A modern full-stack boilerplate featuring PostgreSQL, Express,
            Next.js, and Node.js with authentication, dark mode, and more.
          </p>

          <div className="flex items-center gap-1 transition-all duration-300 ease-in-out hover:scale-105">
            <Link
              href="https://github.com/y2-znt/PERN-Boilerplate"
              target="_blank"
              className="relative font-bold transition-all duration-300 ease-in-out"
            >
              I want to use it!
            </Link>
            <Image src="/gutsRage.png" alt="y2" width={25} height={25} />
          </div>
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
