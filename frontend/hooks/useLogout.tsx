import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";
import { logoutUser } from "../lib/api/AuthApi";

export const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logoutUser();
    },
    onMutate: () => {
      toast.loading("Logging out...");
    },
    onSuccess: () => {
      setAuthUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    },
    onError: (error: Error) => {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoading: logoutMutation.isPending,
  };
};
