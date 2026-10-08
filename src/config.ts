import { AppConfig, ApplianceItem, PortfolioProject, TestimonialItem, FaqItem } from './types';

export const INITIAL_CONFIG: AppConfig = {
  businessName: "Zim-Volt Solar & Electrical",
  tagline: "Reliable Solar & Back-Up Power Across Harare",
  whatsappNumber: "263771234567", // Country code + phone without '+'
  phoneNumber: "+263 77 123 4567",
  email: "info@zimvoltsolar.co.zw",
  physicalAddress: "123 Enterprise Road, Highlands, Harare",
  serviceAreas: [
    "Borrowdale",
    "Avondale",
    "Mount Pleasant",
    "Greendale",
    "Highlands",
    "Chisipite",
    "Ruwa",
    "Chitungwiza",
    "Norton",
    "Westgate",
    "Mabelreign",
    "Waterfalls"
  ],
  currencySymbol: "USD",
  pricingNote: "Prices in USD. Equivalent ZiG accepted at prevailing official rate.",
  yearsInBusiness: 7,
  completedInstalls: 520,
  warrantyYears: 5,
  packages: [
    {
      id: "starter",
      name: "Starter Power System",
      price: 650,
      idealFor: "Lights, TV, Wi-Fi router, phone charging & laptop work",
      specs: [
        "1.2kW Pure Sine Wave Inverter",
        "100Ah Gel / LiFePO4 Battery Bank",
        "2x 450W Tier-1 Mono Solar Panels",
        "Basic AC/DC Surge & Lightning Protection",
        "Free 1-Day Harare Installation"
      ],
      inverterRating: "1.2kW",
      batteryCapacity: "1.2kWh / 100Ah",
      panelCount: "2 Panels (900W)",
      turnaroundDays: 2
    },
    {
      id: "home",
      name: "Standard Home System",
      price: 1800,
      popular: true,
      idealFor: "Fridge/Freezer, Borehole Pump, TV, Wi-Fi, Full House Lighting",
      specs: [
        "3.2kW Hybrid Smart Inverter",
        "2.5kWh Lithium (LiFePO4) Battery with BMS",
        "4x 550W Mono Half-Cell Solar Panels",
        "Automatic ZESA Changeover Switch",
        "Free Site Visit & ZETDC-Compliant Wiring",
        "5-Year Manufacturer Warranty on Battery"
      ],
      inverterRating: "3.2kW Hybrid",
      batteryCapacity: "2.5kWh Lithium",
      panelCount: "4 Panels (2,200W)",
      turnaroundDays: 3
    },
    {
      id: "commercial",
      name: "Full House & Commercial",
      price: 3500,
      idealFor: "Geysers, Cold Rooms, Workshop Equipment, Heavy Boreholes & Large Homes",
      specs: [
        "5kW/8kW Sunsynk or Growatt Hybrid Inverter",
        "5kWh High-Cycle Lithium Battery Bank",
        "8x 550W Tier-1 Monocrystalline Panels",
        "Full Certificate of Compliance (COC) Included",
        "Smart Mobile App Monitoring (Wi-Fi/GPRS)",
        "Dedicated Heavy Load Sub-Distribution Board"
      ],
      inverterRating: "5kW / 8kW Sunsynk/Growatt",
      batteryCapacity: "5kWh LiFePO4",
      panelCount: "8 Panels (4,400W)",
      turnaroundDays: 3
    }
  ]
};

