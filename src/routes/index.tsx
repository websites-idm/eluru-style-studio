import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";

import manBefore from "@/assets/hero-man-before.jpg";
import manAfter from "@/assets/hero-man-after.jpg";
import womanBefore from "@/assets/hero-woman-before.jpg";
import womanAfter from "@/assets/hero-woman-after.jpg";

import expHair from "@/assets/exp-hair.jpg";
import expBeauty from "@/assets/exp-beauty.jpg";
import expSpa from "@/assets/exp-spa.jpg";
import expBridal from "@/assets/exp-bridal.jpg";
import expNails from "@/assets/exp-nails.jpg";
import expGroom from "@/assets/exp-groom.jpg";

import g1b from "@/assets/gallery-1-before.jpg";
import g1a from "@/assets/gallery-1-after.jpg";
import g2b from "@/assets/gallery-2-before.jpg";
import g2a from "@/assets/gallery-2-after.jpg";
import g3b from "@/assets/gallery-3-before.jpg";
import g3a from "@/assets/gallery-3-after.jpg";

import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";

import whyProducts from "@/assets/why-products.jpg";
import whyHygiene from "@/assets/why-hygiene.jpg";
import whyClients from "@/assets/why-clients.jpg";

import bridalHero from "@/assets/bridal-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

/* ------------------------------ Utilities ------------------------------- */

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const onC = () => setM(mq.matches);
    onC();
    mq.addEventListener("change", onC);
    return () => mq.removeEventListener("change", onC);
  }, []);
  return m;
}

/* --------------------------------- Nav ---------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--background)]/85 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 py-4 md:px-10 md:py-6">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-foreground/80 font-display text-sm">
            L
          </span>
          <span className="hidden truncate text-xs tracking-[0.28em] uppercase text-foreground sm:block">
            Lifestyle
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-xs tracking-[0.2em] uppercase text-muted-foreground md:flex">
          <a href="#experience" className="hover:text-foreground transition">Experiences</a>
          <a href="#gallery" className="hover:text-foreground transition">Gallery</a>
          <a href="#artists" className="hover:text-foreground transition">Artists</a>
          <a href="#bridal" className="hover:text-foreground transition">Bridal</a>
          <a href="#visit" className="hover:text-foreground transition">Visit</a>
        </nav>
        <div className="flex justify-end">
          <a
            href="#reserve"
            className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-background transition hover:bg-transparent hover:text-foreground"
          >
            Book
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------- Hero — reveal ----------------------------- */

