export type ServiceInfo = {
  slug: string;
  title: string;
  href: string;
  summary: string;
};

export const services: ServiceInfo[] = [
  {
    slug: "vehicle-selection",
    title: "Vehicle Selection",
    href: "/services/vehicle-selection",
    summary:
      "Describe the budget, body type, and preferred make so Cars Auto can help you compare suitable options.",
  },
  {
    slug: "sourcing",
    title: "Vehicle Sourcing",
    href: "/services/vehicle-selection#sourcing",
    summary:
      "Ask about a vehicle that is not in the sample inventory. The team can say whether they are able to help look for it.",
  },
  {
    slug: "trade-in",
    title: "Trade-In",
    href: "/services/trade-in",
    summary:
      "Send details of your current vehicle for review. A value is not confirmed until the dealership has assessed it.",
  },
  {
    slug: "logistics",
    title: "Logistics and Import Assistance",
    href: "/services/logistics",
    summary:
      "Enquire about bringing in a vehicle. Customs charges, shipping costs, and dates are confirmed outside this website.",
  },
  {
    slug: "after-sales",
    title: "After-Sales Support",
    href: "/services/after-sales",
    summary:
      "Contact the dealership about an ownership question. Warranty cover and servicing terms are confirmed by Cars Auto.",
  },
  {
    slug: "modifications",
    title: "Vehicle Modifications",
    href: "/modifications",
    summary:
      "Tell the team about an upgrade you want to discuss. Categories are enquiry topics, not a promise that every item is offered.",
  },
];

export const modificationCategories = [
  { value: "infotainment", label: "Infotainment" },
  { value: "reversing-camera", label: "Reversing cameras" },
  { value: "parking", label: "Parking assistance" },
  { value: "interior", label: "Interior upgrades" },
  { value: "exterior", label: "Exterior upgrades" },
  { value: "other", label: "Other customization requests" },
] as const;
