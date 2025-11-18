import axios from "axios";
import { PaymentStatus } from "./createInvoice";

export interface IUpdateInvoice{
    id:string;
    paidAmount:number;
    paymentStatus:PaymentStatus
}
export const updateInvoice = async (payload: IUpdateInvoice) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.post(`${API_BASE}/invoice/update`, payload);
    return res;
  } catch (error) {
    console.error("Error loading Products:", error);
    throw error;
  }
};
