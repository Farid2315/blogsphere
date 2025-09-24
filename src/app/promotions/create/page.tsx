"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PromotionsCreatePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/create-promotion");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground">Redirecting to create promotion...</p>
      </div>
    </div>
  );
}