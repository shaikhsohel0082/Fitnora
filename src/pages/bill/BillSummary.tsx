import React, { useMemo } from "react";
import styles from "./Bill.module.css";
import {
  createInvoice,
  InvoicePayload,
} from "@/services/invoice/createInvoice";
interface Props {
  totalTaxable: number;
  totalAmount: number;
  payload: InvoicePayload;
}
export const BillSummary = ({ totalTaxable, totalAmount, payload }: Props) => {
  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.summaryRow}  d-flex flex-column`}>
        <div>
          <div className="me-3">
            <strong>Gross:</strong> ₹ {totalAmount.toFixed(2)}
          </div>
          <div>
            <strong>CGST@8%:</strong> ₹ {totalAmount.toFixed(2)}
          </div>
          <div></div>
          <div></div>
        </div>

        <div className={`${styles.actionGroup} mt-3`}>
          <div className={styles.totalBox}>NET ₹ {totalAmount.toFixed(2)}</div>
          <button
            className={styles.previewBtn}
            onClick={() => {
              createInvoice(payload);
            }}
          >
            Preview & Print
          </button>
        </div>
      </div>
    </div>
  );
};