function RevealPanel({
  before,
  after,
  align,
  label,
}: {
  before: string;
  after: string;
  align: "left" | "right";
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; on: boolean }>({
    x: 50,
    y: 50,
    on: false,
  });

  const clip = pos.on
    ? `circle(260px at ${pos.x}% ${pos.y}%)`
    : `circle(0px at ${pos.x}% ${pos.y}%)`;

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          on: true,
        });
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, on: false }))}
      className="group relative aspect-[3/4] w-full overflow-hidden bg-secondary cursor-none"
    >
      <img
        src={before}
        alt={`${label} — natural portrait`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src={after}
        alt={`${label} — styled at Lifestyle Salon`}
        style={{ clipPath: clip, WebkitClipPath: clip, transition: "clip-path 500ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* cursor bubble */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/10 backdrop-blur-[2px] mix-blend-difference"
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        animate={{ width: pos.on ? 96 : 40, height: pos.on ? 96 : 40, opacity: pos.on ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        <span className="absolute inset-0 grid place-items-center text-[10px] tracking-[0.24em] uppercase text-white">
          Reveal
        </span>
      </motion.div>
      <div
        className={`pointer-events-none absolute bottom-5 flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-white/90 ${
          align === "left" ? "left-5" : "right-5"
        }`}
      >
        <span className="h-px w-8 bg-white/80" />
        {label}
      </div>
    </div>
  );
}

function BeforeAfterSlider({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [v, setV] = useState(50);
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
      <img src={before} alt={`${label} before`} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${v}%` }}>
        <img
          src={after}
          alt={`${label} after`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${100 / (v / 100)}%`, maxWidth: "none" }}
        />
      </div>
      <div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/90 shadow-[0_0_18px_rgba(0,0,0,0.35)]"
        style={{ left: `${v}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white text-foreground text-xs">
          ⇆
        </div>
      </div>
      <input
        aria-label={`${label} before after slider`}
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <div className="pointer-events-none absolute left-4 top-4 text-[10px] tracking-[0.28em] uppercase text-white">
        Before
      </div>
      <div className="pointer-events-none absolute right-4 top-4 text-[10px] tracking-[0.28em] uppercase text-white">
        After
      </div>
    </div>
  );
}

function Hero() {
  const isMobile = useIsMobile();
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 md:flex md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="eyebrow">Eluru · Est. Lifestyle</p>
          </div>
          <div className="shrink-0 text-right text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
            4.9 ★ · 1000+ Reviews
          </div>
        </div>

        <h1 className="font-display mt-6 text-[13vw] leading-[0.95] tracking-[-0.03em] text-foreground md:mt-8 md:text-[9.5vw] lg:text-[8rem]">
          Every Style
          <span className="block italic text-[color:var(--brown)]">Has a Story.</span>
        </h1>

        <div className="mt-8 grid grid-cols-1 items-end gap-8 md:mt-12 md:grid-cols-12">
          <p className="md:col-span-5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Premium hair, beauty & grooming — designed for men and women, brides and
            families, students and professionals. Move your cursor across the portraits
            and watch the transformation.
          </p>
          <div className="md:col-span-4 md:col-start-9 flex flex-wrap gap-3">
            <a
              href="#reserve"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs tracking-[0.24em] uppercase text-background transition hover:bg-[color:var(--brown)]"
            >
              Book Appointment
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-xs tracking-[0.24em] uppercase text-foreground transition hover:bg-foreground hover:text-background"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Portrait pair */}
        <div className="mt-12 md:mt-20">
          {isMobile ? (
            <div className="grid gap-4">
              <BeforeAfterSlider before={manBefore} after={manAfter} label="For Him" />
              <BeforeAfterSlider before={womanBefore} after={womanAfter} label="For Her" />
              <p className="text-center text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                ← Drag to reveal →
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              <RevealPanel before={manBefore} after={manAfter} align="left" label="For Him" />
              <RevealPanel before={womanBefore} after={womanAfter} align="right" label="For Her" />
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-1 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <span>Hair · Beard · Grooming</span>
          <span className="text-right">Hair · Colour · Makeup · Bridal</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Section: Ticker ---------------------------- */

function Marquee() {
  const items = [
    "Hair Studio", "Beauty Lounge", "Spa Rituals", "Bridal Studio",
    "Nail Care", "Groom Lounge", "Hair Colour", "Skin & Glow",
  ];
  return (
    <div className="mt-24 md:mt-40 overflow-hidden border-y border-border py-6">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-display text-3xl italic text-[color:var(--brown)] md:text-5xl"
          >
            {t} <span className="not-italic text-foreground">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------- Section: Experiences ------------------------- */

const experiences = [
  { title: "Hair Studio", copy: "Cuts, styling and precision blowouts for every texture.", img: expHair, cta: "Book a cut" },
  { title: "Beauty Lounge", copy: "Facials, threading and skin rituals with premium formulas.", img: expBeauty, cta: "Reserve" },
  { title: "Spa Rituals", copy: "Head, back and full-body therapies to unwind and reset.", img: expSpa, cta: "Unwind" },
  { title: "Bridal Studio", copy: "Trials, packages and day-of styling for a calm celebration.", img: expBridal, cta: "Plan bridal" },
  { title: "Nail Care", copy: "Manicures, pedicures and clean, long-wear finishes.", img: expNails, cta: "Book nails" },
  { title: "Groom Lounge", copy: "Beard sculpting, straight-razor shaves and premium grooming.", img: expGroom, cta: "Groom up" },
];

function Experiences() {
  return (
    <section id="experience" className="mx-auto mt-24 max-w-[1400px] px-5 md:mt-40 md:px-10">
      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow">02 · Menu</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.95] tracking-tight md:text-7xl">
            Choose your
            <span className="italic text-[color:var(--brown)]"> experience.</span>
          </h2>
        </div>
        <p className="md:col-span-5 md:col-start-8 text-sm text-muted-foreground md:text-base">
          Six focused studios under one warm roof — pick the one that matches
          your mood today, or ask us to bundle a few.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiences.map((e, i) => (
          <ExperienceCard key={e.title} {...e} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({
  title, copy, img, cta, index,
}: { title: string; copy: string; img: string; cta: string; index: number }) {
  return (
    <motion.a
      href="#reserve"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block overflow-hidden bg-secondary"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <motion.img
          src={img}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-sm text-white/90 max-w-xs">{copy}</p>
        <span className="mt-4 inline-flex w-fit items-center gap-2 border-b border-white pb-1 text-[11px] tracking-[0.24em] uppercase text-white">
          {cta} →
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-border bg-background px-4 py-4">
        <span className="font-display text-xl">{title}</span>
        <span className="text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
          0{index + 1}
        </span>
      </div>
    </motion.a>
  );
}

/* ----------------------- Section: Transformation ------------------------ */

const gallery = [
  { b: g1b, a: g1a, span: "row-span-2", label: "Hair colour & gloss" },
  { b: g2b, a: g2a, span: "", label: "Cut & beard sculpt" },
  { b: g3b, a: g3a, span: "row-span-2", label: "Bridal styling" },
  { b: g1b, a: g1a, span: "", label: "Smooth & style" },
];

function GalleryCard({ b, a, label, span }: { b: string; a: string; label: string; span: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover((h) => !h)}
      className={`relative overflow-hidden bg-secondary ${span}`}
    >
      <img src={b} alt={`${label} before`} className="h-full w-full object-cover" loading="lazy" />
      <AnimatePresence>
        {hover && (
          <motion.img
            key="after"
            src={a}
            alt={`${label} after`}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-4 text-[10px] tracking-[0.24em] uppercase text-white">
        <span>{label}</span>
        <span>{hover ? "After" : "Before ↑"}</span>
      </div>
    </div>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="mx-auto mt-24 max-w-[1400px] px-5 md:mt-40 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">03 · Gallery</p>
          <h2 className="font-display mt-4 text-5xl tracking-tight md:text-7xl">
            Transformations,
            <span className="italic text-[color:var(--brown)]"> hover to see.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Real guests, real work — no filters. Tap or hover any frame.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[280px]">
        {gallery.map((g, i) => (
          <GalleryCard key={i} {...g} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Section: Artists --------------------------- */

const artists = [
  { name: "Ravi Teja", role: "Master Stylist", exp: "12 yrs", spec: "Precision cuts & fades", img: artist1 },
  { name: "Anitha Rao", role: "Beauty Artist", exp: "9 yrs", spec: "Skin, brows & threading", img: artist2 },
  { name: "Karthik M.", role: "Head Barber", exp: "8 yrs", spec: "Beards & straight razor", img: artist3 },
  { name: "Lakshmi P.", role: "Bridal Lead", exp: "15 yrs", spec: "Bridal hair & makeup", img: artist4 },
];

function Artists() {
  return (
    <section id="artists" className="mx-auto mt-24 max-w-[1400px] px-5 md:mt-40 md:px-10">
      <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="eyebrow">04 · The Team</p>
          <h2 className="font-display mt-4 text-5xl tracking-tight md:text-7xl">
            Meet the
            <span className="italic text-[color:var(--brown)]"> artists.</span>
          </h2>
        </div>
        <p className="md:col-span-5 md:col-start-8 text-sm text-muted-foreground">
          Trained, warm and quietly obsessive about their craft.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
        {artists.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={a.img}
                alt={a.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-display text-2xl">{a.name}</h3>
              <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                {a.exp}
              </span>
            </div>
            <p className="mt-1 text-xs tracking-[0.16em] uppercase text-[color:var(--brown)]">
              {a.role}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{a.spec}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Section: Why ------------------------------- */

function Why() {
  const items = [
    { t: "Professional Stylists", d: "Certified team with 8–15 years each.", img: artist1, tag: "01" },
    { t: "Premium Products", d: "Salon-grade brands, gentle on you.", img: whyProducts, tag: "02" },
    { t: "Hygienic Environment", d: "Sanitised tools, spotless stations.", img: whyHygiene, tag: "03" },
    { t: "1000+ Happy Clients", d: "Locally loved across Eluru.", img: whyClients, tag: "04" },
    { t: "4.9 ★ Google Rating", d: "Read what our guests say.", img: g3a, tag: "05" },
  ];
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-5 md:mt-40 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">05 · Why Lifestyle</p>
          <h2 className="font-display mt-4 text-5xl tracking-tight md:text-7xl">
            Five reasons,
            <span className="italic text-[color:var(--brown)]"> no small print.</span>
          </h2>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((w, i) => (
          <motion.div
            key={w.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={`relative overflow-hidden bg-surface ${
              i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
            }`}
          >
            <div className={i === 0 ? "aspect-[4/5]" : "aspect-[4/5]"}>
              <img src={w.img} alt={w.t} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl md:text-2xl">{w.t}</h3>
                <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
                  {w.tag}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{w.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Section: Bridal ---------------------------- */

function Bridal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section id="bridal" ref={ref} className="relative mt-24 md:mt-40 overflow-hidden">
      <div className="relative h-[80vh] min-h-[520px] w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
          <img
            src={bridalHero}
            alt="Bridal by Lifestyle Salon Eluru"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-5 pb-12 md:px-10 md:pb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/85">06 · Bridal</p>
          <h2 className="font-display mt-4 max-w-3xl text-5xl leading-[0.98] text-white md:text-8xl">
            Her day,
            <span className="block italic text-[color:var(--gold)]">calmly composed.</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#reserve"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs tracking-[0.24em] uppercase text-foreground transition hover:bg-[color:var(--gold)]"
            >
              Plan a bridal trial
            </a>
            <span className="text-xs tracking-[0.24em] uppercase text-white/80">
              Trials · Packages · On-location
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Section: Stories --------------------------- */

const stories = [
  { n: "Sneha K.", t: "Bride, Eluru", q: "They made my wedding morning feel like the calmest, most beautiful part of the day.", r: 5 },
  { n: "Arjun R.", t: "Regular guest", q: "Best fade I've had in Eluru. The beard shape is on point every single time.", r: 5 },
  { n: "Priya M.", t: "Working professional", q: "Booked a spa + hair colour combo — walked out feeling completely new. Warm, clean, kind.", r: 5 },
  { n: "Vamsi & Family", t: "Family visit", q: "All four of us in one appointment, everyone happy. The kids loved it too.", r: 5 },
];

function Stories() {
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-5 md:mt-40 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">07 · Reviews</p>
          <h2 className="font-display mt-4 text-5xl tracking-tight md:text-7xl">
            Customer
            <span className="italic text-[color:var(--brown)]"> stories.</span>
          </h2>
        </div>
        <div className="rounded-full border border-border bg-surface px-5 py-3 text-xs tracking-[0.22em] uppercase text-foreground">
          <span className="text-[color:var(--gold)]">★ 4.9</span> · 1000+ Google Reviews
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        {stories.map((s, i) => (
          <motion.article
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="rounded-sm border border-border bg-surface p-6 md:p-8"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary font-display text-lg text-foreground">
                {s.n[0]}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium">{s.n}</p>
                <p className="truncate text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {s.t}
                </p>
              </div>
              <div className="ml-auto text-[color:var(--gold)] text-sm">{"★".repeat(s.r)}</div>
            </div>
            <p className="mt-5 font-display text-xl leading-snug text-foreground md:text-2xl">
              “{s.q}”
            </p>
            <p className="mt-5 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
              via Google
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- Section: Reserve --------------------------- */

function Reserve() {
  const [sent, setSent] = useState(false);
  return (
    <section id="reserve" className="mx-auto mt-24 max-w-[1400px] px-5 md:mt-40 md:px-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow">08 · Reserve</p>
          <h2 className="font-display mt-4 text-5xl leading-[0.95] tracking-tight md:text-7xl">
            Book a
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
            <a href="tel:+919999999999" className="block font-display text-3xl underline-offset-4 hover:underline">
              +91 · 99999 99999
            </a>
            <a
              href="https://wa.me/919999999999"
              className="inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-[color:var(--brown)]"
            >
              WhatsApp us →
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="md:col-span-7 rounded-sm border border-border bg-surface p-6 md:p-10"
        >
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <p className="eyebrow">Thank you</p>
              <p className="font-display mt-4 text-3xl md:text-4xl">
                Your chair is on hold.
              </p>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                We've received your request. Someone from Lifestyle will confirm
                shortly on WhatsApp.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full Name" name="name" placeholder="Your name" />
              <Field label="Phone" name="phone" placeholder="+91" type="tel" />
              <div className="md:col-span-2">
                <label className="eyebrow block mb-2">Service</label>
                <select
                  required
                  defaultValue=""
                  className="w-full border-b border-border bg-transparent py-3 text-base focus:border-foreground focus:outline-none"
                >
                  <option value="" disabled>Select a service</option>
                  {experiences.map((e) => (
                    <option key={e.title}>{e.title}</option>
                  ))}
                  <option>Hair Colour</option>
                  <option>Bridal Makeup</option>
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

/* -------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer id="visit" className="mt-24 border-t border-border bg-background md:mt-40">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-foreground font-display">
                L
              </span>
              <span className="text-xs tracking-[0.28em] uppercase">Lifestyle Unisex Salon</span>
            </div>
            <p className="font-display mt-8 text-4xl leading-tight md:text-6xl">
              Come as you are.
              <span className="block italic text-[color:var(--brown)]">Leave as your best.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+919999999999" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[11px] tracking-[0.22em] uppercase text-background hover:bg-[color:var(--brown)]">
                Call now
              </a>
              <a href="https://wa.me/919999999999" className="inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-3 text-[11px] tracking-[0.22em] uppercase text-foreground hover:bg-foreground hover:text-background">
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
              <li><a href="#experience" className="hover:text-[color:var(--brown)]">Experiences</a></li>
              <li><a href="#gallery" className="hover:text-[color:var(--brown)]">Gallery</a></li>
              <li><a href="#artists" className="hover:text-[color:var(--brown)]">Artists</a></li>
              <li><a href="#bridal" className="hover:text-[color:var(--brown)]">Bridal</a></li>
              <li><a href="#reserve" className="hover:text-[color:var(--brown)]">Reserve</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <span>© {new Date().getFullYear()} Lifestyle Unisex Salon · Eluru</span>
          <span>Best Salon in Eluru — Hair, Beauty, Spa & Bridal</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page --------------------------------- */

function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Experiences />
      <Gallery />
      <Artists />
      <Why />
      <Bridal />
      <Stories />
      <Reserve />
      <Footer />
    </main>
  );
}
