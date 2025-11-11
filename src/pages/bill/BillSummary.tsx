import React, { useMemo, useState } from "react";
import styles from "./Bill.module.css";
import {
  createInvoice,
  InvoicePayload,
  IPaymentData,
  ModeOfPayment,
  PaymentStatus,
} from "@/services/invoice/createInvoice";
import Select from "react-select";
import { generateInvoice } from "@/services/invoice/generatepdf";
import { toast } from "react-toastify";
interface Props {
  totalTaxable: number;
  totalAmount: number;
  payload: Omit<InvoicePayload, "paymentData">;
  resetBill: () => void;
}

export const BillSummary = ({
  totalTaxable,
  totalAmount,
  payload,
  resetBill,
}: Props) => {
  const [paymentData, setPaymentData] = useState<IPaymentData | null>(null);
  const requiredPaylod: InvoicePayload = useMemo(() => {
    return { ...payload, paymentData };
  }, [payload, paymentData]);

  const handleSelect = (name: string, value: ModeOfPayment | PaymentStatus) => {
    if (name === "mode") {
      setPaymentData((prev) => ({
        ...(prev || {}),
        modeOfPayment: value as ModeOfPayment,
      }));
    } else {
      setPaymentData((prev) => ({
        ...(prev || {}),
        paymentStatus: value as PaymentStatus,
        pendingAmount:
          value === "paid" ? 0 : value === "unpaid" ? totalAmount : null,
      }));
    }
  };
  const paymentOption: { label: string; value: ModeOfPayment }[] = [
    { label: "Cash", value: "cash" },
    { label: "Online", value: "online" },
    { label: "Card", value: "card" },
    { label: "other", value: "other" },
  ];
  const statusOptions: Array<{ label: string; value: PaymentStatus }> = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Partial", value: "partial" },
  ];

  const isButtonDisable = useMemo(() => {
    return (
      !paymentData ||
      paymentData.pendingAmount === undefined ||
      totalAmount === 0
    );
  }, [paymentData, totalAmount]);

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
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="me-3 text-uppercase"> Mode of payment:</div>
            <Select
              options={paymentOption}
              value={paymentOption.find(
                (opt) => opt.value === paymentData?.modeOfPayment
              )}
              isDisabled={totalAmount === 0}
              onChange={(opt) => {
                handleSelect("mode", opt.value as ModeOfPayment);
              }}
            />
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between mt-2">
            <div className="me-3 text-uppercase">Payment status:</div>
            <Select
              options={statusOptions}
              isDisabled={totalAmount === 0}
              value={statusOptions.find(
                (opt) => opt.value === paymentData?.paymentStatus
              )}
              onChange={(opt) => {
                handleSelect("status", opt.value as PaymentStatus);
              }}
            />
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between mt-2">
            <div className="me-3 text-uppercase">Pending Amount:</div>
            <input
              type="number"
              disabled={totalAmount === 0}
              value={
                paymentData?.paymentStatus === "paid"
                  ? 0
                  : paymentData?.paymentStatus === "unpaid"
                  ? totalAmount
                  : paymentData?.pendingAmount
              }
              onChange={(e) => {
                setPaymentData((prev) => ({
                  ...prev,
                  pendingAmount: Number(e.target.value || 0),
                }));
              }}
              required
            />
          </div>
        </div>

        <div className={`${styles.actionGroup} mt-3`}>
          <div className={styles.totalBox}>NET ₹ {totalAmount.toFixed(2)}</div>
          <button
            className={`${styles.previewBtn} ${
              isButtonDisable ? "opacity-50" : ""
            }`}
            onClick={async () => {
              const data = await createInvoice(requiredPaylod);
              if (data) {
                try {
                  generateInvoice(data);
                  resetBill();
                  setPaymentData(null);
                } catch (err) {
                  toast.error("Error generating invoice!");
                }
              }
            }}
            disabled={isButtonDisable}
          >
            Preview & Print
          </button>
        </div>
      </div>
    </div>
  );
};
