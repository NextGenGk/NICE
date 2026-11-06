import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Truck, Car, HeartPulse, Building2, ShieldAlert, Users, Bus, FileCheck } from "lucide-react";

const stages = [
  {
    id: "fleet",
    label: "Fleet Operator",
    icon: Truck,
    focus: "Protect Commercial Vehicles & Zero Downtime",
    priorities: [
      "Comprehensive fleet cover with IMT-23 endorsement for high-risk equipment",
      "Immediate accident spot survey & towing coordination to prevent demurrage",
      "Bulk renewal optimization across multi-axle trucks, tippers, and trailers",
    ],
    cta: "Audit My Fleet Policy",
  },
  {
    id: "car_owner",
    label: "Private Car Owner",
    icon: Car,
    focus: "Zero-Depreciation & Hassle-Free Cashless Claims",
    priorities: [
      "Bumper-to-bumper zero dep cover with return to invoice (RTI) protection",
      "Engine & gearbox protection add-on for water-logging / hydrostatic lock",
      "NCB (No Claim Bonus) protection shield to preserve up to 50% discount",
    ],
    cta: "Check Car Policy Health",
  },
  {
    id: "family_health",
    label: "Family Health",
    icon: HeartPulse,
    focus: "Medical Inflation Hedge & Cashless Hospitalization",
    priorities: [
      "Base cover ₹10L–₹25L + high-deductible super top-up for ₹1 Crore total shield",
      "Pre-existing disease (PED) reduction rider to 1–2 years",
      "Pre-authorized cashless admission desk assistance in Raipur & nationwide",
    ],
    cta: "Plan Family Mediclaim",
  },
  {
    id: "transporter",
    label: "Transporter / Logistics",
    icon: ShieldAlert,
    focus: "Cargo & Transit Risk Management",
    priorities: [
      "Marine cargo open policy for inter-state highway freight",
      "Third-party liability protection against catastrophic road accidents",
      "Rapid claim settlement documentation support for damaged consignments",
    ],
    cta: "Secure Highway Cargo",
  },
  {
    id: "sme_business",
    label: "SME & Factory",
    icon: Building2,
    focus: "Asset, Stock & Plant Machinery Protection",
    priorities: [
      "Bharat Sookshma / Laghu Udyam Suraksha fire & explosion policies",
      "Workmen's Compensation (WC) cover under the Employee's Compensation Act",
      "Machinery breakdown insurance with quick surveyor dispatch",
    ],
    cta: "Audit Business Risks",
  },
  {
    id: "taxi_cab",
    label: "Commercial Cab/Bus",
    icon: Bus,
    focus: "Passenger Safety & Commercial Legal Compliance",
    priorities: [
      "Passenger carrying commercial vehicle (PCV) permit-compliant policies",
      "Paid driver & cleaner legal liability endorsements",
      "Prompt third-party claim legal defense and settlement support",
    ],
    cta: "Insure Commercial Cab",
  },
  {
    id: "senior_health",
    label: "Senior Citizen",
    icon: Users,
    focus: "Comprehensive Geriatric Care Without Co-Pay",
    priorities: [
      "Policies without mandatory 20% co-payment clauses on hospital bills",
      "Coverage for modern treatments, robotic surgeries, and day-care procedures",
      "Dedicated claims coordinator to handle TPA paperwork",
    ],
    cta: "Explore Senior Plans",
  },
  {
    id: "claim_dispute",
    label: "Disputed Claims",
    icon: FileCheck,
    focus: "Overturn Unfair Rejections & Settle Pending Dues",
    priorities: [
      "Technical audit of insurer rejection letter vs IRDAI master guidelines",
      "Re-filing with substantiated surveyor evidence and garage assessments",
      "Insurance Ombudsman escalation if insurer acts unlawfully",
    ],
    cta: "Get Claim Rejection Help",
  },
] as const;

export function LifeStage() {
  const [active, setActive] = useState<(typeof stages)[number]["id"]>("fleet");
  const stage = stages.find((s) => s.id === active)!;
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
        {stages.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`group relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                isActive
                  ? "border-accent bg-card shadow-md"
                  : "border-border bg-card/50 hover:border-foreground/30 hover:bg-card"
              }`}
            >
              <Icon
                className={`size-6 transition-colors ${
                  isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
      <div>
        <div
          key={stage.id}
          className="mt-8 grid gap-6 rounded-2xl border border-border bg-card p-6 md:grid-cols-3 md:p-10"
        >
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {stage.label} · Core Focus
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground">{stage.focus}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Every vehicle, fleet, and policyholder has unique risk profiles. NICE tailors your policy clauses to prevent rejections before accidents happen.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                to="/coach"
                className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90"
              >
                Ask Claims AI
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {stage.cta}
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              NICE Recommended Action Protocol
            </div>
            <ul className="mt-3 space-y-3">
              {stage.priorities.map((p, i) => (
                <li key={i} className="flex gap-3 rounded-lg border border-border bg-secondary/40 p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}