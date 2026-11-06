import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Navigation } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2 space-y-3">
          <Link to="/" className="inline-flex items-center" aria-label="NICE — Network of Insurance & Claims Expert">
            <img
              src="/nice-logo.png"
              alt="NICE — Network of Insurance & Claims Expert"
              className="h-14 w-auto"
            />
          </Link>
          <p className="max-w-md text-sm text-muted-foreground">
            Central India's trusted claims resolution and commercial vehicle insurance expert. Protecting fleets, families, and businesses with transparent coverage and proactive on-ground settlement support.
          </p>
          <p className="text-xs text-muted-foreground">
            Founder & CEO: Rajeev Ranjan · Rated 4.7/5 across Central India
          </p>
          <div className="pt-1">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=21.2460758,81.6172476"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary hover:text-accent transition-colors"
            >
              <Navigation className="size-3.5 text-accent" /> Get Route Directions on Google Maps
            </a>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Solutions
          </div>
          <Link to="/coach" className="block text-foreground hover:text-accent">
            AI Claims Coach
          </Link>
          <Link to="/goals" className="block text-foreground hover:text-accent">
            Coverage Audit
          </Link>
          <Link to="/learn" className="block text-foreground hover:text-accent">
            Claims Guide & FIR Protocol
          </Link>
          <Link to="/strategy" className="block text-foreground hover:text-accent">
            Claims OS Platform Vision
          </Link>
        </div>
        <div className="space-y-2 text-sm">
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Company
          </div>
          <Link to="/advisors" className="block text-foreground hover:text-accent">
            About Rajeev Ranjan & Team
          </Link>
          <Link to="/stories" className="block text-foreground hover:text-accent">
            Settlement Case Studies
          </Link>
          <Link to="/book" className="block text-foreground hover:text-accent">
            Request Claim Assistance
          </Link>
          <Link to="/auth" className="block text-foreground hover:text-accent">
            Client Portal
          </Link>
        </div>
        <div className="space-y-4 text-sm">
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Raipur Hub & Reach Us
          </div>
          <div className="flex gap-2 text-foreground">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-accent" />
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=21.2460758,81.6172476"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent text-xs leading-relaxed"
            >
              Office No. 41, 2nd Floor, Bharat Mata Complex, Near Main Railway Station, Raipur HO, Chhattisgarh – 492001 (Branch: Samta Colony)
            </a>
          </div>
          <div className="flex gap-2 items-center text-foreground">
            <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
            <div className="flex flex-col text-xs">
              <a href="tel:+919771420518" className="hover:text-accent">
                +91 97714 20518
              </a>
              <a href="tel:+918047768119" className="hover:text-accent">
                +91 80477 68119
              </a>
            </div>
          </div>
          <div className="flex gap-2 items-center text-foreground">
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            <a href="mailto:care@niceinsurance.co.in" className="hover:text-accent text-xs">
              care@niceinsurance.co.in
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <p className="font-semibold text-foreground uppercase tracking-widest">
            NICE — Network of Insurance & Claims Expert
          </p>
          <div className="space-y-1 uppercase">
            <p>Commercial Fleet Insurance · Motor · Health & Group Mediclaim · Claims Dispute Advocacy</p>
            <p>Raipur Hub Coordinates: 21.2460758° N, 81.6172476° E</p>
            <p>IRDAI Licensed Partner Network · Direct Cashless TPA Tie-Ups</p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2 text-sm">
            <a href="https://www.niceinsurance.co.in/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Official Portal</a>
            <span className="text-border/60">|</span>
            <Link to="/book" className="hover:text-foreground transition-colors">Emergency Claims</Link>
            <span className="text-border/60">|</span>
            <Link to="/advisors" className="hover:text-foreground transition-colors">Ethics & Regulations</Link>
          </div>
          <p className="pt-2">Copyright © {new Date().getFullYear()} NICE (Network of Insurance & Claims Expert). All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
