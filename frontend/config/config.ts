export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getToken = () => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};
