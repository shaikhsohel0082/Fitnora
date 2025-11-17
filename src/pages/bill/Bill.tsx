import React, { useMemo, useState } from "react";
import styles from "./Bill.module.css";
import { CustomerSelect } from "./CustomerSelect";
import { ItemTable } from "./ItemTable";
import { BillSummary } from "./BillSummary";
import { InvoicePayload } from "@/services/invoice/createInvoice";
import InvoiceNumber from "./InvoiceNumber";

const defaultRow = {
  hsn: "",
  product: "",
  mfg: "",
  unit: "",
  qty: "",
  sch: "",
  batch: "",
  exp: "",
  mrp: "",
  rate: "",
  disc: "",
  gst: "18",
  amount: 0,
  unitMrpList: [],
  id: "",
};

const Bill = () => {
  const initailCustomer={
    name: "",
    address: "",
    gst: "",
    id: "",
    margin_percentage: "",
  }
  const [customerDetails, setCustomerDetails] = useState(initailCustomer);
  const [items, setItems] = useState([{ ...defaultRow }]);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const handleProductSelect = (index: number, productData: any) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      hsn: productData.hsn_number || "",
      product: productData.label || "",
      unitMrpList: productData.unitMrpList || "",
      id: productData.value,
      mrp: "0",
    };
    setItems(updated);
  };

  const addRow = () => setItems([...items, { ...defaultRow }]);
  const removeRow = (i: number) =>
    setItems(items.filter((_, idx) => idx !== i));

  const totalTaxable = items.reduce(
    (s, it) => s + Number(it.qty || 0) * Number(it.rate || 0),
    0
  );
  const totalAmount = items.reduce((s, it) => s + Number(it.amount || 0), 0);
  const payload: Omit<InvoicePayload, "paymentData"> = useMemo(
    () => ({
      customerId:
        customerDetails?.id?.trim() !== "" ? customerDetails.id : null,
      productDetails: items?.map((item) => ({
        productId: item.id,
        unit: Number(item.unit),
        mrp: Number(item.mrp),
        rate: Number(item.rate),
        qty: Number(item.qty),
        disc: Number(item.disc),
        amount: item.amount,
      })),
      invoiceNumber,
      totalAmount,
    }),
    [customerDetails.id, invoiceNumber, items, totalAmount]
  );

  const resetBill=()=>{
    setCustomerDetails(initailCustomer);
    setItems([defaultRow]);
    setInvoiceNumber('');
  }
  return (
    <div className={styles.billContainer}>
      <h2 className={styles.pageTitle}>Bill Generator (Fitnora)</h2>

      <div className="d-flex align-items-center justify-content-evenly w-50">
        <InvoiceNumber setInvoiceNumber={setInvoiceNumber} />
        {/* Customer Section */}
        <CustomerSelect setCustomerDetails={setCustomerDetails} customerDetails={customerDetails}/>
      </div>

      {/* Product Table */}
      <ItemTable
        items={items}
        setItems={setItems}
        addRow={addRow}
        removeRow={removeRow}
        onProductSelect={handleProductSelect}
        margin={Number(customerDetails.margin_percentage || 0)}
      />

      {/* Bill Summary */}
      <BillSummary
        totalTaxable={totalTaxable}
        totalAmount={totalAmount}
        payload={payload}
        resetBill={resetBill}
      />
    </div>
  );
};

export default Bill;
