import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/AuthApi";
import { useAuthContext } from "../context/authContext";

export const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      console.log("data :", data);
      const response = await loginUser(data.email, data.password);
      console.log("response :", response);
      return response;
    },
    onSuccess: (data) => {
      console.log("Login successful!", data);
      setAuthUser(data.user);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
      alert(error.message || "Login failed");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
};
