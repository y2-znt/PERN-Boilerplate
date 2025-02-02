import { AuthUserType } from "../../types/types";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

type UserCardType = {
  user: AuthUserType;
  isEditing: boolean;
  onEdit: (user: AuthUserType) => void;
  onSave: () => void;
  onDelete: (id: string) => void;
  editingUser: AuthUserType | null;
  setEditingUser: React.Dispatch<React.SetStateAction<AuthUserType | null>>;
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
    <Card key={user.id} className="flex w-full flex-col">
      <CardHeader>
        {isEditing ? (
          <>
            <Input
              type="text"
              aria-label="Edit username"
              className="border-2 border-gray-500"
              value={editingUser?.username || ""}
              onChange={(e) =>
                setEditingUser((prev) =>
                  prev ? { ...prev, username: e.target.value } : null,
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
                  prev ? { ...prev, email: e.target.value } : null,
                )
              }
            />
          </>
        ) : (
          <>
            <CardTitle>{user.username}</CardTitle>
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
