import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, Scissors, Droplets, Flower, HandHeart } from "lucide-react";

import { pricingData } from "@/data/services";

const iconsMap: Record<string, any> = {
  Sparkles,
  Scissors,
  Droplets,
  Flower,
  HandHeart,
};

const filterOptions = [
  "All",
  "Women",
  "Men",
  "Bridal",
  "Hair",
  "Facial",
  "Massage",
  "Pedicure",
  "Manicure",
];

export function ServicesPricing() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return pricingData
      .map((cat) => {
        // Filter by tags
        const matchesFilter =
          activeFilter === "All" || cat.tags.includes(activeFilter);
        
        // Filter by search query (check category name and inner services)
        const query = searchQuery.toLowerCase();
        const matchesCategorySearch = cat.category.toLowerCase().includes(query);
        const matchedServices = cat.services.filter((s) =>
          s.name.toLowerCase().includes(query)
        );
        const matchesSearch =
          searchQuery === "" || matchesCategorySearch || matchedServices.length > 0;

        if (matchesFilter && matchesSearch) {
          return {
            ...cat,
            services: (searchQuery !== "" && !matchesCategorySearch) ? matchedServices : cat.services
          };
        }
        return null;
      })
      .filter(Boolean) as typeof pricingData;
  }, [activeFilter, searchQuery]);

  return (
    <section id="pricing" className="mx-auto mt-24 max-w-[1400px] px-5 md:mt-40 md:px-10 mb-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <p className="eyebrow">Services & Pricing</p>
        <h2 className="font-display mt-4 text-5xl leading-[0.95] tracking-tight md:text-7xl">
          Premium <span className="italic text-[color:var(--brown)]">experiences.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base">
          Discover our full menu of luxury grooming and beauty treatments, carefully curated to elevate your everyday lifestyle.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border pb-6">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-foreground text-background shadow-md scale-105"
                  : "bg-surface text-muted-foreground hover:bg-border/50 border border-border"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-surface pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-[color:var(--brown)] focus:outline-none focus:ring-1 focus:ring-[color:var(--brown)] transition-all"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mt-12">
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((category, idx) => {
                const IconComponent = iconsMap[category.icon] || Sparkles;
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    key={category.category}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-md p-6 shadow-sm hover:shadow-xl hover:border-foreground/20 transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--brown)]/10 text-[color:var(--brown)] group-hover:bg-[color:var(--brown)] group-hover:text-background transition-colors duration-500">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-2xl">{category.category}</h3>
                      </div>
                      
                      <p className="mt-3 text-sm text-muted-foreground">
                        {category.description}
                      </p>
                      
                      <div className="my-6 h-px w-full bg-gradient-to-r from-border via-border to-transparent" />
                      
                      <ul className="space-y-4 flex-grow">
                        {category.services.map((service, sIdx) => (
                          <li key={sIdx} className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 group/item">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium group-hover/item:text-[color:var(--brown)] transition-colors">
                                {service.name}
                              </span>
                              {service.duration && (
                                <span className="text-[10px] tracking-wider uppercase text-muted-foreground mt-0.5">
                                  {service.duration}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 sm:w-auto w-full">
                              <div className="h-[1px] flex-grow bg-border/50 sm:hidden" />
                              <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
                                {service.price}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8 pt-4 border-t border-border/50">
                        <a
                          href={`https://wa.me/919392215354?text=${encodeURIComponent(`Hi, I'm interested in the ${category.category} services.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/50 px-4 py-3 text-[11px] tracking-[0.2em] uppercase text-foreground transition-all hover:border-[color:var(--brown)] hover:bg-[color:var(--brown)]/10"
                        >
                          <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5 object-contain" />
                          Book via WhatsApp
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-20 text-center flex flex-col items-center"
              >
                <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <p className="text-lg font-medium">No services found</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground px-5 py-2 text-xs tracking-[0.1em] uppercase text-foreground hover:bg-foreground hover:text-background transition"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mt-24 rounded-3xl bg-foreground text-background p-10 md:p-16 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h3 className="font-display text-4xl md:text-5xl leading-tight">
            Ready for Your Next <span className="italic text-[color:var(--gold)]">Salon Experience?</span>
          </h3>
          <p className="mt-4 text-white/70">
            Book your appointment today and enjoy premium beauty and grooming services.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#reserve"
              className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-xs tracking-[0.2em] uppercase text-foreground transition hover:bg-[color:var(--gold)] hover:text-foreground"
            >
              Book Appointment
            </a>
            <a
              href="https://wa.me/919392215354"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-background/30 px-8 py-4 text-xs tracking-[0.2em] uppercase text-background transition hover:bg-white/10"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="h-6 w-6 object-contain" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
