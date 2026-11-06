import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Sparkles, Truck, Car, HeartPulse, ShieldAlert, FileCheck, Building2 } from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Claims & Insurance Knowledge Desk · NICE Raipur" },
      { name: "description", content: "Expert guides on motor claims, commercial fleet insurance, zero depreciation, and fighting claim rejections." },
    ],
  }),
  component: LearnPage,
});

const PATHS = [
  { icon: Truck, title: "Commercial Fleet & Tipper Protection", time: "6 lessons · 20 min", desc: "IMT-23 endorsement, multi-axle vehicle risks, bulk fleet premium reduction, and avoiding demurrage." },
  { icon: Car, title: "Zero Dep & Private Motor Masterclass", time: "5 lessons · 18 min", desc: "Bumper-to-bumper vs comprehensive, engine protector, consumables, and protecting 50% NCB." },
  { icon: HeartPulse, title: "Cashless Health & Mediclaim Guide", time: "7 lessons · 25 min", desc: "TPA admission pre-authorizations, fighting room rent caps, co-pay traps, and super top-ups." },
  { icon: FileCheck, title: "Accident Claims & Surveyor Protocol", time: "6 lessons · 22 min", desc: "What to document at the spot, FIR necessity vs police DDR, surveyor rights, and IRDAI rules." },
  { icon: ShieldAlert, title: "Overturning Rejected Insurance Claims", time: "5 lessons · 20 min", desc: "Audit rejection reasons, technical appeal drafting, and escalation to the Insurance Ombudsman." },
  { icon: Building2, title: "Factory, Fire & Transit Liability", time: "6 lessons · 24 min", desc: "Bharat Sookshma Udyam, marine transit cargo policies, and workmen compensation liabilities." },
];

const ARTICLES = [
  { tag: "Accident", title: "Immediate 5 steps to take at the accident spot before calling your insurer", time: "4 min" },
  { tag: "Motor", title: "Why an insurer cannot reject your claim merely for delayed notice (Supreme Court ruling)", time: "5 min" },
  { tag: "Health", title: "How to eliminate out-of-pocket deductions on hospital bills", time: "6 min" },
  { tag: "Fleet", title: "IMT-23 Explained: Why every tipper and excavator owner needs it", time: "5 min" },
  { tag: "Legal", title: "IRDAI turnaround times: What surveyors must comply with", time: "4 min" },
  { tag: "Renewal", title: "How to retain 50% NCB even when transferring to a new car", time: "5 min" },
];

function LearnPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-widest text-accent">Claims & Insurance Desk</div>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">Know your policy rights. Settle claims with confidence.</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Practical, battle-tested guidance from NICE insurance experts based in Raipur, Chhattisgarh.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl text-foreground">Knowledge Paths</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PATHS.map(({ icon: Icon, title, time, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><Icon className="size-5" /></div>
              <div className="mt-4 font-display text-lg text-foreground">{title}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{time}</div>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
              <Link to="/coach" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">Ask AI about this →</Link>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl text-foreground">Featured Claims Advisory Reads</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {ARTICLES.map((a) => (
            <Link key={a.title} to="/coach" className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent">
              <div className="inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-foreground"><BookOpen className="size-4" /></div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium uppercase tracking-widest text-accent">{a.tag}</div>
                <div className="truncate text-sm text-foreground">{a.title}</div>
              </div>
              <div className="text-xs text-muted-foreground">{a.time}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}