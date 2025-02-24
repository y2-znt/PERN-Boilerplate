"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import LoadingIndicator from "../../../../components/shared/LoadingIndicator";
import { useGoogleCallback } from "../../../../hooks/useGoogleCallback";

export default function AuthCallback() {
  const router = useRouter();
  const { handleGoogleCallback, isLoading } = useGoogleCallback();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        handleGoogleCallback(token);
      } else {
        toast.error("Aucun token trouvé");
        router.push("/login");
      }
    }
  }, [handleGoogleCallback, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {isLoading && <LoadingIndicator text="Connexion en cours..." />}
      </div>
    </div>
  );
}
