import { User } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./button";
import { Input } from "./input";
import { createUser } from "@/pages/api/UserApi";

export default function UserForm() {
  const mutation = useMutation({
    mutationFn: createUser,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user: User = {
      id: 0,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };
    mutation.mutate(user);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4 w-full mx-auto"
      >
        <Input type="text" name="name" placeholder="Name" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Button type="submit" size="lg">
          Create User
        </Button>
      </form>
    </div>
  );
}
