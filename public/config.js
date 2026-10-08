/**
 * Zim-Volt Centralized Configuration File
 * Onboard any Zimbabwean solar or electrical contractor in under 10 minutes.
 */
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

if (typeof module !== 'undefined') {
  module.exports = CONFIG;
}
