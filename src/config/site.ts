export const siteConfig = {
  name: "CARS AUTO",
  shortName: "Cars Auto",
  description:
    "Cars Auto helps customers in Accra explore brand-new and fairly used vehicles, compare specifications, and enquire directly with the dealership.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "carsauto@dealers.com",
  phoneDisplay: "0505701248",
  phoneE164: "+233505701248",
  whatsappDisplay: "0597374457",
  whatsappNumber: "233597374457",
  address: {
    street: "Boundary Road, 10 Blackberry Street",
    city: "Accra",
    country: "Ghana",
    full: "Boundary Road, 10 Blackberry Street, Accra, Ghana",
  },
  currency: "GHS",
  locale: "en-GH",
  defaultWhatsAppMessage:
    "Hello Cars Auto, I visited your website and would like to enquire about your vehicles.",
} as const;

export const enquirySubjects = [
  { value: "availability", label: "Vehicle availability" },
  { value: "pricing", label: "Vehicle pricing" },
  { value: "viewing", label: "Request a viewing" },
  { value: "information", label: "Request more information" },
  { value: "trade-in", label: "Trade-in" },
  { value: "sourcing", label: "Vehicle sourcing" },
  { value: "logistics", label: "Logistics and import" },
  { value: "after-sales", label: "After-sales support" },
  { value: "modification", label: "Vehicle modification" },
  { value: "general", label: "General enquiry" },
] as const;

export type EnquirySubject = (typeof enquirySubjects)[number]["value"];
