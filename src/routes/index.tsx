import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { FreedomScoreWidget } from "@/components/home/freedom-score";
import { LifeStage } from "@/components/home/life-stage";
import { GoogleMapSection } from "@/components/home/google-map-section";
import {
  ArrowRight,
  Target,
  BookOpen,
  ShieldCheck,
  Truck,
  HeartHandshake,
  TrendingUp,
  Quote,
  Play,
  FileCheck2,
  MessageSquareHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NICE — Network of Insurance & Claims Expert | Raipur, Chhattisgarh" },
      {
        name: "description",
        content:
          "Commercial vehicle fleet insurance, motor, health, and 24/7 claim settlement advocacy led by Rajeev Ranjan in Raipur, CG.",
      },
      { property: "og:title", content: "NICE — Network of Insurance & Claims Expert" },
      {
        property: "og:description",
        content:
          "Raipur's premier insurance and claims consultancy. Commercial fleet, motor, health insurance, and hassle-free claim settlement support.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videos = [
    { id: "9GuE_W0jtFQ", name: "Suresh Agrawal", desc: "Fleet Owner (Raipur)" },
    { id: "hcHdQJ_mxR0", name: "Dr. Alok Verma", desc: "Private Car & Health Policyholder" },
    { id: "L8ighdgtGOg", name: "Mahesh Dewangan", desc: "Logistics Contractor" },
  ];
  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(0.495_0.091_221_/_0.12),transparent_70%)]"
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-24">
          <div className="flex flex-col justify-center">
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Protect what moves you. <span className="italic text-accent">Settle claims without stress.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Central India's trusted insurance & claims expert. Audit your policy in 90 seconds and get hassle-free claim settlements backed by our Raipur team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Link to="/coach">
                  Ask AI Claims Coach <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/book">Request Claim Help</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              <Stat n="4.7 / 5" l="verified client rating" />
              <Stat n="10+ yrs" l="claims expertise" />
              <Stat n="Raipur, CG" l="central claims desk" />
            </dl>
          </div>
          <div className="lg:pl-6">
            <FreedomScoreWidget />
          </div>
        </div>
      </section>

      {/* LIFE STAGE */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="Specialized Coverage Profiles"
            title="The right insurance protection depends on what you run."
            sub="From commercial multi-axle fleets and logistics trailers to family mediclaim, choose your profile to see key clauses and claim safeguards."
          />
          <div className="mt-10">
            <LifeStage />
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="Three Pillars of Protection"
            title="Complete insurance lifecycle, handled for you."
            sub="Audit coverage, consult our 24/7 claims intelligence coach, or let our Raipur specialists resolve disputed claims on-ground."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <PillarCard
              icon={Truck}
              title="Commercial Fleet & Motor"
              body="End-to-end policies for trucks, tippers, buses, and private cars. Zero-depreciation, engine protector, RTI, and high third-party liability endorsements."
              linkLabel="Audit motor policy"
              to="/goals"
              examples={[
                "Commercial Goods Vehicles & Tippers",
                "Private Car & Zero-Dep Cover",
                "Instant Cashless Garage Coordination",
              ]}
            />
            <PillarCard
              icon={HeartHandshake}
              title="AI Claims & Policy Coach"
              body="Got into an accident or facing a hospital claim rejection? Ask our AI expert for immediate FIR checklists, surveyor requirements, and rights under IRDAI regulations."
              linkLabel="Talk to AI Coach"
              to="/coach"
              examples={[
                "Accident survey documentation list",
                "How to dispute a rejected cashless claim",
                "Which add-ons are mandatory for fleet insurance?",
              ]}
            />
            <PillarCard
              icon={FileCheck2}
              title="Raipur Claims Desk"
              body="Led by Rajeev Ranjan. We represent policyholders directly before insurance surveyors, TPAs, and ombudsman desks for maximum settlement recovery."
              linkLabel="Submit a claim file"
              to="/book"
              examples={[
                "On-ground survey representation",
                "Overturning partial claim deductions",
                "Raipur walk-in desk: Bharat Mata Complex",
              ]}
            />
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="Real Settlements"
            title="Claims resolved. Downtime saved."
            sub="A snapshot of actual policyholder claim challenges navigated by NICE experts across Chhattisgarh."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "Ramesh Transport · Raipur",
                before: "Tipper accident claim rejected for delay",
                after: "₹6.8 Lakh claim fully approved in 11 days",
                q: "The insurer tried to deny claim on technical notice delay. NICE audited the timeline, submitted IRDAI circulars, and got full cashless settlement.",
              },
              {
                name: "Dr. P. Sharma · Samta Colony",
                before: "35% co-pay deduction on emergency surgery",
                after: "₹3.4 Lakh reimbursed without unlawful cuts",
                q: "NICE audited the hospital bill against policy T&C and proved the TPA had applied outdated deduction caps. Every rupee recovered.",
              },
              {
                name: "Vikram Logistics · Bhilai Corridor",
                before: "Fleet policies uncoordinated across 4 insurers",
                after: "Consolidated fleet with IMT-23 & 18% premium savings",
                q: "Rajeev ji's team restructured our 22-vehicle fleet cover with bulk zero-dep add-ons. Our vehicle downtime dropped by over 40%.",
              },
            ].map((s) => (
              <article key={s.name} className="rounded-2xl border border-border bg-card p-6">
                <TrendingUp className="size-5 text-accent" />
                <p className="mt-3 font-display text-lg leading-snug text-foreground">"{s.q}"</p>
                <div className="mt-5 space-y-1 text-sm">
                  <div className="text-muted-foreground">
                    <span className="font-medium text-foreground">Challenge:</span> {s.before}
                  </div>
                  <div className="text-muted-foreground">
                    <span className="font-medium text-accent">Outcome:</span> {s.after}
                  </div>
                </div>
                <div className="mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {s.name}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/stories">View more case studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GOOGLE MAPS SECTION */}
      <GoogleMapSection />

      {/* PARTNERS */}
      <section className="border-t border-border bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead
            eyebrow="Our Insurer Network"
            title="Partnered with India's highest settlement ratio insurers."
            sub="We compare policies and coordinate cashless settlements across the nation's premier insurance carriers."
          />
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { src: "/partners/hdfcergo.png", name: "HDFC ERGO General" },
              { src: "/partners/bajaj.png", name: "Bajaj Allianz" },
              { src: "/partners/icicipru.png", name: "ICICI Prudential / Lombard" },
              { src: "/partners/niva.png", name: "Niva Bupa Health" },
              { src: "/partners/adityahealth.png", name: "Aditya Birla Health" },
              { src: "/partners/hdfclife.png", name: "HDFC Life" },
              { src: "/partners/sbi.png", name: "SBI General Insurance" },
              { src: "/partners/pnb.png", name: "PNB MetLife" },
              { src: "/partners/kotak.png", name: "Kotak Mahindra General" },
              { src: "/partners/mahindra.png", name: "Mahindra Insurance" },
              { src: "/partners/canara.png", name: "Canara Robeco" },
              { src: "/partners/dsp.png", name: "DSP Group" },
            ].map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2">
                <div className="flex h-24 w-full items-center justify-center rounded-lg border border-border bg-card px-4">
                  <img
                    src={p.src}
                    alt={p.name}
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                </div>
                <span className="text-center text-xs text-muted-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHead
                eyebrow="Knowledge & Claim Rights"
                title="Understand your policy — before an emergency strikes."
                sub="Short, practical guides on accident spot procedures, zero depreciation riders, TPA cashless pre-approvals, and fighting unfair deductions."
                align="left"
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                  <Link to="/learn">
                    <BookOpen className="mr-1 size-4" /> Open Claims Learning Desk
                  </Link>
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "What to do within 2 hours of a vehicle accident", m: "4 min read" },
                { t: "Zero Dep vs Comprehensive: Real difference in claim payout", m: "6 min read" },
                { t: "How to overturn a cashless health claim rejection", m: "5 min read" },
                { t: "IMT-23 endorsement explained for commercial tippers", m: "7 min read" },
              ].map((l) => (
                <li key={l.t} className="rounded-xl border border-border bg-card p-4">
                  <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Guide · {l.m}
                  </div>
                  <div className="mt-1 font-display text-lg text-foreground">{l.t}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-b from-secondary/40 to-background py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Facing an insurance dispute or renewal?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Connect with our Raipur desk or speak with Rajeev Ranjan. We evaluate policy clauses and represent your claims with zero upfront fee.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/book">Request Free Claim Assessment</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/coach">Ask AI Claims Coach First</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <dt className="font-display text-2xl text-foreground">{n}</dt>
      <dd className="text-xs text-muted-foreground">{l}</dd>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub: string;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`${a} max-w-3xl`}>
      <div className="text-xs font-medium uppercase tracking-widest text-accent">{eyebrow}</div>
      <h2 className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-lg text-muted-foreground">{sub}</p>
    </div>
  );
}

function PillarCard({
  icon: Icon,
  title,
  body,
  examples,
  linkLabel,
  to,
}: {
  icon: typeof MessageSquareHeart;
  title: string;
  body: string;
  examples: string[];
  linkLabel: string;
  to: "/coach" | "/goals" | "/book";
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <Icon className="size-6 text-accent" />
      <h3 className="mt-4 font-display text-2xl text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <ul className="mt-4 space-y-1.5">
        {examples.map((e) => (
          <li key={e} className="rounded-md bg-secondary/60 px-3 py-2 text-xs text-foreground">
            {e}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent"
        >
          {linkLabel} <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
