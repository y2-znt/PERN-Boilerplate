"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteUser, fetchUsers, updateUser } from "../../lib/api/UserApi";
import { AuthUserType } from "../../types/types";
import UserCard from "./UserCard";

export default function UsersList() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<AuthUserType | null>(null);

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<AuthUserType[]>({
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
  if (error)
    return (
      <div className="text-center text-red-600">
        Error loading data. Please try again later.
      </div>
    );

  const handleEdit = (user: AuthUserType) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    if (editingUser) {
      updateUserMutation.mutate(editingUser);
      setEditingUser(null);
    }
  };

  const handleDelete = (id: string) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {users?.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isEditing={editingUser?.id === user.id}
          onEdit={handleEdit}
          onSave={handleSave}
          onDelete={handleDelete}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      ))}
    </div>
  );
}
