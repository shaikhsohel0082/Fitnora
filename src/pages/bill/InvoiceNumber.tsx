import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvoiceNumber } from "@/services/invoice/getInvoiceNumber";

interface Props {
  setInvoiceNumber: React.Dispatch<React.SetStateAction<string>>
}
const InvoiceNumber = ({setInvoiceNumber}:Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["invoiceNumber"],
    queryFn: getInvoiceNumber,
  });
  useEffect(() => {
    if (data) {
      setInvoiceNumber(data);
    }
  }, [data]);

  if (isLoading) return <p>Loading invoice number...</p>;
  if (isError) return <p>Failed to fetch invoice number.</p>;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>
        <label htmlFor="invoice" className="fs-5 me-3">
          Invoice Number:
        </label>
      </h3>
      <input
        type="text"
        value={data}
        disabled
        id="invoice"
        className="bg-white opacity-50"
      />
    </div>
  );
};

export default InvoiceNumber;
