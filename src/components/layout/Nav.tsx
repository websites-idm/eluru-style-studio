import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, Sparkles, Scissors, HandHeart, Crown, User } from "lucide-react";

const serviceCategories = [
  { name: "Kids Salon", path: "/services/kids", icon: Sparkles, desc: "Gentle and fun grooming for the little ones." },
  { name: "Men's Salon", path: "/services/men", icon: Scissors, desc: "Precision cuts, beard styling, and relaxation." },
  { name: "Women's Salon", path: "/services/women", icon: HandHeart, desc: "Hair, beauty, and spa rituals tailored for her." },
  { name: "Bridal Services", path: "/services/bridal", icon: Crown, desc: "Flawless artistry and packages for your big day." },
  { name: "Groom Services", path: "/services/groom", icon: User, desc: "Premium styling and prep for the groom." },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
  // Need to know if we are on the home page to use anchor links correctly
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const getHashLink = (hash: string) => {
    return isHome ? hash : `/${hash}`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "backdrop-blur-md bg-[color:var(--background)]/90 border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex items-center justify-between gap-4 px-5 py-4 md:px-10 md:py-6 max-w-[1400px]">
        
        {/* Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-2 relative z-50">
          <div className="rounded-md bg-white p-1 shadow-sm">
            <img src="/logo.png" alt="Lifestyle Unisex Salon Logo" className="h-8 w-8 object-contain" />
          </div>
          <span className="hidden truncate text-xs tracking-[0.28em] uppercase text-foreground sm:block font-medium">
            Lifestyle
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-xs tracking-[0.2em] uppercase text-muted-foreground md:flex">
          
          {/* Services Mega Menu Trigger */}
          <div 
            className="relative group"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-foreground transition py-4">
              Services <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[600px]"
                >
                  <div className="rounded-2xl border border-border bg-surface/95 backdrop-blur-xl p-6 shadow-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      {serviceCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link 
                            key={cat.path} 
                            to={cat.path}
                            className="group/item flex items-start gap-4 rounded-xl p-4 transition-all hover:bg-background border border-transparent hover:border-border hover:shadow-sm"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--brown)]/10 text-[color:var(--brown)] transition-colors group-hover/item:bg-[color:var(--brown)] group-hover/item:text-background">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-display text-lg text-foreground transition-colors group-hover/item:text-[color:var(--brown)]">{cat.name}</p>
                              <p className="mt-1 text-[10px] tracking-wider text-muted-foreground normal-case line-clamp-2">{cat.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-4 border-t border-border pt-4 text-center">
                      <Link to="/#experience" className="text-[10px] tracking-[0.2em] text-[color:var(--brown)] hover:underline">
                        View all experiences →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href={getHashLink("#gallery")} className="hover:text-foreground transition py-4">Gallery</a>
          <a href={getHashLink("#artists")} className="hover:text-foreground transition py-4">Artists</a>
          <a href={getHashLink("#visit")} className="hover:text-foreground transition py-4">Visit</a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a
            href={getHashLink("#reserve")}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2.5 text-[11px] tracking-[0.22em] uppercase text-background transition-all hover:bg-transparent hover:text-foreground hover:shadow-md"
          >
            Book Now
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 bg-background/95 backdrop-blur-xl md:hidden overflow-y-auto pt-24 pb-12 px-6 border-t border-border"
          >
            <div className="flex flex-col gap-6 text-sm tracking-[0.2em] uppercase">
              
              {/* Mobile Services Accordion */}
              <div className="border-b border-border pb-4">
                <button 
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex w-full items-center justify-between py-2 text-foreground"
                >
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-[color:var(--brown)]" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pt-4 pl-4 border-l border-border/50 ml-2 mt-2">
                        {serviceCategories.map((cat) => (
                          <Link 
                            key={cat.path} 
                            to={cat.path}
                            className="flex items-center gap-3 text-muted-foreground hover:text-[color:var(--brown)]"
                          >
                            <cat.icon className="h-4 w-4" />
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href={getHashLink("#experience")} onClick={() => setMobileMenuOpen(false)} className="py-2 text-foreground border-b border-border/50">Experiences</a>
              <a href={getHashLink("#gallery")} onClick={() => setMobileMenuOpen(false)} className="py-2 text-foreground border-b border-border/50">Gallery</a>
              <a href={getHashLink("#artists")} onClick={() => setMobileMenuOpen(false)} className="py-2 text-foreground border-b border-border/50">Artists</a>
              <a href={getHashLink("#visit")} onClick={() => setMobileMenuOpen(false)} className="py-2 text-foreground border-b border-border/50">Visit</a>
              
              <a
                href={getHashLink("#reserve")}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-4 py-4 text-[11px] tracking-[0.22em] uppercase text-background transition hover:bg-transparent hover:text-foreground"
              >
                Book Appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
