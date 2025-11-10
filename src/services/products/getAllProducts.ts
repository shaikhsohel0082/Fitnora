import axios from "axios";

// Define interfaces
export interface Iproduct {
  id: string;
  name: string;
  image?: string;
  description: string;
  contents: string;
  benefits?: string[];
  hsn_number: string;
  unitMrpList: IUnitMrp[];
  stock: string;
}

export interface IUnitMrp {
  unit: number;
  mrp: number;
}
export interface productRes {
  data: Iproduct[];
  metaData: {
    hasMore: boolean;
  };
}
export interface IproductPayload {
  start: number;
  limit: number;
  searchTerm: string;
}

// API function
export const getAllproducts = async (payload: IproductPayload) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.post(`${API_BASE}/products/getAll`, payload);
    return res.data as productRes;
  } catch (error) {
    console.error("Error loading Products:", error);
    throw error;
  }
};
