import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";
import { loginUser, logoutUser, registerUser } from "../lib/api/AuthApi";

export const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

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
      if (data.user) {
        setAuthUser(data.user);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
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

export const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logoutUser();
    },
    onMutate: () => {
      toast.loading("Logging out...");
      setAuthUser(null);
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      if (pathname !== "/") {
        router.push("/");
      }
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

export const useRegister = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: async (data: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await registerUser(
        data.username,
        data.email,
        data.password,
        data.confirmPassword,
      );
      return response;
    },
    onMutate: () => {
      toast.loading("Registering...");
    },
    onSuccess: (data) => {
      toast.success("Register successfully ! 🎉 ");
      if (data.user) {
        setAuthUser(data.user);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
      setTimeout(() => {
        if (!pathname.startsWith("/dashboard")) {
          router.push("/dashboard");
        }
      }, 100);
    },
    onError: (error: Error) => {
      if (error.message === "Email already exists") {
        toast.error("Email already exists");
      } else if (error.message === "Validation error") {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return {
    signUp: registerMutation.mutate,
    isLoading: registerMutation.isPending,
  };
};
