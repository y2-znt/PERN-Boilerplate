import { User } from "@/lib/types";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

type UserCardType = {
  user: User;
  isEditing: boolean;
  onEdit: (user: User) => void;
  onSave: () => void;
  onDelete: (id: number) => void;
  editingUser: User | null;
  setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function UserCard({
  user,
  isEditing,
  onEdit,
  onSave,
  onDelete,
  editingUser,
  setEditingUser,
}: UserCardType) {
  return (
    <Card key={user.id} className="flex flex-col w-full">
      <CardHeader>
        {isEditing ? (
          <>
            <Input
              type="text"
              aria-label="Edit name"
              className="border-2 border-gray-500"
              value={editingUser?.name || ""}
              onChange={(e) =>
                setEditingUser((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
            />
            <Input
              type="email"
              aria-label="Edit email"
              className="border-2 border-gray-500"
              value={editingUser?.email || ""}
              onChange={(e) =>
                setEditingUser((prev) =>
                  prev ? { ...prev, email: e.target.value } : null
                )
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
      <CardFooter className="flex gap-2">
        {isEditing ? (
          <Button variant="default" onClick={onSave}>
            Save
          </Button>
        ) : (
          <Button variant="outline" onClick={() => onEdit(user)}>
            Edit
          </Button>
        )}
        <Button variant="outline" onClick={() => onDelete(user.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