export const APPLIANCE_CATALOG: ApplianceItem[] = [
  {
    id: "led_lights",
    name: "LED House Lights (up to 10)",
    runningWatts: 90,
    surgeMultiplier: 1.1,
    typicalHoursPerDay: 7,
    category: "essential",
    icon: "Lightbulb",
    defaultQty: 1
  },
  {
    id: "wifi_router",
    name: "Wi-Fi Router & Starlink / Fibroniks",
    runningWatts: 30,
    surgeMultiplier: 1.0,
    typicalHoursPerDay: 24,
    category: "essential",
    icon: "Wifi",
    defaultQty: 1
  },
  {
    id: "tv_decoder",
    name: "55\" Smart TV + DStv Decoder + Soundbar",
    runningWatts: 140,
    surgeMultiplier: 1.2,
    typicalHoursPerDay: 6,
    category: "essential",
    icon: "Tv",
    defaultQty: 1
  },
  {
    id: "fridge_freezer",
    name: "Double Door Fridge / Deep Chest Freezer",
    runningWatts: 250,
    surgeMultiplier: 4.5, // Inductive compressor motor surge!
    typicalHoursPerDay: 12,
    category: "cooling",
    icon: "Refrigerator",
    defaultQty: 1
  },
  {
    id: "borehole_pump",
    name: "Borehole Submersible Pump (0.75HP - 1.5HP)",
    runningWatts: 1100,
    surgeMultiplier: 3.5, // Heavy inductive surge on startup
    typicalHoursPerDay: 3,
    category: "heavy",
    icon: "Droplets",
    defaultQty: 0
  },
  {
    id: "electric_fence",
    name: "Electric Fence Energizer & Gate Motor",
    runningWatts: 85,
    surgeMultiplier: 2.0,
    typicalHoursPerDay: 24,
    category: "security",
    icon: "ShieldAlert",
    defaultQty: 1
  },
  {
    id: "microwave",
    name: "Microwave Oven / Air Fryer (Daytime Use)",
    runningWatts: 1200,
    surgeMultiplier: 1.5,
    typicalHoursPerDay: 0.5,
    category: "heavy",
    icon: "Zap",
    defaultQty: 0
  },
  {
    id: "booster_pump",
    name: "Water Pressure Booster Pump (0.5HP)",
    runningWatts: 375,
    surgeMultiplier: 3.0,
    typicalHoursPerDay: 2,
    category: "heavy",
    icon: "Gauge",
    defaultQty: 0
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "proj-1",
    title: "5kW Sunsynk Hybrid System in Borrowdale Brooke",
    category: "residential",
    location: "Borrowdale Brooke, Harare",
    systemSize: "5kW Hybrid + 5.12kWh Lithium",
    description: "Full residential back-up tackling 18-hour daily ZESA cuts. Runs inverter fridge, borehole pump, 2 computers, Wi-Fi, and 12 LED circuits automatically.",
    specs: ["5kW Sunsynk Inverter", "5.12kWh Felicity LiFePO4", "8x 550W Canadian Solar Panels", "Neat trunking & COC issued"],
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
    beforeAfter: {
      beforeDesc: "Dangling cables, blown inverter fuse from generator spike",
      afterDesc: "Flush wall-mounted battery cabinet, automated changeover"
    }
  },
  {
    id: "proj-2",
    title: "Solar Direct Borehole Pumping in Mount Pleasant",
    category: "borehole",
    location: "Mount Pleasant, Harare",
    systemSize: "1.5HP AC Borehole Pump on Solar VFD",
    description: "Eliminated generator diesel costs for 70m borehole. Installed solar VFD controller running directly off 6 high-output solar panels from 8:00 AM to 4:30 PM daily.",
    specs: ["2.2kW Solar VFD Pump Inverter", "6x 550W Tier-1 Panels", "Dry run & tank full sensors", "Zero grid/ZESA dependency"],
    imageUrl: "https://images.unsplash.com/photo-1545209575-705d8f615410?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "proj-3",
    title: "Commercial Butchery & Cold Room Backup in Chitungwiza",
    category: "commercial",
    location: "Unit D, Chitungwiza",
    systemSize: "8kW Growatt + 10kWh Battery Bank",
    description: "Protects $6,000+ meat stock during unpredictable outages. Seamless sub-10ms transfer ensures compressors never stall or blow start capacitors.",
    specs: ["8kW Growatt SPF Hybrid", "2x 5kWh Dyness Lithium Batteries", "14x 545W Mono Panels", "3-Phase Monitoring"],
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "proj-4",
    title: "Standard Home 3.2kW Setup in Avondale",
    category: "residential",
    location: "Avondale, Harare",
    systemSize: "3.2kW Hybrid + 2.5kWh Lithium",
    description: "The most requested family setup in Harare. Installed in just 2 days. Powers double-door fridge, entertainment, and all night security floodlights.",
    specs: ["3.2kW Must Hybrid Inverter", "2.5kWh Felicity Battery", "4x 550W Jinko Panels", "Harare City Council DB Compliant"],
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "proj-5",
    title: "Dangerous Distribution Board Rewire & COC Certification",
    category: "repairs",
    location: "Greendale, Harare",
    systemSize: "ZETDC Electrical Board Overhaul",
    description: "Replaced 1980s porcelain rewirable fuses with modern DIN rail breakers, earth leakage protection, and dedicated inverter bypass isolation switches.",
    specs: ["DIN Rail 12-way Sub-Board", "30mA Earth Leakage Relay", "Inverter Manual Bypass Switch", "Official ZETDC COC Certificate"],
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "proj-6",
    title: "Ruwa Agricultural Smallholding Solar Pumping",
    category: "borehole",
    location: "Ruwa Outskirts",
    systemSize: "3kW Borehole + Booster Combo",
    description: "Solar pumping solution for market gardening vegetable tunnels. Fills 10,000L Jojo tanks without a single drop of fuel or ZESA grid power.",
    specs: ["3kW Solar Pump Controller", "8x 450W Mono Panels", "Float switch automation", "Steel ground-mount frame"],
    imageUrl: "https://images.unsplash.com/photo-1558441719-8b449c6ff673?auto=format&fit=crop&w=1000&q=80"
  }
];

