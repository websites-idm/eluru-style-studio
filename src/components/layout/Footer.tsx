import { Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer id="visit" className="mt-24 border-t border-border bg-background md:mt-40">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-white p-1.5">
                <img src="/logo.png" alt="Lifestyle Unisex Salon Logo" className="h-12 w-12 object-contain" />
              </div>
              <span className="text-xs tracking-[0.28em] uppercase">Lifestyle Unisex Salon</span>
            </div>
            <p className="font-display mt-8 text-4xl leading-tight md:text-6xl">
              Come as you are.
              <span className="block italic text-[color:var(--brown)]">Leave as your best.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+919392215354" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] tracking-[0.22em] uppercase text-background hover:bg-[color:var(--brown)]">
                <Phone className="h-4 w-4" />
                Call now
              </a>
              <a href="https://wa.me/919392215354" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-3 text-[11px] tracking-[0.22em] uppercase text-foreground hover:bg-foreground hover:text-background">
                <img src="/whatsapp.png" alt="WhatsApp" className="h-4 w-4 object-contain" />
                WhatsApp
              </a>
              <a href="https://facebook.com" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground">
                Facebook
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Visit</p>
            <address className="mt-4 not-italic text-sm leading-relaxed text-foreground">
              DCMS Building,<br />
              Beside Kotak Mahindra Bank,<br />
              Narasimharao Pet,<br />
              Eluru, Andhra Pradesh
            </address>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Lifestyle+Unisex+Salon+DCMS+Building+Narasimharao+Pet+Eluru"
              target="_blank" rel="noreferrer"
              className="mt-4 inline-flex text-xs tracking-[0.22em] uppercase text-[color:var(--brown)]"
            >
              Open in Maps →
            </a>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">Hours</p>
            <ul className="mt-4 space-y-1 text-sm text-foreground">
              <li>Mon – Sat</li>
              <li className="text-muted-foreground">10:00 — 21:00</li>
              <li className="mt-3">Sunday</li>
              <li className="text-muted-foreground">10:00 — 20:00</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow">Menu</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/#experience" className="hover:text-[color:var(--brown)]">Experiences</Link></li>
              <li><Link to="/#gallery" className="hover:text-[color:var(--brown)]">Gallery</Link></li>
              <li><Link to="/#artists" className="hover:text-[color:var(--brown)]">Artists</Link></li>
              <li><Link to="/#reserve" className="hover:text-[color:var(--brown)]">Book Now</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Lifestyle Unisex Salon.</p>
          <p>
            Designed for elegance. Built for you.
          </p>
        </div>
      </div>
    </footer>
  );
}
