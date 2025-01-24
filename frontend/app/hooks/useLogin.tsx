import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "../api/AuthApi";
import { useAuthContext } from "../context/authContext";

export const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await loginUser(data.email, data.password);
      return response;
    },
    onMutate: () => {
      toast.loading("Logging in...");
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully ! 🎉 ");
      setAuthUser(data.user);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      if (error.message === "User not found") {
        toast.error("Email or password incorrect");
      } else if (error.message === "Invalid password") {
        toast.error("Password incorrect");
      } else {
        toast.error("An error occurred. Please try again.");
      }

      console.error("Erreur :", error.message);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
  };
};
