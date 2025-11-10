import axios from "axios";

export const getInvoiceNumber = async () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.get(`${API_BASE}/invoice`);
    return res.data.invoiceNumber as string;
  } catch (error) {
    console.error("Error loading Products:", error);
    throw error;
  }
};
