export interface ServiceItem {
  name: string;
  price: string;
  duration?: string;
}

export interface PricingCategory {
  category: string;
  tags: string[];
  icon: string;
  description: string;
  services: ServiceItem[];
}

export const pricingData: PricingCategory[] = [
  {
    category: "Bridal Makeup",
    tags: ["Bridal", "Women"],
    icon: "Sparkles",
    description: "Flawless artistry for your big day.",
    services: [
      { name: "Saree Draping", price: "₹1,999" },
      { name: "Hair Do - Basic", price: "₹999" },
      { name: "Hair Do - Creative", price: "₹2,499" },
      { name: "Trial Makeup (Half Face)", price: "₹499" },
      { name: "Trial Makeup (MAC)", price: "₹999" },
      { name: "Party Makeup", price: "₹5,999" },
      { name: "Party Makeup (MAC)", price: "₹6,999" },
      { name: "Bridal Face Makeup", price: "₹8,999" },
      { name: "Bridal Face Makeup (MAC)", price: "₹9,999–₹14,999" },
    ],
  },
  {
    category: "Bridal Mehendi",
    tags: ["Bridal", "Women"],
    icon: "Flower",
    description: "Intricate designs and deep, rich colors.",
    services: [
      { name: "Arabic (Per Side)", price: "₹999" },
      { name: "Bridal Special (Per Side)", price: "₹1,499–₹1,999" },
      { name: "Leg (Per Side)", price: "₹599" },
      { name: "Hand (Per Side)", price: "₹699" },
    ],
  },
  {
    category: "Women's Tan & Cleanup",
    tags: ["Women", "Facial"],
    icon: "Droplets",
    description: "Refresh and rejuvenate your natural glow.",
    services: [
      { name: "O3+ Tan", price: "₹599" },
      { name: "Raaga Tan", price: "₹449" },
      { name: "Full Hand Tan", price: "₹699" },
      { name: "Full Leg Tan", price: "₹899" },
      { name: "Full Body Tan", price: "₹2,499" },
      { name: "Clean Up", price: "₹649" },
    ],
  },
  {
    category: "Women's Facials",
    tags: ["Women", "Facial"],
    icon: "Sparkles",
    description: "Luxurious skin rituals tailored to you.",
    services: [
      { name: "Fruit Facial", price: "₹999" },
      { name: "Herbal Facial", price: "₹1,199" },
      { name: "Aroma Magic Skin Glow", price: "₹1,599" },
      { name: "Gold Facial", price: "₹1,699" },
      { name: "Pearl Facial", price: "₹1,699" },
      { name: "Silver Facial", price: "₹1,299" },
      { name: "Brightening Facial", price: "₹1,999" },
      { name: "Go Radiance Facial", price: "₹2,199" },
      { name: "Galvanic Facial", price: "₹2,699" },
      { name: "Hydro Facial", price: "₹1,699" },
      { name: "Anti-Aging Facial", price: "₹3,499" },
      { name: "Wine Facial", price: "₹1,999" },
      { name: "Diamond Facial", price: "₹2,899" },
      { name: "Shahnaz Professional Facial", price: "₹3,999" },
      { name: "Shahnaz 24K Gold Facial", price: "₹3,499" },
      { name: "O3 Facial", price: "₹4,499" },
      { name: "Glowing Radiant Facial", price: "₹3,999" },
    ],
  },
  {
    category: "Hair Straightening & Smoothing",
    tags: ["Hair", "Women"],
    icon: "Scissors",
    description: "Silky, smooth, and perfectly styled hair.",
    services: [
      { name: "Hair Straightening", price: "₹7,999" },
      { name: "Keratin Treatment", price: "₹7,999" },
      { name: "L'Oréal Straightening", price: "₹7,999" },
      { name: "Matrix Straightening", price: "₹6,999" },
      { name: "Streax Straightening", price: "₹5,999" },
      { name: "L'Oréal Smoothing", price: "₹7,999" },
      { name: "Matrix Smoothing", price: "₹6,999" },
      { name: "Streax Smoothing", price: "₹5,999" },
    ],
  },
  {
    category: "Men's Hair Services",
    tags: ["Men", "Hair"],
    icon: "Scissors",
    description: "Precision cuts and premium grooming.",
    services: [
      { name: "Basic Haircut", price: "₹200" },
      { name: "Advance Cut", price: "₹300" },
      { name: "Beard Trim", price: "₹100" },
      { name: "Beard Styling", price: "₹150" },
      { name: "Beard Shave", price: "₹100" },
      { name: "Hair Wash", price: "₹100" },
    ],
  },
  {
    category: "Men's Tan & Cleanup",
    tags: ["Men", "Facial"],
    icon: "Droplets",
    description: "Clear skin and a refreshed appearance.",
    services: [
      { name: "O3+ Tan", price: "₹599" },
      { name: "Raga Tan", price: "₹499" },
      { name: "Full Hands Tan", price: "₹699" },
      { name: "Full Legs Tan", price: "₹899" },
      { name: "Full Body Tan", price: "₹2,499" },
      { name: "Cleanup", price: "₹649" },
    ],
  },
  {
    category: "Men's Pedicure & Manicure",
    tags: ["Men", "Pedicure", "Manicure"],
    icon: "HandHeart",
    description: "Detailed care for hands and feet.",
    services: [
      { name: "Manicure (Regular)", price: "₹599" },
      { name: "Manicure Spa", price: "₹999" },
      { name: "Manicure (Anti-Tan)", price: "₹1,299" },
      { name: "Manicure (Crystal)", price: "₹1,599" },
      { name: "Pedicure (Regular)", price: "₹999" },
      { name: "Pedicure Spa", price: "₹1,299" },
      { name: "Pedicure (Anti-Tan)", price: "₹1,399" },
      { name: "Pedicure (Crystal)", price: "₹1,599" },
      { name: "Heel Peel Treatment", price: "₹2,599" },
    ],
  },
  {
    category: "Women's Pedicure & Manicure",
    tags: ["Women", "Pedicure", "Manicure"],
    icon: "HandHeart",
    description: "Relaxing rituals for pristine hands and feet.",
    services: [
      { name: "Pedicure (Regular)", price: "₹699" },
      { name: "Pedicure Spa", price: "₹1,299" },
      { name: "Pedicure (Anti-Tan)", price: "₹1,399" },
      { name: "Pedicure (Crystal)", price: "₹1,599" },
      { name: "Manicure (Regular)", price: "₹599" },
      { name: "Manicure Spa", price: "₹999" },
      { name: "Manicure (Anti-Tan)", price: "₹1,299" },
      { name: "Manicure (Crystal)", price: "₹1,599" },
      { name: "Heel Peel Treatment", price: "₹2,599" },
    ],
  },
  {
    category: "Men's Head & Body Massage",
    tags: ["Men", "Massage"],
    icon: "Droplets",
    description: "Unwind tension with targeted treatments.",
    services: [
      { name: "Coconut Oil", duration: "20 mins", price: "₹249" },
      { name: "Menthol Chilled Oil", duration: "20 mins", price: "₹299" },
      { name: "Almond Oil", duration: "20 mins", price: "₹499" },
      { name: "Foot Massage", duration: "20 mins", price: "₹599" },
      { name: "Back & Neck", duration: "20 mins", price: "₹699" },
    ],
  },
  {
    category: "Women's Head & Body Massage",
    tags: ["Women", "Massage"],
    icon: "Droplets",
    description: "Deep relaxation and holistic wellness therapies.",
    services: [
      { name: "Coconut Oil", duration: "20 mins", price: "₹349" },
      { name: "Menthol Chilled Oil", duration: "20 mins", price: "₹399" },
      { name: "Almond Oil with Steam", duration: "20 mins", price: "₹499" },
      { name: "Olive Oil with Steam", duration: "20 mins", price: "₹499" },
      { name: "Foot Massage", duration: "25 mins", price: "₹599" },
      { name: "Back & Neck", duration: "25 mins", price: "₹649" },
      { name: "Full Body Massage", duration: "60 mins", price: "₹2,499" },
    ],
  },
  // Added dummy kids data as requested by user to have a kids section
  {
    category: "Kids Haircuts & Styling",
    tags: ["Kids", "Hair"],
    icon: "Scissors",
    description: "Gentle and fun grooming for the little ones.",
    services: [
      { name: "Kids Basic Haircut", price: "₹250" },
      { name: "Kids Creative Styling", price: "₹350" },
      { name: "Kids Hair Wash & Dry", price: "₹150" },
    ],
  }
];

