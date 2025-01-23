import Navbar from "./components/Navbar";

export default function page() {
  return (
    <div className="mx-7 ">
      <Navbar />
      <div className="flex justify-center mx-auto">
        <div className="mt-12 px-8 w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-bold pb-12 text-center">
            Welcome to the y2&apos;s Boilerplate
          </h1>
        </div>
      </div>
    </div>
  );
}
