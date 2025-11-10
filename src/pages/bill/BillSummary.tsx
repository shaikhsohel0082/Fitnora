import React from "react";
import styles from "./Bill.module.css";

export const BillSummary = ({ totalTaxable, totalAmount }: any) => {
  return (
    <div className={styles.card}>
      <div className={styles.summaryRow}>
        <div>
          <div>
            <strong>Taxable Amount:</strong> ₹ {totalTaxable.toFixed(2)}
          </div>
          <div>
            <strong>Gross:</strong> ₹ {totalAmount.toFixed(2)}
          </div>
        </div>

        <div className={styles.actionGroup}>
          <div className={styles.totalBox}>NET ₹ {totalAmount.toFixed(2)}</div>
          <button className={styles.previewBtn}>Preview & Print</button>
        </div>
      </div>
    </div>
  );
};
