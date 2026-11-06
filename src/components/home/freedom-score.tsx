import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  calculateFreedomScore,
  defaultInputs,
  type ScoreInputs,
} from "@/lib/freedom-score";
import { formatINRShort } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, RefreshCcw } from "lucide-react";

type Step = {
  key: keyof ScoreInputs;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
};

const steps: Step[] = [
  { key: "age", label: "Primary Insured / Operator Age", hint: "Determines risk bracket and NCB eligibility.", min: 18, max: 70, step: 1, format: (v) => `${v} yrs` },
  { key: "monthlyIncome", label: "Fleet / Vehicle / Annual Income", hint: "Value of vehicles or family annual earnings.", min: 25000, max: 1000000, step: 5000, format: formatINRShort },
  { key: "monthlySavings", label: "Annual Insurance Premium Budget", hint: "Total planned for motor, health & commercial policies.", min: 5000, max: 500000, step: 1000, format: formatINRShort },
  { key: "currentInvestments", label: "Total Existing Sum Insured / IDV", hint: "Current coverage across vehicle, health, and life.", min: 100000, max: 50000000, step: 50000, format: formatINRShort },
  { key: "loanEMI", label: "Monthly Vehicle / Financed EMIs", hint: "Active loans on commercial fleet or private vehicles.", min: 0, max: 300000, step: 1000, format: formatINRShort },
  { key: "emergencyFund", label: "Emergency Repair & Medical Reserve", hint: "Liquid cash for claim deductibles & towing.", min: 10000, max: 2000000, step: 5000, format: formatINRShort },
  { key: "dependents", label: "Covered Drivers & Dependents", hint: "Primary drivers, cleaner, or family members.", min: 1, max: 10, step: 1, format: (v) => `${v} persons` },
];

const scoreBand = (s: number) =>
  s >= 80 ? { label: "Optimal Cover · High Claim Safety", tone: "text-accent" } :
  s >= 60 ? { label: "Moderate Cover · Minor Gaps", tone: "text-accent" } :
  s >= 40 ? { label: "Underinsured · High Out-of-Pocket Risk", tone: "text-[oklch(var(--gold))]" } :
  { label: "Critical Vulnerability · High Claim Rejection Risk", tone: "text-destructive" };

