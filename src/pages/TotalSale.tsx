import React, { useMemo, useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "./TotalSale.module.css";
import { useInvoices } from "@/hooks/Invoice/getAllInvoice";
import InfiniteScroll from "@/components/InfiniteScroll/InfiniteScroll";
import { generateInvoice } from "@/services/invoice/generatepdf";
import Modal from "@/components/Modal/Modal";
import { IAllInvoice } from "@/services/invoice/getAllInvoice";
import Select, { components } from "react-select";
import { statusOptions } from "@/hooks/data";
import {
  IUpdateInvoice,
  updateInvoice,
} from "@/services/invoice/updateInvoice";
import {
  InvoicePayload,
  PaymentStatus,
} from "@/services/invoice/createInvoice";
import { toast } from "react-toastify";

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
    refetch,
  } = useInvoices();
  const [isOpen, setIsopen] = useState(false);
  const [editInvoiceId, setEditInvoiceId] = useState("");
  const invoiceToBeEdited = useMemo(() => {
    if (editInvoiceId.trim() === "") return null;
    return invoices.find((inv) => inv.id === editInvoiceId);
  }, [editInvoiceId, invoices]);
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
                <th>View</th>
                <th>Edit</th>
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
                    <td
                      className={styles.viewBill}
                      onClick={() => {
                        generateInvoice(inv.id);
                      }}
                    >
                      view
                    </td>
                    <td
                      className={`text-danger cursor-pointer ${
                        inv.productDetails.paymentStatus === "paid"
                          ? "opacity-50"
                          : ""
                      }`}
                    >
                      <i
                        className="fa fa-pencil"
                        onClick={() => {
                          if (inv.productDetails.paymentStatus) {
                            setIsopen(true);
                            setEditInvoiceId(inv.id);
                          }
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsopen(false);
        }}
        children={
          <EditInvoice
            inv={invoiceToBeEdited}
            onClose={() => {
              setIsopen(false);
              refetch();
            }}
          />
        }
      />
    </Layout>
  );
};
const EditInvoice = ({
  inv,
  onClose,
}: {
  inv: IAllInvoice;
  onClose: () => void;
}) => {
  const [invData, setInvData] = useState<{
    amount: number;
    paymentStatus: PaymentStatus;
  }>({ amount: 0, paymentStatus: inv.productDetails.paymentStatus });
  const totalPending =
    inv.productDetails.amount - inv.productDetails.paidAmount - invData.amount;
  return (
    <div className={`d-flex flex-column`}>
      <h5 className="align-self-center">{inv.invoiceNumber}</h5>
      <div className="mt-3 d-flex justify-content-between">
        <label htmlFor="total" className="fw-bold">
          Total Amount:
        </label>{" "}
        <input
          type="number"
          value={inv.productDetails.amount}
          id="total"
          disabled={true}
        />
      </div>
      <div className="mt-3 d-flex justify-content-between">
        <label htmlFor="prevAmount" className="fw-bold">
          Prev received Amount:
        </label>{" "}
        <input
          type="number"
          value={inv.productDetails.paidAmount}
          id="prevAmount"
          disabled
        />
      </div>
      <div className="mt-3 d-flex justify-content-between">
        <label htmlFor="pending" className="fw-bold">
          Pending Amount:
        </label>{" "}
        <input
          type="number"
          value={(
            inv.productDetails.amount - inv.productDetails.paidAmount
          )?.toFixed(2)}
          id="pending"
          disabled
        />
      </div>
      <div className="mt-3 d-flex justify-content-between">
        <label htmlFor="now" className="fw-bold">
          Amount received now:
        </label>{" "}
        <input
          type="number"
          value={invData.amount}
          id="now"
          onChange={(e) => {
            setInvData((prev) => ({
              ...prev,
              amount: Number(e.target.value),
            }));
          }}
        />
      </div>
      <div className="mt-3 w-100 d-flex justify-content-around">
        <button className="btn btn-danger" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-success"
          disabled={invData.amount===0}
          onClick={() => {
            if (inv.id) {
              const payload: IUpdateInvoice = {
                id: inv.id,
                paidAmount: invData.amount + inv.productDetails.paidAmount,
                paymentStatus:
                  totalPending === 0
                    ? "paid"
                    : totalPending === inv.productDetails.amount
                    ? "unpaid"
                    : "partial",
              };
              try {
                updateInvoice(payload);
                toast.success("Invoice Updated!");
                onClose();
              } catch (err) {
                toast.error(err.message || "Error updating invoice!");
              }
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
export default TotalSale;
