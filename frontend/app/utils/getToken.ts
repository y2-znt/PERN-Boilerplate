export const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};
