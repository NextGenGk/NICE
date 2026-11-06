import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/lead.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Claim Assistance & Consultation · NICE Insurance Raipur" },
      {
        name: "description",
        content:
          "Submit your claim incident or policy review request. Rajeev Ranjan and the NICE claims team in Raipur will review your file immediately.",
      },
      { property: "og:title", content: "Claim Assistance — NICE Insurance Raipur" },
      { property: "og:description", content: "Fast-track claims assistance, fleet policy audit, and expert settlement advocacy." },
    ],
  }),
  component: BookPage,
});

const GOALS = [
  "Commercial Fleet (Trucks/Tippers)",
  "Private Motor (Car/Bike)",
  "Disputed Claim Resolution",
  "Cashless Health Admission Help",
  "Accident Spot Survey Liaison",
  "Zero-Dep Policy Renewal",
  "Highway Cargo / Marine Cover",
  "Factory & Plant Fire Insurance",
];
const RISK = [
  { id: "conservative", label: "Conservative", body: "I'd rather a steady 7–9% with low drawdowns." },
  { id: "moderate", label: "Moderate", body: "I can stomach -20% for 12–14% long-term." },
  { id: "aggressive", label: "Aggressive", body: "Maximum long-term growth, I can ride out the storms." },
] as const;
const TIMELINE = [
  { id: "asap", label: "Next 7 days" },
  { id: "1_month", label: "Within a month" },
  { id: "3_months", label: "Within 3 months" },
  { id: "exploring", label: "Just exploring" },
] as const;

function BookPage() {
  const submit = useServerFn(submitLead);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState({
    goals: [] as string[],
    challenges: "",
    riskAppetite: "moderate" as (typeof RISK)[number]["id"],
    timeline: "1_month" as (typeof TIMELINE)[number]["id"],
    name: "",
    email: "",
    phone: "",
    lifeStage: "",
  });

  const toggleGoal = (g: string) =>
    setData((d) => ({ ...d, goals: d.goals.includes(g) ? d.goals.filter((x) => x !== g) : [...d.goals, g] }));

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submitNow = async () => {
    if (!data.name.trim() || !data.email.trim()) {
      toast.error("Please share your name and email so the advisor can reach you.");
      return;
    }
    setBusy(true);
    try {
      await submit({ data: { name: data.name, email: data.email, phone: data.phone, lifeStage: data.lifeStage || undefined, goals: data.goals, challenges: data.challenges, riskAppetite: data.riskAppetite, timeline: data.timeline } });
      setDone(true);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not submit. Please try again.";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-widest text-accent">Claims & Policy Intake</div>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">Fast-track claim help & expert audit.</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Four quick details. Then our Raipur claims team reviews your policy clauses and reaches out directly.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {done ? (
          <div className="rounded-2xl border border-accent/40 bg-accent/5 p-10 text-center">
            <div className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="size-7" /></div>
            <h2 className="mt-4 font-display text-3xl text-foreground">Request Received.</h2>
            <p className="mt-2 text-muted-foreground">Rajeev Ranjan and the NICE Raipur desk will review your submission and contact you within business hours (or immediately for emergency claims).</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90"><Link to="/coach">Meanwhile, ask the AI coach</Link></Button>
              <Button asChild variant="outline"><Link to="/">Back home</Link></Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <div className="inline-flex items-center gap-1.5"><Sparkles className="size-3.5 text-accent" /> Intake</div>
              <div>Step {step + 1} of 4</div>
            </div>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div className="h-full bg-accent" initial={false} animate={{ width: `${((step + 1) / 4) * 100}%` }} transition={{ type: "spring", stiffness: 220, damping: 26 }} />
            </div>

            <AnimatePresence>
              <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="mt-8 min-h-[280px]">
                {step === 0 && (
                  <>
                    <h3 className="font-display text-2xl text-foreground">What do you want to plan?</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Pick all that apply.</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {GOALS.map((g) => {
                        const on = data.goals.includes(g);
                        return (
                          <button key={g} onClick={() => toggleGoal(g)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`}>{g}</button>
                        );
                      })}
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <h3 className="font-display text-2xl text-foreground">What's getting in the way?</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Be specific. The advisor reads this before the call.</p>
                    <Textarea className="mt-4 min-h-40" maxLength={2000} placeholder="e.g. We've been investing in 6 random funds without a plan, and we want to retire by 55. Not sure if our insurance is enough." value={data.challenges} onChange={(e) => setData((d) => ({ ...d, challenges: e.target.value }))} />
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3 className="font-display text-2xl text-foreground">Your appetite — and timeline.</h3>
                    <div className="mt-5 space-y-2">
                      {RISK.map((r) => (
                        <button key={r.id} onClick={() => setData((d) => ({ ...d, riskAppetite: r.id }))} className={`w-full rounded-lg border p-4 text-left transition-colors ${data.riskAppetite === r.id ? "border-accent bg-accent/5" : "border-border bg-background hover:bg-secondary"}`}>
                          <div className="text-sm font-medium text-foreground">{r.label}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{r.body}</div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Label className="text-sm">When would you like to start?</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {TIMELINE.map((t) => (
                          <button key={t.id} onClick={() => setData((d) => ({ ...d, timeline: t.id }))} className={`rounded-full border px-4 py-2 text-sm transition-colors ${data.timeline === t.id ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background text-foreground hover:bg-secondary"}`}>{t.label}</button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <h3 className="font-display text-2xl text-foreground">How should the advisor reach you?</h3>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" maxLength={100} value={data.name} onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))} placeholder="Anika Sharma" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" maxLength={255} value={data.email} onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))} placeholder="you@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input id="phone" maxLength={20} value={data.phone} onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))} placeholder="+91 98xxx xxxxx" />
                      </div>
                      <div>
                        <Label htmlFor="ls">Life stage (optional)</Label>
                        <Input id="ls" maxLength={40} value={data.lifeStage} onChange={(e) => setData((d) => ({ ...d, lifeStage: e.target.value }))} placeholder="e.g. Newly married" />
                      </div>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">We share your goals and challenges with the advisor only. No spam, ever.</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button variant="ghost" onClick={back} disabled={step === 0}>Back</Button>
              {step < 3 ? (
                <Button onClick={next} className="bg-foreground text-background hover:bg-foreground/90">Next <ArrowRight className="ml-1 size-4" /></Button>
              ) : (
                <Button onClick={submitNow} disabled={busy} className="bg-accent text-accent-foreground hover:bg-accent/90">{busy ? "Sending…" : "Send my intake"}</Button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}