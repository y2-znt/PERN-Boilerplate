import { User } from "@/lib/types";
import { deleteUser, fetchUsers } from "@/pages/api/UserApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function UsersList() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error loading data</div>;

  const sortedUsers = data?.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {sortedUsers &&
        sortedUsers.map((user) => (
          <Card key={user.id} className="flex flex-col w-full">
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => deleteUserMutation.mutate(user.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
