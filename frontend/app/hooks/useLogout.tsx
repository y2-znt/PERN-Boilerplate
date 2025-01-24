import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/authContext";

export const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const router = useRouter();

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setAuthUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};
