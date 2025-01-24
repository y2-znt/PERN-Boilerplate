import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerUser } from "../api/AuthApi";
import { useAuthContext } from "../context/authContext";

export const useRegister = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

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
    onSuccess: (data) => {
      console.log("Register successful!", data);
      setAuthUser(data);
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Register failed:", error.message);
      alert(error.message || "Registration failed");
    },
  });

  return registerMutation;
};
