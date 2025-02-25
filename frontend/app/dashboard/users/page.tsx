"use client";

import Image from "next/image";
import { Card } from "../../../components/ui/card";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "https://ui.shadcn.com/avatars/01.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    lastActive: "5 hours ago",
    avatar: "https://ui.shadcn.com/avatars/02.png",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Editor",
    status: "Inactive",
    lastActive: "1 day ago",
    avatar: "https://ui.shadcn.com/avatars/03.png",
  },
];

export default function UsersPage() {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Users</h1>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center gap-4">
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold">{user.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{user.role}</p>
                        <p className="text-sm text-muted-foreground">
                          Last active: {user.lastActive}
                        </p>
                      </div>
                      <div
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
