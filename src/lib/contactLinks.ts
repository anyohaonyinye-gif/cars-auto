import { siteConfig } from "@/config/site";

export function phoneHref() {
  return `tel:${siteConfig.phoneE164}`;
}

export function emailHref(subject?: string) {
  if (!subject) return `mailto:${siteConfig.email}`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}

export function mapsHref() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`;
}

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  const text = message?.trim();
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

type VehicleEnquiry = {
  year: number;
  make: string;
  model: string;
  stockNumber?: string;
};

export function vehicleEnquiryMessage(
  vehicle: VehicleEnquiry,
  intent: "info" | "viewing" | "availability" | "pricing" = "info",
) {
  const name = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  const stock = vehicle.stockNumber ? ` Stock reference: ${vehicle.stockNumber}.` : "";

  if (intent === "viewing") {
    return `Hello Cars Auto, I would like to request a viewing for the ${name}.${stock} Please confirm whether a viewing can be arranged.`;
  }

  if (intent === "availability") {
    return `Hello Cars Auto, I would like to enquire about availability for the ${name}.${stock}`;
  }

  if (intent === "pricing") {
    return `Hello Cars Auto, I would like to enquire about pricing for the ${name}.${stock} Please confirm the current figure.`;
  }

  return `Hello Cars Auto, I am interested in the ${name}. Please provide more information and confirm its availability.${stock}`;
}

export function enquiryWhatsAppMessage(lines: Array<[string, string]>) {
  const details = lines
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join("\n");

  return `Hello Cars Auto, I visited your website and would like to enquire.\n\n${details}`;
}
