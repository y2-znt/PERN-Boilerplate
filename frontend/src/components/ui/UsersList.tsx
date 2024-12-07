import { User } from "@/lib/types";
import { fetchUsers } from "@/pages/api/UserApi";
import { useQuery } from "@tanstack/react-query";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

export default function UsersList() {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error loading data</div>;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data &&
        data.map((user) => (
          <Card key={user.id} className="flex flex-col w-full">
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
}
