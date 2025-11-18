import { ModeOfPayment, PaymentStatus } from "@/services/invoice/createInvoice";

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
export {paymentOption,statusOptions}