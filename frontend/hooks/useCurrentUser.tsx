import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthContext } from "../context/authContext";
import { updateUser } from "../lib/api/UserApi";
import { AuthUserType } from "../types/types";

export const useUpdateUser = () => {
  const { setAuthUser } = useAuthContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      user,
      token,
    }: {
      user: AuthUserType["user"];
      token: string;
    }) => {
      return await updateUser({ user }, token);
    },
    onMutate: async ({ user }) => {
      toast.loading("Updating profile...");
      // Cancel any ongoing queries for the "authUser" data to prevent stale data
      await queryClient.cancelQueries({ queryKey: ["authUser"] });
      // Retrieve the previous user data from the cache for potential rollback
      const previousUser = queryClient.getQueryData<AuthUserType>(["authUser"]);
      // Update the cache with the new user data to reflect the changes immediately
      queryClient.setQueryData(
        ["authUser"],
        (old: AuthUserType | undefined) => ({
          ...old,
          user,
        }),
      );
      return { previousUser };
    },
    onSuccess: (updatedUser: AuthUserType) => {
      setAuthUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.dismiss();
      toast.success("Profile updated successfully! 🎉");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating user:", error);
    },
    onSettled: () => {
      toast.dismiss();
    },
  });

  return {
    updateUser: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
