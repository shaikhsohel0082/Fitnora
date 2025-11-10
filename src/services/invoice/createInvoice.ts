import axios from "axios";

export interface InvoicePayload {
  customerId?: string | null;
  productDetails: IProductInvoice[];
  invoiceNumber:string
}
export interface IProductInvoice {
  productId: string;
  unit: number;
  mrp: number;
  rate: number;
  qty: number;
  disc: number;
  amount: number;
  
}
export const createInvoice = async (payload: InvoicePayload) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.post(`${API_BASE}/invoice/create`, payload);
    return res.data as string;
  } catch (error) {
    console.error("Error loading Products:", error);
    throw error;
  }
};
