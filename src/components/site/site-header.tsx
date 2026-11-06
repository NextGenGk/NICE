import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin } from "lucide-react";

const nav = [
  { to: "/coach", label: "AI Claims Coach" },
  { to: "/goals", label: "Coverage Audit" },
  { to: "/learn", label: "Claims Guide" },
  { to: "/stories", label: "Settlement Stories" },
  { to: "/advisors", label: "Experts & Trust" },
  { to: "/strategy", label: "Platform Vision" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") setSignedIn(true);
      if (event === "SIGNED_OUT") setSignedIn(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="NICE — Network of Insurance & Claims Expert">
          <img
            src="/nice-logo.png"
            alt="NICE — Network of Insurance & Claims Expert"
            className="h-11 w-auto sm:h-12"
          />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {signedIn ? (
            <Button asChild variant="ghost" size="default">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="default" className="border border-accent text-accent">
              <a
                href="https://niceinsurance.frequnsync.online/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Quote
              </a>
            </Button>
          )}
          <Button asChild size="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/book">Claim Assistance</Link>
          </Button>
        </div>
        <button
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 p-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=21.2460758,81.6172476"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-accent hover:bg-secondary"
              onClick={() => setOpen(false)}
            >
              <MapPin className="size-4" /> Raipur Office Directions
            </a>
            <div className="flex gap-2 pt-2">
              {signedIn ? (
                <Button asChild variant="outline" size="default" className="flex-1">
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="flex-1 border-accent text-accent"
                >
                  <a
                    href="https://niceinsurance.frequnsync.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Get Quote
                  </a>
                </Button>
              )}
              <Button
                asChild
                size="default"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/book" onClick={() => setOpen(false)}>
                  Claim Assistance
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}