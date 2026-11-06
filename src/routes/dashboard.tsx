import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, MessageSquareHeart } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Policyholder Portal · NICE Insurance Raipur" }] }),
  component: DashboardPage,
});

type SubScores = { retirementReadiness?: number; emergencyFund?: number; insuranceHealth?: number; investmentReadiness?: number; wealthProjection?: number };
type Score = { id: string; score: number; sub_scores: SubScores | null; created_at: string };

function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) { navigate({ to: "/auth" }); return; }
      if (!mounted) return;
      setEmail(s.session.user.email ?? null);
      const { data } = await supabase.from("freedom_scores").select("id, score, sub_scores, created_at").order("created_at", { ascending: false }).limit(10);
      if (mounted) { setScores((data ?? []) as unknown as Score[]); setLoading(false); }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/" }); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-accent">Your dashboard</div>
          <h1 className="mt-2 font-display text-4xl text-foreground">Hi{email ? `, ${email.split("@")[0]}` : ""}.</h1>
          <p className="mt-1 text-muted-foreground">Saved scores, goals, and coach history live here.</p>
        </div>
        <Button variant="ghost" onClick={signOut}>Sign out</Button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <DashCard icon={<Sparkles className="size-5" />} title="Run a new Freedom Score" to="/" cta="Open calculator" />
        <DashCard icon={<MessageSquareHeart className="size-5" />} title="Talk to the AI coach" to="/coach" cta="Open coach" />
        <DashCard icon={<Target className="size-5" />} title="Plan a new goal" to="/goals" cta="Open planner" />
      </div>

      <h2 className="mt-12 font-display text-2xl text-foreground">Recent scores</h2>
      {loading ? (
        <div className="mt-4 text-sm text-muted-foreground">Loading…</div>
      ) : scores.length === 0 ? (
        <div className="mt-4 rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">No scores saved yet. <Link to="/" className="text-accent">Run your first one →</Link></div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="p-4">Date</th><th className="p-4">Score</th><th className="p-4">Retirement</th><th className="p-4">Emergency</th><th className="p-4">Investment</th></tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={s.id} className={i ? "border-t border-border" : ""}>
                  <td className="p-4 text-foreground/80">{new Date(s.created_at).toLocaleDateString("en-IN")}</td>
                  <td className="p-4 font-display text-foreground">{s.score}</td>
                  <td className="p-4 text-foreground/80">{s.sub_scores?.retirementReadiness ?? "—"}</td>
                  <td className="p-4 text-foreground/80">{s.sub_scores?.emergencyFund ?? "—"}</td>
                  <td className="p-4 text-foreground/80">{s.sub_scores?.investmentReadiness ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DashCard({ icon, title, to, cta }: { icon: React.ReactNode; title: string; to: "/" | "/coach" | "/goals"; cta: string }) {
  return (
    <Link to={to} className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent">
      <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">{icon}</div>
      <div className="mt-4 font-display text-lg text-foreground">{title}</div>
      <div className="mt-1 text-sm text-accent">{cta} →</div>
    </Link>
  );
}