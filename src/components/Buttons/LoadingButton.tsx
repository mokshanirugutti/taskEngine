"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface LoadingButtonProps {
  title: string;
  onClick: () => Promise<void>; // Expecting an async function
}

export default function LoadingButton({ title, onClick }: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick(); // Call the passed async function
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      data-loading={isLoading}
      className="group relative disabled:opacity-100 mt-4"
    >
      <span className="group-data-[loading=true]:text-transparent">{title}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      )}
    </Button>
  );
}