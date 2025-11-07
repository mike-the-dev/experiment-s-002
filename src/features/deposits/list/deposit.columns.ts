// deposit.columns.ts
export const depositColumnKeys = [
  "date",
  "orderNumber",
  "salePrice",
  "deposit",
  "payment",
  "customer",
  "status",
] as const;

export type DepositColumnKey = typeof depositColumnKeys[number];

export type DepositColumn = {
  name: string;
  uid: DepositColumnKey;
  sortable?: boolean;
};

export const depositColumns = [
  { name: "DATE", uid: "date", sortable: true },
  { name: "ORDER#", uid: "orderNumber" },
  { name: "SALE PRICE", uid: "salePrice", sortable: true },
  { name: "DEPOSIT", uid: "deposit", sortable: true },
  { name: "PAYMENT", uid: "payment" },
  { name: "CUSTOMER", uid: "customer" },
  { name: "STATUS", uid: "status" },
] satisfies ReadonlyArray<DepositColumn>;

