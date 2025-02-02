import Navbar from "../components/shared/Navbar";

export default function page() {
  return (
    <div className="mx-7">
      <Navbar />
      <div className="mx-auto flex justify-center">
        <div className="mt-12 w-full px-8 md:w-1/2">
          <h1 className="pb-12 text-center text-2xl font-bold md:text-4xl">
            Welcome to the y2&apos;s Boilerplate
          </h1>
        </div>
      </div>
    </div>
  );
}
