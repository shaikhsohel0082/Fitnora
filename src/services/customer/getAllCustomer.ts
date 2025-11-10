import axios from "axios";

// Define interfaces
export interface ICustomer {
    id:string;
  name: string;
  address: string;
  gst: string;
  mobile: string;
  margin_percentage: string;
}

export interface CustomerRes {
  data: ICustomer[];
  metaData: {
    hasMore: boolean;
  };
}
export interface ICustomerPayload{
    start:number;
    limit:number;
    searchTerm:string;
}

// API function
export const getAllCustomers = async (payload:ICustomerPayload) => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.post(`${API_BASE}/customers/getAll`,payload);
    return res.data as CustomerRes;
  } catch (error) {
    console.error("Error loading customers:", error);
    throw error;
  }
};
