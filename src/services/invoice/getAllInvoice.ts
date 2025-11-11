import axios from "axios";

// Define interfaces
export interface IInvoice {
    id:string;
    invoiceNumber:string;
    
}

export interface InvoiceRes {
  
  metaData: {
    totalPages: number;
  };
}
export interface InvoicePayload{
    start:number;
    limit:number;
}

// API function
export const getAllInvoice = async (payload:InvoicePayload) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.post(`${API_BASE}/invoice/getAll`,payload);
    return res.data as InvoiceRes;
  } catch (error) {
    console.error("Error loading customers:", error);
    throw error;
  }
};