export const WHATSAPP_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    clientName: "Eng. Farai M.",
    suburb: "Borrowdale, Harare",
    time: "09:42 AM",
    system: "5kW Sunsynk + 5kWh Lithium",
    message: "Installed in Borrowdale during 18-hour load shedding, system ran the fridge seamlessly. The changeover is so fast my desktop computer doesn't even flicker when ZESA goes. Tinashe and team finished the whole job in 2 days clean trunking. Ndinotenda zvikuru!",
    rating: 5,
    verified: true
  },
  {
    id: "test-2",
    clientName: "Mrs. Rutendo Chidziwa",
    suburb: "Mount Pleasant, Harare",
    time: "02:15 PM",
    system: "Solar Borehole Setup",
    message: "Our borehole pump was struggling with low ZESA voltage (180V) and tripping the old fuse. Zim-Volt installed a solar direct drive with 6 panels. Water is pumping daily now! Highly recommend them for any borehole job.",
    rating: 5,
    verified: true
  },
  {
    id: "test-3",
    clientName: "Kudakwashe Moyo",
    suburb: "Chitungwiza",
    time: "06:30 PM",
    system: "8kW Commercial Backup",
    message: "Our butchery in Chitungwiza was losing cold room stock to power cuts. This commercial backup system saved us over $4,000 in meat spoilage in the first month alone. Honest guys, transparent USD pricing, no hidden costs.",
    rating: 5,
    verified: true
  },
  {
    id: "test-4",
    clientName: "Dr. Sarah Van Der Merwe",
    suburb: "Avondale, Harare",
    time: "11:05 AM",
    system: "3.2kW Standard Home System",
    message: "Avondale family home — neat wiring, no ugly wires dangling across the passage. ZETDC passed the COC inspection without questions. The WhatsApp support is very quick whenever I ask a question.",
    rating: 5,
    verified: true
  }
];

