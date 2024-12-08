import { User } from "@/lib/types";
import { deleteUser, fetchUsers, updateUser } from "@/pages/api/UserApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export default function UsersList() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error loading data</div>;

  const sortedUsers = data?.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    if (editingUser) {
      updateUserMutation.mutate(editingUser);
      setEditingUser(null);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {sortedUsers &&
        sortedUsers.map((user) => (
          <Card key={user.id} className="flex flex-col w-full">
            <CardHeader>
              {editingUser && editingUser.id === user.id ? (
                <>
                  <Input
                    type="text"
                    className="border-2 border-gray-500"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                  <Input
                    type="email"
                    className="border-2 border-gray-500"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </>
              )}
            </CardHeader>
            <CardFooter>
              {editingUser && editingUser.id === user.id ? (
                <Button variant="outline" onClick={handleSave}>
                  Save
                </Button>
              ) : (
                <Button variant="outline" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              )}
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
