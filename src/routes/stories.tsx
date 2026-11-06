import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Quote, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Claim Settlement Case Studies · NICE Insurance Raipur" },
      {
        name: "description",
        content:
          "Real claim settlement stories across Chhattisgarh. Disputed claims overturned, fleet accident recoveries, and cashless hospitalizations resolved.",
      },
    ],
  }),
  component: StoriesPage,
});

const STORIES = [
  {
    name: "Ramesh Transport",
    stage: "Fleet Operator · 18 Heavy Commercial Tippers",
    before: "Tipper overturned near Bilaspur bypass. Insurer repudiated ₹7.2 Lakh claim claiming delayed intimating and overloading suspicion.",
    plan: "NICE took over surveyor liaison, audited loading toll data, submitted weighbridge receipts, and cited IRDAI circular on genuine claims.",
    today: "Full ₹6.85 Lakh cashless claim sanctioned directly to authorized workshop. Vehicle back on highway in 14 days.",
    metric: "₹6.85L",
    metricLabel: "recovered after denial",
  },
  {
    name: "Dr. Alok Verma",
    stage: "Senior Physician · Private SUV & Health Policies",
    before: "Car met with an accident due to highway animal crossing. Local surveyor applied 40% depreciation on fiber & metal components.",
    plan: "NICE audited the policy schedule, highlighted active Zero-Depreciation and Consumables endorsements, and requested re-inspection.",
    today: "Depreciation deduction reduced to ₹0. Settled with zero out-of-pocket expenses except standard ₹1,000 compulsory deductible.",
    metric: "100%",
    metricLabel: "parts cost covered",
  },
  {
    name: "Sharma Family",
    stage: "Raipur · Cardiac Emergency Hospitalization",
    before: "TPA denied cashless admission citing lack of pre-existing condition records, forcing cash deposit of ₹2.5 Lakh.",
    plan: "NICE emergency claims desk coordinated with treating cardiologist in Raipur and escalated medical logs directly to the insurer head office.",
    today: "Cashless approval granted within 4 hours. Final hospital discharge completed with zero deposit deduction.",
    metric: "4 hrs",
    metricLabel: "cashless re-approval",
  },
];

function StoriesPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-widest text-accent">Success stories</div>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">Real families. Real numbers. Real peace of mind.</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Names and a few details are changed for privacy. The plans and outcomes are real.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s) => (
            <article key={s.name} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <Quote className="size-6 text-accent" />
              <div className="mt-4">
                <div className="font-display text-xl text-foreground">{s.name}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.stage}</div>
              </div>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Before</dt>
                  <dd className="mt-1 text-foreground/90">{s.before}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">The plan</dt>
                  <dd className="mt-1 text-foreground/90">{s.plan}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Today</dt>
                  <dd className="mt-1 text-foreground/90">{s.today}</dd>
                </div>
              </dl>
              <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <div className="font-display text-3xl text-accent">{s.metric}</div>
                  <div className="text-xs text-muted-foreground">{s.metricLabel}</div>
                </div>
                <TrendingUp className="size-5 text-accent" />
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild className="bg-foreground text-background hover:bg-foreground/90"><Link to="/book">Start your story</Link></Button>
        </div>
      </section>
    </div>
  );
}