import React from "react";
import { Chip } from "@heroui/react";
import currencyFormatter from "currency-formatter";
import { Deposit, DepositsResponse, DepositStatus, StatusColor } from "./deposit.schema";

export const mapDeposits = (response: DepositsResponse | Deposit[]): Deposit[] => {
  if (Array.isArray(response)) return response;
  return response?.data ?? [];
};

export const statusColorMap: Record<DepositStatus, StatusColor> = {
  paid: "success",
  pending: "warning",
  failed: "danger",
  canceled: "default",
  in_transit: "primary",
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const formatMoney = (amountInCents: number, currency: string): string => {
  return currencyFormatter.format(amountInCents / 100, { code: currency.toUpperCase() });
};

export const makeRenderCell = (): ((deposit: Deposit, columnKey: string) => React.ReactNode) => {
  const renderCell = (deposit: Deposit, columnKey: string): React.ReactNode => {
    switch (columnKey) {
      case "date":
        return <p className="text-small">{formatDate(deposit.created)}</p>;

      case "orderNumber":
        return <p className="text-small">{deposit.orderNumber || deposit.metadata?.order_number || "-"}</p>;

      case "salePrice":
        return (
          <p className="text-small">
            {deposit.grossChargeAmount ? formatMoney(deposit.grossChargeAmount, deposit.currency) : "-"}
          </p>
        );

      case "deposit":
        return <p className="text-small">{formatMoney(deposit.amount, deposit.currency)}</p>;

      case "payment": {
        const paymentMethod = deposit.paymentMethodType === "affirm" ? "affirm" : "card";
        return <p className="text-small capitalize">{paymentMethod}</p>;
      }

      case "customer":
        return <p className="text-small">{deposit.customerEmail || "-"}</p>;

      case "status": {
        const color = statusColorMap[(deposit.status as DepositStatus) || "canceled"] || "default";
        return (
          <Chip className="capitalize" color={color} size="sm" variant="flat">
            {deposit.status}
          </Chip>
        );
      }

      default:
        return null;
    }
  };

  return renderCell;
};

