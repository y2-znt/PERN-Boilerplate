import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";
import { fetchAuthUser } from "../lib/api/AuthApi";

export const useGoogleCallback = () => {
  const router = useRouter();
  const { setAuthUser } = useAuthContext();

  const googleCallbackMutation = useMutation({
    mutationFn: async (token: string) => {
      localStorage.setItem("token", token);
      const response = await fetchAuthUser();
      return response;
    },
    onMutate: () => {
      toast.loading("Connexion en cours...");
    },
    onSuccess: (data) => {
      setAuthUser(data.user);
      toast.success("Connexion réussie! 🎉");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      console.error("❌ Error during Google callback:", error);
      toast.error("Erreur lors de la connexion", {
        description: error.message || "Une erreur est survenue",
      });
      router.push("/login");
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return {
    handleGoogleCallback: googleCallbackMutation.mutate,
    isLoading: googleCallbackMutation.isPending,
  };
};
