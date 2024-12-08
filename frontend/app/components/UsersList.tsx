"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteUser, fetchUsers, updateUser } from "../api/UserApi";
import { User } from "../lib/types";
import UserCard from "./UserCard";

export default function UsersList() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
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

  const sortedUsers = users?.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSave = () => {
    if (editingUser) {
      updateUserMutation.mutate(editingUser);
      setEditingUser(null);
    }
  };

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {sortedUsers?.map((user) => (
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
