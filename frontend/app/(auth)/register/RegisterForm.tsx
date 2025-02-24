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
import { useRegister } from "../../../hooks/useRegister";
import { googleAuth } from "../../../lib/api/AuthApi";
import {
  RegisterFormValues,
  RegisterSchema,
} from "../../../schemas/authSchema";

export default function RegisterForm() {
  const { signUp, isLoading } = useRegister();

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
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    signUp(data);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <FormField
                label="Username"
                id="username"
                type="text"
                placeholder="John Doe"
                register={register("username")}
                error={errors.username}
              />
              <FormField
                label="Email"
                id="email"
                type="email"
                placeholder="m@example.com"
                register={register("email")}
                error={errors.email}
              />
              <FormField
                label="Password"
                id="password"
                type="password"
                placeholder="********"
                register={register("password")}
                error={errors.password}
              />
              <FormField
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="********"
                register={register("confirmPassword")}
                error={errors.confirmPassword}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? (
                  <LoadingIndicator text="Creating account..." />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
          <Button
            onClick={googleAuth}
            variant="outline"
            className="mt-4 w-full"
          >
            Register with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
