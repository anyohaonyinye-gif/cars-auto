import { siteConfig } from "@/config/site";

export function formatCurrency(amount: number, currency: string = siteConfig.currency) {
  return new Intl.NumberFormat(siteConfig.locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number) {
  return new Intl.NumberFormat(siteConfig.locale).format(amount);
}

export function formatMileage(kilometers: number) {
  return `${formatNumber(kilometers)} km`;
}
