import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/strategy")({
  head: () => ({
    meta: [
      { title: "NICE Claims OS · 10-Year Insurance Intelligence Vision" },
      { name: "description", content: "The Insurance & Claims Intelligence Platform strategy — Information Architecture, commercial fleet workflows, AI specs, and claim resolution roadmap." },
    ],
  }),
  component: StrategyPage,
});

const ROADMAP = [
  { stage: "Website & Claims Portal", desc: "Interactive, educational, conversion-led. The front door for commercial fleet operators and policyholders." },
  { stage: "Incident & Lead Intelligence", desc: "Every accident intake generates a structured incident dossier with severity score, policy clause check, and priority triage." },
  { stage: "Claims Desk Dashboard", desc: "Surveyor coordination cockpit, today's inspections, auto-generated talking points and IRDAI citations." },
  { stage: "Garage & Hospital TPA Network Sync", desc: "Two-way API sync with authorized cashless garages in Raipur/Bhilai and major TPA hospital desks." },
  { stage: "Policyholder Portal", desc: "Real-time claim status, stored RC/DL/policies, surveyor report audit, and secure direct chat." },
  { stage: "AI Accident & Survey Assistant", desc: "Instant photo damage assessment, parts depreciation estimator, and FIR/DDR checklist builder." },
  { stage: "Commercial Fleet Risk Engine", desc: "Bulk fleet telematics, IMT-23 endorsement audits, driver accident history, and bulk renewal optimization." },
  { stage: "NICE Claims OS", desc: "The operating system running independent claims advocacy across Central India — licensed to corporate fleets and brokers." },
];

const REVENUE = [
  { name: "Advisory AUM fee", who: "Retail families", note: "0.5–1.0% trail, fee-only, SEBI compliant." },
  { name: "Founder & HNI flat fee", who: "Business owners, HNIs", note: "₹1L–₹5L annual retainer with quarterly reviews." },
  { name: "Omega Plus (B2C SaaS)", who: "DIY investors", note: "₹399/mo — AI coach, portfolio analyzer, planning engine." },
  { name: "Omega for Advisors (B2B SaaS)", who: "Independent RIAs / MFDs", note: "₹7,500–₹25,000/mo per seat. White-label client portal." },
  { name: "AI Meeting & CRM add-ons", who: "Internal + B2B", note: "Per-minute or seat-based pricing for transcription + summaries." },
  { name: "Insurance & loan partner fees", who: "Curated panel", note: "Transparent, disclosed, optional — never tied to advice." },
];

const FUNNEL = [
  { step: "Awareness", channel: "SEO, founder content, WhatsApp shares", metric: "Unique visitors" },
  { step: "Activation", channel: "Freedom Score, AI Coach, calculators", metric: "Score completion rate" },
  { step: "Identification", channel: "Email gate on plan PDF, account sign-up", metric: "Account creation rate" },
  { step: "Qualification", channel: "Smart intake form, AI scoring", metric: "Lead score ≥70" },
  { step: "Conversion", channel: "Briefed advisor call → engagement letter", metric: "Call → client %" },
  { step: "Expansion", channel: "Annual review, family add-on, Omega Plus", metric: "Net revenue retention" },
];

const JOURNEYS = [
  { persona: "Aarav, 26 · First job", steps: ["Lands via 'How much SIP for ₹1 Cr' article", "Calculates Freedom Score in 90s", "Chats with AI Coach about ELSS vs PPF", "Downloads the starter plan PDF", "Books 30-min call when bonus arrives"] },
  { persona: "Anika & Rohan, 31 · Newly married", steps: ["Pick 'Newly Married' life stage", "Use home down-payment + child education calculators", "AI coach explains joint vs single insurance", "Smart intake captures both goals", "Joint advisor call within 48 hrs"] },
  { persona: "Priya, 39 · Founder", steps: ["Reads 'Founders & business owners' learning path", "Books HNI consult straight away", "Receives Monte-Carlo retirement plan", "Onboards via Omega client portal", "Quarterly portfolio review + AI meeting assistant"] },
  { persona: "Vikram, 55 · Pre-retirement", steps: ["Trust signals + advisor credentials seal the click", "Runs retirement planner with current corpus", "Gets glide-path PDF over email", "Books call, brings spouse", "Engages on 3-yr fee-only retainer"] },
];

function StrategyPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-foreground py-16 text-background">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-widest text-accent">Strategy · 10-year vision</div>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-6xl">The NICE Insurance & Claims Intelligence Ecosystem.</h1>
          <p className="mt-5 max-w-3xl text-lg text-background/80">From a trusted Raipur insurance agency to Central India's premier claims advocacy and fleet risk platform. This document covers the architecture, user journeys, AI specifications, and claims SaaS roadmap.</p>
        </div>
      </section>

      <Section title="01 · The shift" eyebrow="Why now">
        <p className="text-lg text-foreground/90">Over 30% of genuine commercial vehicle and health insurance claims face arbitrary deductions, surveyor delays, or technical repudiations. Fleet owners lose lakhs to vehicle downtime waiting for paperwork. NICE's ten years of on-ground claims expertise solves this by pairing deep regulatory know-how with an AI-native claims and policy audit platform that protects policyholders in seconds.</p>
      </Section>

      <Section title="02 · Information architecture" eyebrow="What lives where">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Home", "Freedom Score, life-stage picker, pillars"],
            ["AI Coach", "Conversational education, lead intent capture"],
            ["Goal Planning", "SIP, retirement, home, child calculators"],
            ["Learning Center", "AI-personalised paths + curated reads"],
            ["Stories", "Before / plan / today case studies"],
            ["Advisors", "Credentials, AUM, press, fee model"],
            ["Book", "4-step smart intake → briefed advisor"],
            ["Dashboard (auth)", "Saved scores, goals, conversations"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card p-5">
              <div className="font-display text-lg text-foreground">{k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="03 · User journeys" eyebrow="Four personas, one funnel">
        <div className="grid gap-4 md:grid-cols-2">
          {JOURNEYS.map((j) => (
            <div key={j.persona} className="rounded-xl border border-border bg-card p-6">
              <div className="font-display text-lg text-foreground">{j.persona}</div>
              <ol className="mt-3 space-y-2 text-sm text-foreground/90">
                {j.steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      <Section title="04 · AI specifications" eyebrow="What Gemini actually does">
        <ul className="space-y-3 text-foreground/90">
          {[
            "Coach — Gemini 3 Flash, system prompt locked to Indian context (SIP, ELSS, NPS, EPF, Sec 80C/80D). Streaming, with structured handoff when intent ≥0.7.",
            "Lead scoring — Each intake is scored 0–100 on timeline, specificity, and ticket-size signals. Generates a 2–3 sentence advisor brief.",
            "RAG layer (phase 2) — Embed Omega's plans, blogs, and SEBI circulars in pgvector. Coach cites Omega philosophy.",
            "Portfolio Analyzer (phase 3) — CAS upload → fund overlap, expense ratio audit, capital gains harvesting, rebalance plan.",
            "Meeting Assistant (phase 4) — Live transcription, compliance flags, action items synced to CRM.",
            "Content Generator (phase 5) — Personalised monthly review for every client, in their language.",
          ].map((s) => (
            <li key={s} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" /> <span>{s}</span></li>
          ))}
        </ul>
      </Section>

      <Section title="05 · SaaS roadmap" eyebrow="Website → Operating System">
        <div className="mx-auto max-w-3xl">
          {ROADMAP.map((r, i) => (
            <div key={r.stage}>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex size-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">{i + 1}</div>
                  <div className="font-display text-lg text-foreground">{r.stage}</div>
                </div>
                <div className="mt-2 pl-10 text-sm text-muted-foreground">{r.desc}</div>
              </div>
              {i < ROADMAP.length - 1 && (
                <div className="my-2 flex justify-center text-muted-foreground"><ArrowDown className="size-4" /></div>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="06 · Conversion funnel" eyebrow="Measure every step">
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="p-4">Step</th><th className="p-4">Channel / Surface</th><th className="p-4">North-star metric</th></tr>
            </thead>
            <tbody>
              {FUNNEL.map((f, i) => (
                <tr key={f.step} className={i ? "border-t border-border" : ""}>
                  <td className="p-4 font-medium text-foreground">{f.step}</td>
                  <td className="p-4 text-foreground/80">{f.channel}</td>
                  <td className="p-4 text-foreground/80">{f.metric}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="07 · Revenue model" eyebrow="Six streams, one brand">
        <div className="grid gap-4 md:grid-cols-2">
          {REVENUE.map((r) => (
            <div key={r.name} className="rounded-xl border border-border bg-card p-5">
              <div className="font-display text-lg text-foreground">{r.name}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-accent">{r.who}</div>
              <div className="mt-2 text-sm text-muted-foreground">{r.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="08 · Trust mechanisms" eyebrow="The currency of finance">
        <div className="grid gap-3 text-foreground/90 md:grid-cols-2">
          {[
            "SEBI registration and AMFI ARN visible site-wide.",
            "Fee-only positioning — zero commissions, disclosed conflicts.",
            "Real numbers, real names (with consent) in case studies.",
            "Every AI response labelled 'educational, not advice'.",
            "Press logos and bylines, not stock photography.",
            "ISO 27001 data practices and India-resident storage.",
          ].map((t) => (
            <div key={t} className="flex gap-3 rounded-xl border border-border bg-card p-4"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" /><span>{t}</span></div>
          ))}
        </div>
      </Section>

      <Section title="09 · Differentiation" eyebrow="Vs. roboadvisors & legacy MFDs">
        <ul className="space-y-2 text-foreground/90">
          <li>— Roboadvisors give you allocation. Omega gives you a coach and a human.</li>
          <li>— Legacy MFDs sell products. Omega sells outcomes, with no commission conflict.</li>
          <li>— DIY apps optimise for trading. Omega optimises for the 30-year goal.</li>
          <li>— Everyone shows charts. Omega shows your charts, in 90 seconds, before you pay anything.</li>
        </ul>
      </Section>

      <Section title="10 · The 10-year vision" eyebrow="What Omega becomes">
        <p className="text-lg text-foreground/90">By 2035, Omega is the default rail for advised wealth in India: a B2C brand serving 250k+ families, a B2B platform powering 2,000+ independent advisors, and an AI layer that turns every meeting, every plan, and every portfolio into compounding intelligence. The website you're reading today is step one of nine. Each subsequent step compounds the data, the trust, and the moat.</p>
      </Section>

      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl border border-border bg-foreground p-8 text-background">
          <div className="font-display text-2xl">This is the plan. Let's build it.</div>
          <p className="mt-2 text-background/80">The platform shipped today already executes phases 1–2. Phases 3–9 are sequenced as 90-day delivery sprints.</p>
        </div>
      </div>
    </div>
  );
}

function Section({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-xs font-medium uppercase tracking-widest text-accent">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}