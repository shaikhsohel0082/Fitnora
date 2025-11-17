import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "./TotalSale.module.css";
import { useInvoices } from "@/hooks/Invoice/getAllInvoice";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const TotalSale: React.FC = () => {
  const {
    invoices,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    totalAmount,
    pendingAmount,
  } = useInvoices();

  return (
    <Layout>
      <div className={styles.totals}>
        <p>
          <strong>Total Net Amount:{currency.format(totalAmount)}</strong>{" "}
        </p>
        <p className={styles.totalRemaining}>
          <strong>
            Total Remaining Amount:{currency.format(pendingAmount)}
          </strong>
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Total Sale Report</h2>
        </div>
        <InfiniteScroll
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        >
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
              {invoices?.map((inv) => {
                const remaining =
                  inv.productDetails.amount - inv.productDetails.paidAmount;

                return (
                  <tr key={inv.id}>
                    <td>{inv.invoiceNumber}</td>
                    <td className={styles.customerCol}>
                      {inv.customerDetails.customerName}
                    </td>
                    <td>{new Date(inv.date).toLocaleDateString()}</td>
                    <td>
                      {currency.format(
                        inv.productDetails.amount +
                          inv.productDetails.totalDiscount
                      )}
                    </td>
                    <td>{currency.format(inv.productDetails.totalDiscount)}</td>
                    <td>{currency.format(inv.productDetails.gstAmount)}</td>
                    <td className={styles.netAmount}>
                      {currency.format(inv.productDetails.amount)}
                    </td>
                    <td>
                      <span
                        className={`${
                          inv.productDetails.paymentStatus === "paid"
                            ? styles.badgeSuccess
                            : inv.productDetails.paymentStatus === "partial"
                            ? styles.badgeWarn
                            : styles.badgeNeutral
                        }`}
                      >
                        {inv.productDetails.paymentStatus}
                      </span>
                    </td>
                    <td>{remaining > 0 ? currency.format(remaining) : "-"}</td>
                    <td>{inv.productDetails.modeOfPayment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default TotalSale;