export function FreedomScoreWidget() {
  const [inputs, setInputs] = useState<ScoreInputs>(defaultInputs);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const scriptUrl = import.meta.env.VITE_SITEBOT_SCRIPT_URL;
    const namespace = import.meta.env.VITE_SITEBOT_NAMESPACE;
    
    if (scriptUrl && namespace) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.setAttribute("data-namespace", namespace);
      script.async = true;
      document.head.appendChild(script);
      
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  const result = useMemo(() => calculateFreedomScore(inputs), [inputs]);
  const step = steps[stepIdx];
  const value = inputs[step.key] as number;

  const next = () => {
    if (stepIdx < steps.length - 1) setStepIdx((i) => i + 1);
    else setDone(true);
  };
  const reset = () => { setStepIdx(0); setDone(false); setInputs(defaultInputs); };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/15 via-transparent to-accent/5 blur-2xl" aria-hidden />
      
      <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        {/* Animated Border */}
        <motion.div
          className="absolute -inset-[100%] z-0 opacity-50"
          style={{
            background: "conic-gradient(from 0deg, transparent 0 280deg, oklch(var(--accent)) 360deg)"
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        />
        <div className="absolute inset-[1.5px] z-10 rounded-[calc(1.5rem-1.5px)] bg-card" />
        
        <div className="relative z-20 p-8 sm:p-12">
        {!done ? (
          <>
            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              <div className="inline-flex items-center gap-2">
                <Sparkles className="size-4 text-accent" /> NICE Insurance & Claim Readiness
              </div>
              <div className="tracking-wide">Step {stepIdx + 1} of {steps.length}</div>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
              <motion.div className="h-full bg-accent" initial={false} animate={{ width: `${((stepIdx + 1) / steps.length) * 100}%` }} transition={{ type: "spring", stiffness: 200, damping: 24 }} />
            </div>

            <div key={step.key} className="mt-10">
                <Label className="text-2xl font-semibold text-foreground tracking-tight">{step.label}</Label>
                <p className="mt-2 text-base text-muted-foreground">{step.hint}</p>
                {step.key === "dependents" || step.key === "age" ? (
                  <div className="mt-8">
                    <Slider min={step.min} max={step.max} step={step.step} value={[value]} onValueChange={([v]) => setInputs((s) => ({ ...s, [step.key]: v }))} className="py-4" />
                    <div className="mt-6 font-display text-5xl tracking-tight text-foreground">{step.format(value)}</div>
                  </div>
                ) : (
                  <div className="mt-8">
                    <div className="mb-6 font-display text-5xl tracking-tight text-foreground">{step.format(value)}</div>
                    <Slider className="py-4" min={step.min} max={step.max} step={step.step} value={[value]} onValueChange={([v]) => setInputs((s) => ({ ...s, [step.key]: v }))} />
                    <div className="mt-2 flex justify-between text-sm font-medium text-muted-foreground/60">
                      <span>{step.format(step.min)}</span>
                      <span>{step.format(step.max)}</span>
                    </div>
                  </div>
                )}
                <div className="mt-12 flex items-center justify-between">
                  <Button variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground" onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} disabled={stepIdx === 0}>Back</Button>
                  <div className="flex items-center gap-4">
                    {step.key === "emergencyFund" && (
                      <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                        <span>Insured?</span>
                        <Switch checked={inputs.hasInsurance} onCheckedChange={(v) => setInputs((s) => ({ ...s, hasInsurance: v }))} />
                      </div>
                    )}
                    <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={next}>
                      {stepIdx === steps.length - 1 ? "Reveal score" : "Next"} <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
            </div>
          </>
        ) : (
          <ResultPanel result={result} reset={reset} />
        )}
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ result, reset }: { result: ReturnType<typeof calculateFreedomScore>; reset: () => void }) {
  const band = scoreBand(result.score);
  const subs = [
    { label: "Claims Ready", v: result.subScores.retirementReadiness },
    { label: "Cashless Net", v: result.subScores.emergencyFund },
    { label: "Policy Depth", v: result.subScores.insuranceHealth },
    { label: "NCB Shield", v: result.subScores.investmentReadiness },
    { label: "Asset Buffer", v: result.subScores.wealthProjection },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Insurance & Claims Health Score</div>
          <div className="mt-1 font-display text-6xl font-semibold tracking-tight text-foreground">
            {result.score}<span className="text-xl text-muted-foreground">/100</span>
          </div>
          <div className={`mt-1 text-sm font-medium ${band.tone}`}>{band.label}</div>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={reset} aria-label="Recalculate"><RefreshCcw className="size-4" /></Button>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2">
        {subs.map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="h-16 w-full rounded bg-secondary relative overflow-hidden">
              <motion.div className="absolute inset-x-0 bottom-0 bg-accent" initial={{ height: 0 }} animate={{ height: `${s.v}%` }} transition={{ duration: 0.8, delay: 0.1 }} />
            </div>
            <div className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">{s.label}</div>
            <div className="text-xs font-semibold text-foreground">{s.v}%</div>
          </div>
        ))}
      </div>

      <div className="mt-5 h-40 rounded-lg border border-border bg-secondary/40 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={result.projection} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="nw" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#016d86" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#016d86" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="age" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatINRShort} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} width={50} />
            <Tooltip
              formatter={(v) => [formatINRShort(v as number), "Adequate Risk Cover"]}
              labelFormatter={(l) => `Age ${l}`}
              contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="netWorth" stroke="#016d86" strokeWidth={2} fill="url(#nw)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-4 space-y-1.5 text-sm">
        {result.insights.map((t, i) => (
          <li key={i} className="flex gap-2 text-foreground"><span className="text-accent">→</span>{t}</li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button asChild className="flex-1 bg-foreground text-background hover:bg-foreground/90"><Link to="/coach">Ask AI Claims Coach</Link></Button>
        <Button asChild variant="outline" className="flex-1"><Link to="/book">Request Claim Assistance</Link></Button>
      </div>
    </motion.div>
  );
}