import axios from "axios";
import { ModeOfPayment, PaymentStatus } from "./createInvoice";

// Define interfaces
export interface IAllInvoice {
  id: string;
  invoiceNumber: string;
  customerDetails: {
    customerId: string;
    customerName: string;
  };
  productDetails: {
    productId: string;
    amount: number;
    modeOfPayment: ModeOfPayment;
    paymentStatus?: PaymentStatus;
    paidAmount: number | null;
    totalDiscount:number;
    gstAmount:number
  };

  date:string;
}

export interface IAllInvoiceRes {
  data:IAllInvoice[],
  totalAmount:number,
  totalPaidAmount:number,
  metaData: {
    totalPages: number;
  };
}
export interface IAllInvoicePayload {
  start: number;
  limit: number;
  filter?:PaymentStatus;
  search?:string;
}

// API function
export const getAllInvoice = async (payload: IAllInvoicePayload) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.post(`${API_BASE}/invoice/getAll`, payload);
    return res.data as IAllInvoiceRes;
  } catch (error) {
    console.error("Error loading customers:", error);
    throw error;
  }
};
