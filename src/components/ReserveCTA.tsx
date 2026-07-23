import { useState } from "react";
import { Phone } from "lucide-react";

const serviceOptions = [
  "Bespoke Haircut",
  "Signature Spa",
  "Bridal Artistry",
  "Nail Extensions",
  "Grooming Ritual",
  "Hair Colour",
  "Keratin / Smoothening",
  "Facial & Cleanup"
];

function Field({
  label, name, placeholder, type = "text",
}: { label: string; name: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full border-b border-border bg-transparent py-3 text-base placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
      />
    </div>
  );
}

export function ReserveCTA() {
  const [sent, setSent] = useState(false);

  return (
    <section id="reserve" className="relative mt-24 bg-[color:var(--surface-alt)] md:mt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5 md:pr-12">
          <p className="eyebrow flex items-center gap-2">
            <span className="block h-px w-8 bg-foreground"></span>
            Reserve
          </p>
          <h2 className="font-display mt-8 text-4xl leading-tight md:text-5xl lg:text-6xl">
            Secure your
            <span className="italic text-[color:var(--brown)]"> chair.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm text-muted-foreground md:text-base">
            Tell us a bit about your visit — we'll confirm on WhatsApp within an hour
            during working times.
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <p className="tracking-[0.16em] uppercase text-muted-foreground text-xs">
              Prefer to talk?
            </p>
            <a href="tel:+919392215354" className="flex items-center gap-2 font-display text-3xl underline-offset-4 hover:underline">
              <Phone className="h-6 w-6 text-[color:var(--brown)]" />
              +91 · 93922 15354
            </a>
            <a
              href="https://wa.me/919392215354"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[color:var(--brown)]"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5 object-contain" />
              WhatsApp us →
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const data = Object.fromEntries(fd.entries());
            const text = `Hi, I'd like to reserve an appointment.\nName: ${data.name}\nPhone: ${data.phone}\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}`;
            window.open(`https://wa.me/919392215354?text=${encodeURIComponent(text)}`, "_blank");
            setSent(true);
          }}
          className="md:col-span-7 rounded-sm border border-border bg-surface p-6 md:p-10"
        >
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <p className="eyebrow">Thank you</p>
              <p className="font-display mt-4 text-3xl md:text-4xl">
                Your chair is on hold.
              </p>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                We've received your request and redirected you to WhatsApp to complete your booking.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Your name" />
              <Field label="Phone" name="phone" placeholder="+91" type="tel" />
              <div className="md:col-span-2">
                <label className="eyebrow block mb-2">Service</label>
                <select
                  name="service"
                  required
                  defaultValue=""
                  className="w-full border-b border-border bg-transparent py-3 text-base focus:border-foreground focus:outline-none"
                >
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <Field label="Preferred Date" name="date" type="date" />
              <Field label="Preferred Time" name="time" type="time" />
              <div className="md:col-span-2 mt-2 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  We reply within an hour during working times.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs tracking-[0.24em] uppercase text-background transition hover:bg-[color:var(--brown)]"
                >
                  Reserve →
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
