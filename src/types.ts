export interface SolarPackage {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
  idealFor: string;
  specs: string[];
  inverterRating: string;
  batteryCapacity: string;
  panelCount: string;
  turnaroundDays: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'borehole' | 'repairs';
  location: string;
  systemSize: string;
  description: string;
  specs: string[];
  imageUrl: string;
  beforeAfter?: {
    beforeDesc: string;
    afterDesc: string;
  };
}

export interface ApplianceItem {
  id: string;
  name: string;
  runningWatts: number;
  surgeMultiplier: number;
  typicalHoursPerDay: number;
  category: 'essential' | 'cooling' | 'heavy' | 'security';
  icon: string;
  defaultQty?: number;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  suburb: string;
  time: string;
  message: string;
  system: string;
  rating: number;
  avatarUrl?: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface AppConfig {
  businessName: string;
  tagline: string;
  whatsappNumber: string; // digits only with country code, e.g. 263771234567
  phoneNumber: string; // display string
  email: string;
  physicalAddress: string;
  serviceAreas: string[];
  currencySymbol: string;
  pricingNote: string;
  yearsInBusiness: number;
  completedInstalls: number;
  warrantyYears: number;
  packages: SolarPackage[];
}
