"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/AuthApi";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { InputWithLabel } from "../../components/ui/InputWithLabel";
import { useAuthContext } from "../../context/authContext";
import { LoginFormValues, LoginSchema } from "../../schemas/authSchema";
export default function LoginForm() {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      console.log("data :", data);
      const response = await loginUser(data.email, data.password);
      console.log("response :", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("Login successful!", data);
      setAuthUser(data);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
      alert(error.message || "An error occurred during login");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("data", data);
    loginMutation.mutate(data);
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
              </div>

              <div>
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
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
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
