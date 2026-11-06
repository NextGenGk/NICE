import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Award, MapPin, Phone, Users, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/advisors")({
  head: () => ({
    meta: [
      { title: "Our Experts & Claims Desk · NICE Insurance Raipur" },
      {
        name: "description",
        content:
          "Led by Rajeev Ranjan (Founder & CEO). Over a decade of dedicated insurance and claims resolution experience across Central India.",
      },
    ],
  }),
  component: AdvisorsPage,
});

const STATS = [
  { v: "₹18 Cr+", l: "Claims expedited & settled" },
  { v: "3,200+", l: "Commercial & motor policies serviced" },
  { v: "10+ yrs", l: "Claims dispute advocacy" },
  { v: "4.7/5", l: "Verified client satisfaction" },
];
const CREDS = [
  "Founder & CEO: Rajeev Ranjan (Insurance & Claims Specialist)",
  "Licensed General Insurance & Motor Fleet Advisory Network",
  "Authorized Cashless Garage & TPA Hospital Claim Escalations",
  "Dedicated Commercial Vehicle Survey Liaison Desk",
  "Strict adherence to IRDAI Protection of Policyholders' Regulations",
];
const HUBS = [
  "Bharat Mata Complex, 2nd Floor, Near Railway Station, Raipur",
  "Choubey Colony / Samta Colony, Raipur",
  "Bhilai - Durg Industrial Transport Corridor",
  "Direct On-Ground Central India Claims Survey Representation",
];

function AdvisorsPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-widest text-accent">Trust & Advocacy</div>
          <h1 className="mt-2 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            When claims get complicated, we stand firmly beside you.
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Insurance isn't just a certificate for the glovebox. It's a contract of protection. We ensure insurers honor their obligations with zero bureaucratic runaround.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-3xl text-foreground">{s.v}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <ShieldCheck className="size-5" />
            </div>
            <h2 className="mt-4 font-display text-2xl text-foreground">Credentials & Compliance</h2>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {CREDS.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <Award className="mt-0.5 size-4 text-accent" /> <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <MapPin className="size-5" />
            </div>
            <h2 className="mt-4 font-display text-2xl text-foreground">On-Ground Coverage</h2>
            <p className="mt-2 text-sm text-muted-foreground">Serving policyholders & fleet owners across Chhattisgarh.</p>
            <div className="mt-5 space-y-2.5">
              {HUBS.map((p) => (
                <div key={p} className="flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-3 text-sm font-medium text-foreground">
                  <CheckCircle className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOUNDER CARD */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent font-display text-2xl font-bold">
              RR
            </div>
            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Leadership & Founder</div>
              <h3 className="font-display text-2xl font-bold text-foreground">Rajeev Ranjan</h3>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Founder & CEO of NICE (Network of Insurance & Claims Expert). Over a decade guiding commercial fleets, business owners, and families through nuanced motor, health, and general insurance policies with a primary focus on fast, transparent claim resolution.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Phone className="size-3.5 text-accent" /> +91 97714 20518</span>
                <span className="flex items-center gap-1.5"><MapPin className="size-3.5 text-accent" /> Raipur, Chhattisgarh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-foreground p-8 text-background">
          <h3 className="font-display text-2xl">Facing a disputed claim or need a policy audit?</h3>
          <p className="mt-2 text-background/80">Walk in to our Raipur office or book a direct claim consultation online.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/book">Request Free Claim Assessment</Link>
            </Button>
            <Button asChild variant="outline" className="border-background/30 text-background hover:bg-background/10">
              <a href="https://www.google.com/maps/dir/?api=1&destination=21.2460758,81.6172476" target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-1.5 size-4" /> Get Directions to Raipur Desk
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}