import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({ meta: [{ title: "Signing you in · Omega" }] }),
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const go = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate({ to: "/dashboard", replace: true });
      } else {
        navigate({ to: "/auth", replace: true });
      }
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") navigate({ to: "/dashboard", replace: true });
    });
    void go();
    return () => sub.subscription.unsubscribe();
  }, [navigate]);
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-4 text-sm text-muted-foreground">
      Signing you in…
    </div>
  );
}