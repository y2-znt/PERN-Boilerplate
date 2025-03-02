import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";
import { loginUser } from "../lib/api/AuthApi";

export const useLogin = () => {
  const { setAuthUser, refetchUser } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

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
      refetchUser();

      setTimeout(() => {
        if (!pathname.startsWith("/dashboard")) {
          router.push("/dashboard");
        }
      }, 100);
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