export const pageMetadata = {
  kids: {
    title: "Kids Salon",
    subtitle: "Gentle, fun, and safe styling for the little ones.",
    heroImage: "/src/assets/hero-woman-before.jpg", 
    description: "Our dedicated Kids Salon ensures a tear-free, enjoyable experience with stylists trained to handle children with care.",
    faq: [
      { q: "Do you use child-safe products?", a: "Yes, we exclusively use tear-free, hypoallergenic, and child-safe products for all kids' services." },
      { q: "At what age can I bring my child for their first haircut?", a: "We welcome children of all ages. For first haircuts, we take extra time to ensure they are comfortable." },
    ]
  },
  men: {
    title: "Men's Salon & Grooming",
    subtitle: "Precision cuts, beard styling, and absolute relaxation.",
    heroImage: "/src/assets/hero-man-after.jpg",
    description: "Experience premium grooming tailored for the modern man. From bespoke haircuts to rejuvenating spa rituals.",
    faq: [
      { q: "Do I need an appointment?", a: "While we accept walk-ins, we highly recommend booking an appointment to avoid waiting times." },
      { q: "What products do you use for beard styling?", a: "We use premium international brands for all beard grooming to ensure a soft, sharp, and healthy beard." },
    ]
  },
  women: {
    title: "Women's Salon & Spa",
    subtitle: "Elevate your beauty with our signature rituals.",
    heroImage: "/src/assets/hero-woman-after.jpg",
    description: "Indulge in a luxury salon experience. Our expert stylists and therapists bring out your natural glow.",
    faq: [
      { q: "Do you offer consultations before hair coloring?", a: "Yes, every chemical treatment begins with a thorough consultation and hair health check." },
      { q: "Are your spa rooms private?", a: "Absolutely. We have dedicated, luxurious private spa rooms for maximum relaxation." },
    ]
  },
  bridal: {
    title: "Bridal Studio",
    subtitle: "Flawless artistry for your most special day.",
    heroImage: "/src/assets/bridal-hero.jpg",
    description: "Our elite bridal team ensures you look breathtaking. From traditional Mehendi to MAC HD makeup.",
    faq: [
      { q: "Do you provide on-venue makeup services?", a: "Yes, our bridal team travels to venues. Travel charges may apply outside Eluru." },
      { q: "When should I book a makeup trial?", a: "We recommend booking a trial 1-2 months before your wedding date." },
    ]
  },
  groom: {
    title: "Groom's Studio",
    subtitle: "Sharp, confident, and wedding-ready.",
    heroImage: "/src/assets/hero-man-before.jpg",
    description: "Premium grooming packages designed specifically for the groom. Look your absolute best for the big day.",
    faq: [
      { q: "What does the groom package include?", a: "Our packages can be customized, typically including a haircut, beard styling, facial, pedicure, and massage." },
      { q: "How far in advance should a groom get a facial?", a: "We recommend a facial 3-5 days before the wedding events begin." },
    ]
  }
};
