/**
 * Pricing utilities for APOC BnB using Dinero.js.
 * Handles nightly rates, discounts, and total calculations with proper currency math.
 */
import {
  dinero,
  add,
  subtract,
  multiply,
  toDecimal,
  toSnapshot,
} from "dinero.js";
import { USD } from "@dinero.js/currencies";

export type DineroAmount = ReturnType<typeof dinero>;

/** Create a Dinero amount from a dollar value (e.g. 150.00 → $150) */
export function fromDollars(amount: number): DineroAmount {
  return dinero({ amount: Math.round(amount * 100), currency: USD });
}

/** Format a Dinero amount to a user-friendly string like "$150.00" */
export function formatPrice(price: DineroAmount): string {
  return `$${toDecimal(price)}`;
}

/** Calculate the total for a stay: nightly rate × nights */
export function calculateStayTotal(
  nightlyRate: number,
  nights: number,
): DineroAmount {
  return multiply(fromDollars(nightlyRate), nights);
}

/** Apply a percentage discount (0–100) to a price. */
export function applyDiscount(
  price: DineroAmount,
  discountPercent: number,
): DineroAmount {
  if (discountPercent <= 0) return price;
  const discount = multiply(price, discountPercent / 100);
  return subtract(price, discount);
}

/** Calculate cleaning fee — flat rate. */
export function addCleaningFee(
  subtotal: DineroAmount,
  cleaningFee: number,
): DineroAmount {
  return add(subtotal, fromDollars(cleaningFee));
}

/** Full booking price breakdown. */
export interface PriceBreakdown {
  nightlyRate: string;
  nights: number;
  subtotal: string;
  cleaningFee: string;
  discount: string;
  total: string;
}

export function calculateBreakdown(params: {
  nightlyRate: number;
  nights: number;
  cleaningFee?: number;
  discountPercent?: number;
}): PriceBreakdown {
  const { nightlyRate, nights, cleaningFee = 0, discountPercent = 0 } = params;

  const nightly = fromDollars(nightlyRate);
  const subtotal = calculateStayTotal(nightlyRate, nights);
  const discountAmount =
    discountPercent > 0
      ? multiply(subtotal, discountPercent / 100)
      : fromDollars(0);
  const discounted = subtract(subtotal, discountAmount);
  const cleaning = fromDollars(cleaningFee);
  const total = add(discounted, cleaning);

  return {
    nightlyRate: formatPrice(nightly),
    nights,
    subtotal: formatPrice(subtotal),
    cleaningFee: formatPrice(cleaning),
    discount: `-${formatPrice(discountAmount)}`,
    total: formatPrice(total),
  };
}
