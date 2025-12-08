import { clsx, type ClassValue } from "clsx";
import { capitalize } from "lodash-es";
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
  currencyCode,
  locale = "en-NG",
}: {
  amount: number;
  currencyCode: string;
  locale?: string;
}) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

export const formatStatus = (status: string) =>
  status
    .split("_")
    .map((s) => capitalize(s))
    .join(" ");
