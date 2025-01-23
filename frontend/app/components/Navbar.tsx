import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="md:text-2xl font-bold">y2 Boilerplate</div>
      <div className="flex items-center gap-4">
        <Button>Login</Button>
      </div>
    </div>
  );
}
