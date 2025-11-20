import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export const convertToLocale = ({
  amount,
  currency_code,
  locale = "en-NG",
}: {
  amount: number;
  currency_code: string;
  locale?: string;
}) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency_code,
  }).format(amount);
};
