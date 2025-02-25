"use client";

import { Edit3, User } from "lucide-react"; // Import the pen icon
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

export default function ProfilePage() {
  return (
    <Card className="flex flex-col gap-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4">
          <Image
            src="https://ui.shadcn.com/avatars/01.png"
            width={80}
            height={80}
            className="rounded-full"
            alt="Profile picture"
          />
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500">john@example.com</p>
          </div>
          <Button className="ml-auto hidden sm:flex" variant="outline">
            Edit Profile
          </Button>
          <Button className="ml-auto flex sm:hidden" variant="outline">
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-medium">User Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Username:</span>
                <span>johndoe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Email:</span>
                <span>john@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Joined:</span>
                <span>12th August 2023</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Account Settings</h3>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-medium">Username</label>
                <Input defaultValue="johndoe" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue="john@example.com" className="mt-1" />
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
