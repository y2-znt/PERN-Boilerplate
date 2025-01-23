import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { InputWithLabel } from "../../components/ui/InputWithLabel";

export default function RegisterForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <InputWithLabel
                label="Username"
                id="username"
                type="text"
                placeholder="John Doe"
                required
              />
              <InputWithLabel
                label="Email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />

              <InputWithLabel
                label="Password"
                id="password"
                type="password"
                required
              />
              <InputWithLabel
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                required
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              <Button variant="outline" className="w-full">
                Register with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
