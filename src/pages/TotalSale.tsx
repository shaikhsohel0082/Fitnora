import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "./TotalSale.module.css";

interface Invoice {
  id: number;
  invoice_no: string;
  customer_name: string;
  gross_amount: number;
  discount_amount: number;
  gst_amount: number;
  net_amount: number;
  date: string;
  status: "PAID" | "UNPAID" | "PARTIAL" | string;
  payment_mode?: string;
  paid_amount?: number; // for partial
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

// Sample invoices
const SAMPLE_INVOICES: Invoice[] = [
  {
    id: 1,
    invoice_no: "INV001",
    customer_name: "Rahul Sharma",
    gross_amount: 1500,
    discount_amount: 100,
    gst_amount: 270,
    net_amount: 1670,
    date: "2025-11-01",
    status: "PAID",
    payment_mode: "Cash",
    paid_amount: 1670,
  },
  {
    id: 2,
    invoice_no: "INV002",
    customer_name: "Anita Verma",
    gross_amount: 2500,
    discount_amount: 200,
    gst_amount: 450,
    net_amount: 2750,
    date: "2025-11-03",
    status: "PARTIAL",
    payment_mode: "UPI",
    paid_amount: 1000,
  },
  {
    id: 3,
    invoice_no: "INV003",
    customer_name: "Suresh Kumar",
    gross_amount: 1200,
    discount_amount: 50,
    gst_amount: 228,
    net_amount: 1378,
    date: "2025-11-05",
    status: "UNPAID",
    payment_mode: "Credit Card",
    paid_amount: 0,
  },
];

const TotalSale: React.FC = () => {
  const [invoices] = useState<Invoice[]>(SAMPLE_INVOICES);

  // calculate totals
  const totalNet = invoices.reduce((sum, inv) => sum + inv.net_amount, 0);
  const totalRemaining = invoices.reduce((sum, inv) => {
    if (inv.status === "PARTIAL") return sum + (inv.net_amount - (inv.paid_amount ?? 0));
    if (inv.status === "UNPAID") return sum + inv.net_amount;
    return sum;
  }, 0);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Total Sale Report</h2>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Gross</th>
              <th>Discount</th>
              <th>GST</th>
              <th>Net</th>
              <th>Status</th>
              <th>Remaining</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const remaining =
                inv.status === "PARTIAL"
                  ? inv.net_amount - (inv.paid_amount ?? 0)
                  : inv.status === "UNPAID"
                  ? inv.net_amount
                  : 0;

              return (
                <tr key={inv.id}>
                  <td>{inv.invoice_no}</td>
                  <td className={styles.customerCol}>{inv.customer_name}</td>
                  <td>{new Date(inv.date).toLocaleDateString()}</td>
                  <td>{currency.format(inv.gross_amount)}</td>
                  <td>{currency.format(inv.discount_amount)}</td>
                  <td>{currency.format(inv.gst_amount)}</td>
                  <td className={styles.netAmount}>{currency.format(inv.net_amount)}</td>
                  <td>
                    <span
                      className={
                        inv.status === "PAID"
                          ? styles.badgeSuccess
                          : inv.status === "PARTIAL"
                          ? styles.badgeWarn
                          : styles.badgeNeutral
                      }
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td>{remaining > 0 ? currency.format(remaining) : "-"}</td>
                  <td>{inv.payment_mode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={styles.totals}>
            <p><strong>Total Net Amount:</strong> {currency.format(totalNet)}</p>
            <p className={styles.totalRemaining}>
                <strong>Total Remaining Amount:</strong> {currency.format(totalRemaining)}
            </p>
        </div>
      </div>
    </Layout>
  );
};

export default TotalSale;