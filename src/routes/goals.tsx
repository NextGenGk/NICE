import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatINR, formatINRShort } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Coverage & Policy Target Engine · NICE Insurance Raipur" },
      {
        name: "description",
        content:
          "Plan adequate insurance coverage, commercial fleet replacement reserves, and emergency health buffers modelled in INR with inflation.",
      },
      { property: "og:title", content: "Coverage & Policy Target Engine — NICE Insurance" },
      { property: "og:description", content: "Calculate insurance protection targets, vehicle replacement corpus, and emergency medical buffers." },
    ],
  }),
  component: GoalsPage,
});

function project(monthly: number, years: number, returnPct: number, lumpsum = 0) {
  const r = returnPct / 100 / 12;
  const n = years * 12;
  const data: { year: number; value: number }[] = [];
  let v = lumpsum;
  for (let y = 0; y <= years; y++) {
    data.push({ year: y, value: Math.round(v) });
    v = v * Math.pow(1 + r, 12) + monthly * ((Math.pow(1 + r, 12) - 1) / r);
  }
  return data;
}

function GoalsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-widest text-accent">Goal Planning Engine</div>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">Pick a goal. See the path. Adjust live.</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Every calculator is India-aware: inflation-adjusted, INR-native, and modelled with realistic equity returns.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Tabs defaultValue="sip">
          <TabsList>
            <TabsTrigger value="sip">SIP target</TabsTrigger>
            <TabsTrigger value="retire">Retirement</TabsTrigger>
            <TabsTrigger value="home">Home down payment</TabsTrigger>
            <TabsTrigger value="child">Child education</TabsTrigger>
          </TabsList>
          <TabsContent value="sip" className="mt-6"><SipPlanner /></TabsContent>
          <TabsContent value="retire" className="mt-6"><RetirementPlanner /></TabsContent>
          <TabsContent value="home" className="mt-6"><HomePlanner /></TabsContent>
          <TabsContent value="child" className="mt-6"><ChildPlanner /></TabsContent>
        </Tabs>

        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
          <h3 className="font-display text-2xl text-foreground">Got a number? Now make it personal.</h3>
          <p className="mt-2 text-muted-foreground">Talk to the AI coach about asset allocation, or book a SEBI advisor for a full plan.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-foreground text-background hover:bg-foreground/90"><Link to="/coach">Talk to coach</Link></Button>
            <Button asChild variant="outline"><Link to="/book">Book free call</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PlannerShell({ title, controls, summary, projection }: { title: string; controls: React.ReactNode; summary: React.ReactNode; projection: { year: number; value: number }[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-5 rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display text-xl text-foreground">{title}</h3>
        {controls}
      </div>
      <div className="lg:col-span-3 space-y-4 rounded-2xl border border-border bg-card p-6">
        {summary}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={projection}>
              <defs>
                <linearGradient id="gp" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#016d86" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#016d86" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" tickFormatter={(v) => `Y${v}`} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatINRShort} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} width={56} />
              <Tooltip formatter={(v) => [formatINR(v as number), "Corpus"]} labelFormatter={(l) => `Year ${l}`} contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#016d86" strokeWidth={2} fill="url(#gp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function NumberControl({ label, value, set, min, max, step, format }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; format: (n: number) => string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Label className="text-sm">{label}</Label>
        <div className="font-display text-lg text-foreground">{format(value)}</div>
      </div>
      <Slider className="mt-2" min={min} max={max} step={step} value={[value]} onValueChange={([v]) => set(v)} />
    </div>
  );
}

function SipPlanner() {
  const [monthly, setMonthly] = useState(20000);
  const [years, setYears] = useState(15);
  const [ret, setRet] = useState(12);
  const data = useMemo(() => project(monthly, years, ret), [monthly, years, ret]);
  const final = data[data.length - 1].value;
  const invested = monthly * years * 12;
  return (
    <PlannerShell
      title="What will my SIP grow into?"
      controls={
        <>
          <NumberControl label="Monthly SIP" value={monthly} set={setMonthly} min={500} max={500000} step={500} format={formatINRShort} />
          <NumberControl label="Years" value={years} set={setYears} min={1} max={40} step={1} format={(v) => `${v} yr`} />
          <NumberControl label="Expected return" value={ret} set={setRet} min={4} max={18} step={0.5} format={(v) => `${v}%`} />
        </>
      }
      summary={
        <div className="grid grid-cols-3 gap-4">
          <Kpi label="Invested" v={formatINR(invested)} />
          <Kpi label="Final corpus" v={formatINR(final)} accent />
          <Kpi label="Wealth gained" v={formatINR(final - invested)} />
        </div>
      }
      projection={data}
    />
  );
}

function RetirementPlanner() {
  const [age, setAge] = useState(32);
  const [retireAt, setRetireAt] = useState(60);
  const [expense, setExpense] = useState(60000);
  const [current, setCurrent] = useState(500000);
  const [monthly, setMonthly] = useState(20000);
  const years = Math.max(retireAt - age, 1);
  const data = useMemo(() => project(monthly, years, 11, current), [monthly, years, current]);
  const corpus = data[data.length - 1].value;
  const targetMonthly = expense * Math.pow(1.06, years);
  const target = targetMonthly * 12 * 25;
  const gap = Math.max(target - corpus, 0);
  return (
    <PlannerShell
      title="Will I have enough to retire?"
      controls={
        <>
          <NumberControl label="Current age" value={age} set={setAge} min={20} max={59} step={1} format={(v) => `${v}`} />
          <NumberControl label="Retire at" value={retireAt} set={setRetireAt} min={age + 1} max={70} step={1} format={(v) => `${v}`} />
          <NumberControl label="Today's monthly expenses" value={expense} set={setExpense} min={10000} max={500000} step={2000} format={formatINRShort} />
          <NumberControl label="Current investments" value={current} set={setCurrent} min={0} max={50000000} step={50000} format={formatINRShort} />
          <NumberControl label="Monthly SIP" value={monthly} set={setMonthly} min={0} max={500000} step={1000} format={formatINRShort} />
        </>
      }
      summary={
        <div className="grid grid-cols-3 gap-4">
          <Kpi label={`Corpus at ${retireAt}`} v={formatINR(corpus)} accent />
          <Kpi label="Required corpus" v={formatINR(target)} />
          <Kpi label="Gap" v={gap > 0 ? formatINR(gap) : "Funded ✓"} />
        </div>
      }
      projection={data}
    />
  );
}

function HomePlanner() {
  const [price, setPrice] = useState(15000000);
  const [years, setYears] = useState(6);
  const downPct = 20;
  const target = price * (downPct / 100);
  const r = 0.10 / 12;
  const n = years * 12;
  const monthly = Math.round((target * r) / (Math.pow(1 + r, n) - 1));
  const data = useMemo(() => project(monthly, years, 10), [monthly, years]);
  return (
    <PlannerShell
      title="How do I save for the down payment?"
      controls={
        <>
          <NumberControl label="Home price" value={price} set={setPrice} min={1000000} max={100000000} step={100000} format={formatINRShort} />
          <NumberControl label="Years to buy" value={years} set={setYears} min={1} max={20} step={1} format={(v) => `${v} yr`} />
          <div className="text-xs text-muted-foreground">Assumes 20% down payment, 10% return on a balanced fund.</div>
        </>
      }
      summary={
        <div className="grid grid-cols-3 gap-4">
          <Kpi label="Down payment" v={formatINR(target)} />
          <Kpi label="Required monthly SIP" v={formatINR(monthly)} accent />
          <Kpi label="Total invested" v={formatINR(monthly * 12 * years)} />
        </div>
      }
      projection={data}
    />
  );
}

function ChildPlanner() {
  const [childAge, setChildAge] = useState(4);
  const [collegeAge, setCollegeAge] = useState(18);
  const [todayCost, setTodayCost] = useState(2500000);
  const years = Math.max(collegeAge - childAge, 1);
  const target = todayCost * Math.pow(1.08, years);
  const r = 0.12 / 12;
  const n = years * 12;
  const monthly = Math.round((target * r) / (Math.pow(1 + r, n) - 1));
  const data = useMemo(() => project(monthly, years, 12), [monthly, years]);
  return (
    <PlannerShell
      title="How do I fund my child's education?"
      controls={
        <>
          <NumberControl label="Child's age today" value={childAge} set={setChildAge} min={0} max={17} step={1} format={(v) => `${v}`} />
          <NumberControl label="College starts at" value={collegeAge} set={setCollegeAge} min={childAge + 1} max={22} step={1} format={(v) => `${v}`} />
          <NumberControl label="Today's cost of education" value={todayCost} set={setTodayCost} min={500000} max={50000000} step={100000} format={formatINRShort} />
          <div className="text-xs text-muted-foreground">Assumes 8% education inflation and 12% equity return.</div>
        </>
      }
      summary={
        <div className="grid grid-cols-3 gap-4">
          <Kpi label={`Cost in ${years} yrs`} v={formatINR(Math.round(target))} />
          <Kpi label="Required SIP" v={formatINR(monthly)} accent />
          <Kpi label="Years to invest" v={`${years}`} />
        </div>
      }
      projection={data}
    />
  );
}

function Kpi({ label, v, accent }: { label: string; v: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-2xl ${accent ? "text-accent" : "text-foreground"}`}>{v}</div>
    </div>
  );
}