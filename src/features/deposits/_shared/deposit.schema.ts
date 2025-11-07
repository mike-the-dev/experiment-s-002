import Stripe from "stripe";

type EnrichedPayout = Stripe.Payout & {
  paymentMethodType: string | null;
  hasAffirm: boolean;
  chargeIds: string[];
  paymentIntentIds: string[];
  customerEmail: string | null;
  grossChargeAmount: number | null;
  totalFees: number | null;
  orderNumber: string | null;
};

// A single deposit item
export type Deposit = EnrichedPayout;

// The raw response shape from Stripe for list endpoints
export type DepositsResponse = Stripe.ApiList<EnrichedPayout>;

export interface FetchDepositsParams {
  stripeAccount: string;
  startingAfter?: string;
  endingBefore?: string;
}

export type DepositStatus =
  | "paid"
  | "pending"
  | "failed"
  | "canceled"
  | "in_transit";

export type StatusColor = "success" | "warning" | "danger" | "default" | "primary";

