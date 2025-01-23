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

export default function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
            </div>
            <Button type="submit" className="mt-4 w-full">
              Login
            </Button>
            <Button variant="outline" className="mt-4 w-full">
              Login with Google
            </Button>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
