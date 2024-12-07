import { Button } from "./button";
import { Input } from "./input";

export default function UserForm() {
  return (
    <div>
      <form className="flex flex-col gap-4 w-full md:w-1/2 mx-auto">
        <Input type="text" name="name" placeholder="Name" />
        <Input type="email" name="email" placeholder="Email" />
        <Button type="submit" size="lg">
          Create User
        </Button>
      </form>
    </div>
  );
}
