"use client";

import { Edit3, Trash2, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import SettingsSkeleton from "../../../components/shared/dashboard/SettingsSkeletons";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { getToken } from "../../../config/config";
import { useAuthContext } from "../../../context/authContext";
import { useDeleteUser, useUpdateUser } from "../../../hooks/useCurrentUser";

export default function Settings() {
  const { authUser, isLoading, error } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  if (error || !authUser || !authUser.user) {
    return (
      <Card className="flex flex-col gap-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-destructive/15 p-4 text-destructive">
            Error loading profile data. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSaveChanges = (username: string, email: string) => {
    const token = getToken();
    if (!token) {
      toast.error("No token found");
      return;
    }

    updateUser({
      user: { ...authUser.user, username, email },
      token,
    });

    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      deleteUser(authUser.user.id);
    }
  };

  const username = authUser?.user?.username || "User";
  const email = authUser?.user?.email || "No email";
  const avatarUrl =
    authUser?.user?.avatarUrl || "https://ui.shadcn.com/avatars/01.png";
  const createdAt = authUser?.user?.createdAt;

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4">
          <Image
            src={avatarUrl}
            width={80}
            height={80}
            className="rounded-full"
            alt="Profile picture"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{username}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
          <div className="flex gap-2">
            <Button
              className="hidden sm:flex"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            <Button
              className="flex sm:hidden"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {!isEditing ? (
            <div>
              <h3 className="mb-2 text-lg font-medium">User Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Username:</span>
                  <span>{username}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Joined:</span>
                  <span>{createdAt ? formatDate(createdAt) : "N/A"}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="mb-4 text-lg font-medium">Account Settings</h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const newUsername = formData.get("username") as string;
                  const newEmail = formData.get("email") as string;
                  handleSaveChanges(newUsername, newEmail);
                }}
              >
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    name="username"
                    defaultValue={username}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input name="email" defaultValue={email} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    name="password"
                    type="password"
                    className="mt-1"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    className="mt-1"
                    placeholder="Leave blank to keep current password"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          )}
        </div>
        {!isEditing && (
          <div className="mt-4 flex justify-end">
            <Button variant="destructive" onClick={handleDeleteAccount}>
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete Account</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
