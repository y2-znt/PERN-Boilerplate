"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { deleteUser, fetchUsers, updateUser } from "../../lib/api/UserApi";
import { AuthUserType } from "../../types/types";
import UserCard from "./UserCard";

export default function UsersList() {
  const queryClient = useQueryClient();
  const [editingUser, setEditingUser] = useState<AuthUserType | null>(null);
  const { token } = useAuthContext();

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<AuthUserType[]>({
    queryKey: ["users"],
    queryFn: () => {
      if (!token) throw new Error("No token found");
      return fetchUsers(token);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => {
      if (!token) throw new Error("No token found");
      return deleteUser(id, token);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const updateUserMutation = useMutation({
    mutationFn: (user: AuthUserType) => {
      if (!token) throw new Error("No token found");
      return updateUser(user, token);
    },
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
