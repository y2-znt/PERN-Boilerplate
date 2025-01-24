"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/AuthApi";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { InputWithLabel } from "../../components/ui/InputWithLabel";
import { RegisterFormValues, RegisterSchema } from "../../schemas/authSchema";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const response = await registerUser(
        data.username,
        data.email,
        data.password,
        data.confirmPassword,
      );
      return response;
    },
    onSuccess: (data) => {
      console.log("Register successful!", data);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Register failed:", error.message);
      alert(error.message || "An error occurred during registration");
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("data", data);
    registerMutation.mutate(data);
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
              <InputWithLabel
                label="Username"
                id="username"
                type="text"
                placeholder="John Doe"
                required
                {...register("username")}
              />
              {errors.username && (
                <p className="m-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
              <InputWithLabel
                label="Email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="m-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
              <InputWithLabel
                label="Password"
                id="password"
                type="password"
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="m-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <InputWithLabel
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                required
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="m-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create Account"}
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
