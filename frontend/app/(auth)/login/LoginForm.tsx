"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../../../components/shared/FormField";
import LoadingIndicator from "../../../components/shared/LoadingIndicator";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useAuthContext } from "../../../context/authContext";
import { useLogin } from "../../../hooks/useAuth";
import { googleAuth } from "../../../lib/api/AuthApi";
import { LoginFormValues, LoginSchema } from "../../../schemas/authSchema";

export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      redirect("/dashboard");
    }
  }, [authUser]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div>
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  register={register("email")}
                  error={errors.email}
                />
              </div>

              <div>
                <FormField
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="********"
                  register={register("password")}
                  error={errors.password}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? <LoadingIndicator text="Logging in..." /> : "Login"}
            </Button>
          </form>
          <Button
            onClick={googleAuth}
            variant="outline"
            className="mt-4 w-full"
          >
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