export const TRUST_EQUIPMENT_BRANDS = [
  { name: "Sunsynk", tier: "Premium Inverters", origin: "UK/SA Standard" },
  { name: "Growatt", tier: "Hybrid Inverters", origin: "Global Tier 1" },
  { name: "Deye", tier: "Smart Inverters", origin: "Heavy Duty" },
  { name: "Felicity Solar", tier: "LiFePO4 Batteries", origin: "Proven In Zim" },
  { name: "Canadian Solar", tier: "Mono Panels", origin: "High Irradiance" },
  { name: "Pylontech", tier: "Lithium Storage", origin: "10-Yr Reliability" },
  { name: "Must Solar", tier: "Affordable Backup", origin: "Budget Friendly" }
];

export const FAQS: FaqItem[] = [
  {
    question: "Do you offer free site visits before quoting?",
    answer: "Yes, 100% free! For Greater Harare, Chitungwiza, Ruwa, and Norton, our certified technicians visit your premises to inspect your distribution board (DB), measure roof angle/shading, assess your water pump ratings, and verify surge loads. You receive an accurate, firm quote with no surprise fees.",
    category: "Inspection"
  },
  {
    question: "What warranty comes with the lithium batteries & inverters?",
    answer: "We supply genuine Grade-A equipment with manufacturer-backed warranties: Lithium (LiFePO4) batteries come with a 5-year replacement warranty (6,000 cycles). Inverters (Sunsynk, Growatt, Deye) include 3 to 5 years warranty, and solar panels come with a 25-year 80% linear power output guarantee. We also give a 1-year workmanship warranty on all cabling and trunking.",
    category: "Warranty"
  },
  {
    question: "Can I expand my solar system later?",
    answer: "Absolutely. All our inverters are modern hybrid units. You can start with our Starter or Standard Home system and later add extra lithium batteries or more solar panels without replacing the main inverter unit.",
    category: "Expansion"
  },
  {
    question: "What payment methods do you accept? (USD Cash, ZiG, Nostro)",
    answer: "We accept USD Cash on installation, EcoCash USD, Nostro FCA transfers, and bank transfers. We also accept equivalent ZiG at the prevailing official interbank rate for equipment & labor upon agreement.",
    category: "Payments"
  },
  {
    question: "How long does installation take?",
    answer: "Most residential systems (1.2kW to 5kW) are completed in 1 to 2 working days. Commercial and large three-phase installations take 2 to 4 days. We test every appliance with you on-site before sign-off.",
    category: "Installation"
  },
  {
    question: "Will the solar system automatically kick in when ZESA cuts?",
    answer: "Yes! Our hybrid systems have a transfer time under 10 milliseconds. You will not notice when ZESA drops — TV, Wi-Fi, computers, and fridges will continue running without restarting.",
    category: "Performance"
  }
];

export function buildWhatsAppQuoteUrl(
  whatsappNumber: string,
  packageName: string,
  price: number,
  currency: string = "USD"
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(
    `Hi Zim-Volt, I am interested in the ${packageName} (${currency} $${price}). Please provide more details and availability for a site visit.`
  );
  return `https://wa.me/${cleanNumber}?text=${text}`;
}

export function buildWhatsAppCalculatorUrl(
  whatsappNumber: string,
  selectedLoadSummary: string,
  recommendedSystem: string,
  suburb: string = ""
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const suburbText = suburb ? ` My location is in ${suburb}.` : '';
  const text = encodeURIComponent(
    `Hi Zim-Volt, I used your solar load calculator.${suburbText}\n\nSelected load: ${selectedLoadSummary}.\nRecommended setup: ${recommendedSystem}.\n\nPlease contact me for a free site visit and quotation.`
  );
  return `https://wa.me/${cleanNumber}?text=${text}`;
}

export function buildWhatsAppGeneralUrl(
  whatsappNumber: string,
  message: string = "Hi Zim-Volt, I need a solar installation quote for my property in Harare."
): string {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
