# Zim-Volt Solar & Electrical Web Template

> High-converting, mobile-first web template tailored for Zimbabwean solar, back-up power, and electrical contractors. The core objective is conversion via instant WhatsApp messaging, clear USD pricing, and an interactive solar load calculator optimized for low-bandwidth mobile networks in Harare and across Zimbabwe.

---

## ⚡ Key Highlights

- **10-Minute Onboarding**: All business names, phone numbers, WhatsApp numbers, suburbs, and packages are driven by a centralized `config.js` / `src/config.ts`.
- **Direct WhatsApp Conversion Engine**:
  - Packages trigger pre-formatted WhatsApp chat links with the chosen package name and USD price.
  - Solar load calculator allows homeowners to check appliances (Fridges, Borehole Pumps, Wi-Fi, Lights) and sends the exact breakdown to the installer's WhatsApp with one tap.
  - Floating WhatsApp bubble with radar ping animation + sticky bottom mobile action bar.
- **Zimbabwe Market Context**:
  - Addressed directly to 16+ hour load-shedding pain points.
  - ZETDC compliance & Certificate of Compliance (COC) trust proof.
  - Suburb coverage (Borrowdale, Avondale, Mount Pleasant, Greendale, Ruwa, Chitungwiza, Norton, etc.).
  - Inductive surge calculations for borehole pumps and refrigeration compressors.
  - WhatsApp chat bubble testimonials styled like real WhatsApp messages.
  - Pricing note: USD pricing with official ZiG interbank equivalent accepted.
- **Performance**:
  - Lightweight, under 1MB initial payload target.
  - Native browser `loading="lazy"`.
  - Minimal service worker (`sw.js`) for offline and weak connection caching.
  - Schema.org LocalBusiness structured data & OpenGraph tags for Harare search engine ranking.

---

## 🚀 How to Onboard a New Solar Contractor (Under 10 Minutes)

Open `config.js` (or click **"Customize Template"** in the top bar of the web app) and update the details:

```javascript
const CONFIG = {
  businessName: "Zim-Volt Solar & Electrical",
  whatsappNumber: "263771234567", // Country code + phone without '+'
  phoneNumber: "+263 77 123 4567",
  email: "info@zimvoltsolar.co.zw",
  physicalAddress: "123 Enterprise Road, Highlands, Harare",
  serviceAreas: ["Borrowdale", "Avondale", "Mount Pleasant", "Greendale", "Ruwa", "Chitungwiza", "Norton"],
  currencySymbol: "USD",
  pricingNote: "Prices in USD. Equivalent ZiG accepted at prevailing official rate.",
  packages: [
    {
      id: "starter",
      name: "Starter Power System",
      price: 650,
      idealFor: "Lights, TV, Wi-Fi router, phone charging",
      specs: ["1.2kW Inverter", "100Ah Gel/Lithium Battery", "2x 450W Solar Panels", "Basic Surge Protection"]
    },
    {
      id: "home",
      name: "Standard Home System",
      price: 1800,
      idealFor: "Fridge/Freezer, Borehole Pump, TV, Wi-Fi, Full House Lighting",
      specs: ["3.2kW Hybrid Inverter", "2.5kWh Lithium Battery", "4x 550W Mono Solar Panels", "Free Site Visit & ZETDC-Compliant Wiring"]
    },
    {
      id: "commercial",
      name: "Full House & Commercial",
      price: 3500,
      idealFor: "Geysers, Cold Rooms, Workshop Equipment, Heavy Boreholes",
      specs: ["5kW/8kW Sunsynk/Growatt Inverter", "5kWh Lithium Battery", "8x 550W Panels", "Full Certificate of Compliance (COC)"]
    }
  ]
};
```

---

## 🛠️ Project Structure

```text
zim-volt/
├── index.html                   # SEO optimized HTML entry with JSON-LD Schema
├── metadata.json                # AI Studio manifest
├── public/
│   ├── config.js                # Standalone vanilla JS configuration
│   └── sw.js                    # Minimal service worker for caching
├── src/
│   ├── App.tsx                  # Core React application
│   ├── config.ts                # TypeScript configuration & catalog
│   ├── types.ts                 # Type definitions
│   ├── index.css                # Tailwind CSS v4 styling & typography
│   └── components/
│       ├── Header.tsx           # Sticky header with Call & WhatsApp buttons
│       ├── Hero.tsx             # High-converting headline & power status
│       ├── TrustStrip.tsx       # 500+ installs, 5-yr warranty, brand badges
│       ├── PackagesGrid.tsx     # USD pricing cards with WhatsApp links
│       ├── SolarCalculator.tsx  # Interactive load estimator & WhatsApp sender
│       ├── Portfolio.tsx        # Filterable past projects + lightbox modal
│       ├── CoverageTrust.tsx    # Suburb checker & 4 trust guarantees
│       ├── WhatsAppReviews.tsx  # WhatsApp chat bubble testimonials
│       ├── FaqAccordion.tsx     # Zimbabwe solar FAQ accordion
│       ├── Footer.tsx           # Contact details & hours
│       ├── FloatingWhatsApp.tsx # Floating pulse WhatsApp bubble
│       ├── MobileActionBar.tsx  # Sticky bottom action bar for mobile
│       └── ConfigCustomizerModal.tsx # Fast onboarding & live export modal
└── README.md
```

---

## 📲 WhatsApp Link Formats

1. **Package Inquiry:**
   `https://wa.me/263771234567?text=Hi%20Zim-Volt%2C%20I%20am%20interested%20in%20the%20[Package%20Name]%20($[Price])`

2. **Calculator Load Recommendation:**
   `https://wa.me/263771234567?text=Hi%20Zim-Volt%2C%20I%20used%20your%20calculator.%20Selected%20load%3A%20Fridge%2C%20Borehole%20Pump%2C%20Wi-Fi.%20Recommended%20setup%3A%203kW%20system.%20Please%20contact%20me%20for%20a%20site%20visit.`

---

## ⚡ Deployment

- **GitHub Pages / Cloudflare Pages / Netlify**: Run `npm run build` and publish the `dist/` folder.
- **Zero-Build Option**: The template also supports direct vanilla deployment using `public/config.js` and pure HTML.
