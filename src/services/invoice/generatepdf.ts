import axios from "axios";

export const generateInvoice = async (id: string) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.get(`${API_BASE}/pdf/${id}`, {
      responseType: "blob", // Expect PDF blob
    });

    // Create a blob URL and open it in a new tab
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl); //  opens print preview

    return true;
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    throw error;
  }
};
