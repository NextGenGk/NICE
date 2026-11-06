import { MapPin, Navigation, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GoogleMapSection() {
  const destinationCoords = "21.2460758,81.6172476";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationCoords}`;
  const embedUrl = `https://maps.google.com/maps?q=${destinationCoords}&hl=en&z=15&output=embed`;

  return (
    <section className="border-t border-border bg-secondary/30 py-20" id="location">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent">
            <MapPin className="size-3.5" /> On-Ground Presence
          </div>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Visit Our Central India Claims Desk in Raipur
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Direct walk-in assistance for motor claims surveys, commercial fleet audits, and fast-track dispute settlement.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-stretch">
          {/* MAP EMBED */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:col-span-7 h-[420px] lg:h-auto min-h-[380px] relative">
            <iframe
              title="NICE Insurance Raipur Location"
              src={embedUrl}
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-border text-xs font-semibold shadow">
              <span className="flex items-center gap-1.5 text-foreground">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> NICE Raipur Desk (21.2460° N, 81.6172° E)
              </span>
            </div>
          </div>

          {/* DETAILS CARD */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-5 space-y-6">
            <div>
              <img
                src="/nice-logo.png"
                alt="NICE — Network of Insurance & Claims Expert"
                className="h-12 w-auto"
              />

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 shrink-0 text-accent mt-0.5" />
                  <div>
                    <strong className="block text-foreground">Head Office (Raipur):</strong>
                    <span className="text-muted-foreground leading-relaxed">
                      Office No. 41, 2nd Floor, Bharat Mata Complex, Near Main Railway Station, Raipur HO, Chhattisgarh – 492001
                    </span>
                    <span className="block mt-1 text-xs text-muted-foreground">
                      Associate Branch: House No. C-108, Near Life Worth Hospital, Samta Colony / Choubey Colony, Raipur.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="size-5 shrink-0 text-accent mt-0.5" />
                  <div>
                    <strong className="block text-foreground">Helpline & Claims Assistance:</strong>
                    <div className="space-y-0.5 mt-0.5">
                      <a href="tel:+919771420518" className="block text-foreground hover:text-accent font-medium">
                        +91 97714 20518 <span className="text-xs text-muted-foreground">(Direct/WhatsApp)</span>
                      </a>
                      <a href="tel:+918047768119" className="block text-foreground hover:text-accent font-medium">
                        +91 80477 68119 <span className="text-xs text-muted-foreground">(Support Desk)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="size-5 shrink-0 text-accent mt-0.5" />
                  <div>
                    <strong className="block text-foreground">Operating Hours:</strong>
                    <p className="text-muted-foreground">Monday – Saturday: 9:30 AM – 7:30 PM</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                      24/7 On-Call Accident Claims Emergency Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="mr-2 size-4" /> Get Directions on Google Maps
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full">
                <a href="https://www.niceinsurance.co.in/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 size-4" /> Visit niceinsurance.co.in
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

