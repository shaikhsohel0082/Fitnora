import React, { useMemo, useState, useEffect } from "react";
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

// Define a default/initial payment state
const initialPaymentState: IPaymentData = {
  modeOfPayment: "cash",
  paymentStatus: "unpaid",
  paidAmount: 0,
};

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
  // Initialize with a default state, not null
  const [paymentData, setPaymentData] =
    useState<IPaymentData>(initialPaymentState);

  // Use a temporary state for the input field to prevent flicker/delay
  const [paidInput, setPaidInput] = useState(0);

  // 1. Synchronize paidInput with totalAmount when component mounts or totalAmount changes
  useEffect(() => {
    // If totalAmount changes (e.g., items added/removed), reset payment data for safety
    setPaymentData((prev) => ({
      ...prev,
      paymentStatus: totalAmount === 0 ? "unpaid" : prev.paymentStatus,
      paidAmount: totalAmount === 0 ? 0 : prev.paidAmount,
    }));
    setPaidInput(totalAmount === 0 ? 0 : paidInput);
  }, [totalAmount]);

  // 2. Derive the final payload
  const requiredPaylod: InvoicePayload = useMemo(() => {
    // Calculate pending amount correctly here, based on the current paidInput
    const paid = paidInput > totalAmount ? totalAmount : paidInput;
    const pending = totalAmount - paid;

    return {
      ...payload,
      paymentData: {
        ...paymentData,
        paidAmount: paid,
        pendingAmount: pending,
        paymentStatus:
          paid === 0 ? "unpaid" : paid < totalAmount ? "partial" : "paid",
      },
    };
  }, [payload, paymentData, paidInput, totalAmount]);

  const handleSelect = (name: string, value: ModeOfPayment | PaymentStatus) => {
    if (name === "mode") {
      setPaymentData((prev) => ({
        ...prev,
        modeOfPayment: value as ModeOfPayment,
      }));
    } else {
      // Logic for Payment Status change
      const newStatus = value as PaymentStatus;
      setPaymentData((prev) => ({
        ...prev,
        paymentStatus: newStatus,
      }));

      // Update the paid amount input state directly based on status
      if (newStatus === "paid") {
        setPaidInput(totalAmount);
      } else if (newStatus === "unpaid") {
        setPaidInput(0);
      } else {
        // For partial, keep the existing value or default to 0
        setPaidInput((prev) => (prev > 0 && prev < totalAmount ? prev : 0));
      }
    }
  };

  const paymentOption: { label: string; value: ModeOfPayment }[] = [
    { label: "Cash", value: "cash" },
    { label: "Online", value: "online" },
    { label: "Card", value: "card" },
    { label: "other", value: "other" },
    { label: "NA", value: "na" },
  ];
  const statusOptions: Array<{ label: string; value: PaymentStatus }> = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Partial", value: "partial" },
  ];

  const isButtonDisable = useMemo(() => {
    // Check if total amount is > 0 and if the required mode is selected
    if (totalAmount === 0) return true;
    if (
      payload.productDetails.some(
        (product) => product.productId.trim() === "" || !product.unit
      )
    ) {
      return true;
    }
    if (!paymentData.modeOfPayment) return true;

    // Check if the paid amount is a valid number and not negative
    const paid = requiredPaylod.paymentData.paidAmount;
    if (typeof paid !== "number" || isNaN(paid) || paid < 0) return true;

    return false;
  }, [
    totalAmount,
    payload.productDetails,
    paymentData.modeOfPayment,
    requiredPaylod.paymentData.paidAmount,
  ]);

  // Custom reset function to ensure all states are cleared
  const handleReset = () => {
    resetBill();
    setPaymentData(initialPaymentState); // Reset to initial state
    setPaidInput(0); // Reset input value
  };

  return (
    <div className={`${styles.card}`}>
      <div className={`${styles.summaryRow} d-flex flex-column`}>
        <div>
          {/* Using Rs. instead of ₹ to avoid rendering issue */}
          <div className="me-3">
            <strong>Gross:</strong> Rs. {totalAmount.toFixed(2)}
          </div>
          <div>
            <strong>CGST@8%:</strong> Rs. {totalAmount.toFixed(2)}
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="me-3 text-uppercase"> Mode of payment:</div>
            <Select
              options={paymentOption}
              value={paymentOption.find(
                (opt) => opt.value === paymentData.modeOfPayment
              )}
              isDisabled={totalAmount === 0}
              onChange={(opt) => {
                handleSelect("mode", opt!.value as ModeOfPayment);
              }}
            />
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between mt-2">
            <div className="me-3 text-uppercase">Payment status:</div>
            <Select
              options={statusOptions}
              isDisabled={totalAmount === 0}
              value={statusOptions.find(
                (opt) => opt.value === paymentData.paymentStatus
              )}
              onChange={(opt) => {
                handleSelect("status", opt!.value as PaymentStatus);
              }}
            />
          </div>
          <div className="d-flex align-items-center w-100 justify-content-between mt-2">
            <div className="me-3 text-uppercase">Paid Amount:</div>
            <input
              type="number"
              disabled={
                totalAmount === 0 ||
                paymentData.paymentStatus === "paid" ||
                paymentData.paymentStatus === "unpaid"
              }
              // Display the value from the paidInput state
              value={paidInput}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                // Prevent paid amount from exceeding total amount in the input
                if (newValue <= totalAmount) {
                  setPaidInput(newValue);

                  // Automatically switch status to 'partial' if user starts editing the input
                  if (newValue > 0 && newValue < totalAmount) {
                    setPaymentData((prev) => ({
                      ...prev,
                      paymentStatus: "partial",
                    }));
                  }
                } else {
                  // If the user tries to input more than total amount, set it to total amount
                  setPaidInput(totalAmount);
                  setPaymentData((prev) => ({
                    ...prev,
                    paymentStatus: "paid",
                  }));
                  toast.info("Paid amount cannot exceed Total Amount.");
                }
              }}
              required
            />
          </div>
        </div>

        <div className={`${styles.actionGroup} mt-3`}>
          <div className={styles.totalBox}>
            NET Rs. {totalAmount.toFixed(2)}
          </div>
          <button
            className={`${styles.previewBtn} ${
              isButtonDisable ? "opacity-50" : ""
            }`}
            onClick={async () => {
              const data = await createInvoice(requiredPaylod);
              if (data) {
                try {
                  generateInvoice(data);
                  handleReset();
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
