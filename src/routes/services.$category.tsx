import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronDown, Sparkles, Scissors, Droplets, Flower, HandHeart } from "lucide-react";

import { pricingData, pageMetadata } from "@/data/services";
import { ReserveCTA } from "@/components/ReserveCTA";

import gallery1 from "@/assets/gallery-1-after.jpg";
import gallery2 from "@/assets/gallery-2-after.jpg";
import gallery3 from "@/assets/gallery-3-after.jpg";
import gallery4 from "@/assets/hero-woman-before.jpg";
import gallery5 from "@/assets/exp-beauty.jpg";
import gallery6 from "@/assets/hero-man-after.jpg";

export const Route = createFileRoute("/services/$category")({
  component: ServiceCategoryPage,
});

const iconsMap: Record<string, any> = {
  Sparkles,
  Scissors,
  Droplets,
  Flower,
  HandHeart,
};

function ServiceCategoryPage() {
  const { category } = Route.useParams();
  
  // Normalize category to lowercase
  const normalizedCategory = category.toLowerCase() as keyof typeof pageMetadata;
  const meta = pageMetadata[normalizedCategory];

  if (!meta) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl">Category not found</h1>
        <Link to="/" className="mt-4 underline text-[color:var(--brown)]">Return Home</Link>
      </div>
    );
  }

  // Filter pricing data that matches this category's tags
  // We use the tag that matches the category name, e.g. "Kids", "Men", "Women", "Bridal", "Groom"
  const filterTag = normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1);
  const relevantPricing = pricingData.filter(p => p.tags.includes(filterTag));

  // Gallery array
  const gallery = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  return (
    <main className="min-h-screen bg-background text-foreground">
      
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={meta.heroImage} alt={meta.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center px-5 max-w-4xl text-white">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase mb-6 opacity-80">
            <Link to="/" className="hover:text-[color:var(--brown)] transition">Home</Link>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="text-[color:var(--brown)] font-bold">{meta.title}</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl leading-tight"
          >
            {meta.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg md:text-xl font-light opacity-90"
          >
            {meta.subtitle}
          </motion.p>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="mt-10"
          >
            <a href="#reserve" className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 backdrop-blur-md px-8 py-4 text-xs tracking-[0.2em] uppercase transition hover:bg-white hover:text-black">
              Book Appointment
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="py-24 px-5 md:px-10 text-center max-w-3xl mx-auto">
        <Sparkles className="h-8 w-8 mx-auto text-[color:var(--brown)] mb-6 opacity-50" />
        <p className="font-display text-2xl md:text-4xl leading-relaxed text-foreground">
          {meta.description}
        </p>
      </section>

      {/* 3. Pricing & Services */}
      <section className="py-24 px-5 md:px-10 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow">The Menu</p>
            <h2 className="font-display mt-4 text-4xl md:text-6xl">Our <span className="italic text-[color:var(--brown)]">Offerings.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {relevantPricing.map((category) => {
              const Icon = iconsMap[category.icon] || Sparkles;
              return (
                <div key={category.category} className="group rounded-xl border border-border bg-background p-8 transition-all hover:border-foreground/20 hover:shadow-2xl">
                  <div className="flex items-center gap-4 border-b border-border pb-6">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--brown)]/10 text-[color:var(--brown)] transition group-hover:bg-[color:var(--brown)] group-hover:text-background">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl text-foreground">
                        {category.category}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    {category.services.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm md:text-base group/item hover:bg-surface p-2 -mx-2 rounded transition">
                        <div>
                          <p className="text-foreground font-medium">{item.name}</p>
                          {item.duration && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.duration}</p>
                          )}
                        </div>
                        <div className="text-[color:var(--brown)] font-medium">
                          {item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Masonry Gallery */}
      <section className="py-24 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow">Portfolio</p>
            <h2 className="font-display mt-4 text-4xl md:text-6xl">Our <span className="italic text-[color:var(--brown)]">Work.</span></h2>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group overflow-hidden rounded-xl break-inside-avoid"
              >
                <img src={img} alt={`Gallery ${i}`} className="w-full h-auto object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 px-5 md:px-10 bg-surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow">Questions</p>
            <h2 className="font-display mt-4 text-4xl md:text-6xl">Frequently <span className="italic text-[color:var(--brown)]">Asked.</span></h2>
          </div>
          
          <div className="space-y-4">
            {meta.faq.map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Reserve CTA */}
      <ReserveCTA />
    </main>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="border border-border rounded-xl bg-background overflow-hidden">
      <button 
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left transition hover:bg-surface"
      >
        <span className="font-medium text-foreground">{question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
