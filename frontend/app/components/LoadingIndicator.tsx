import { LoaderCircle } from "lucide-react";
import React from "react";

interface LoadingIndicatorProps {
  text?: string;
}

export default function LoadingIndicator({ text }: LoadingIndicatorProps) {
  return (
    <div>
      <LoaderCircle className="mr-2 inline-block animate-spin" />
      {text}
    </div>
  );
}
