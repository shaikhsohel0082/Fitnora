import React, { useState } from "react";
import styles from "./Bill.module.css";
import { CustomerSelect } from "./CustomerSelect";
import { ItemTable } from "./ItemTable";
import { BillSummary } from "./BillSummary";

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
  unitMrpList:[],
  id:""
};

const Bill = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    gst: "",
  });

  const [items, setItems] = useState([{ ...defaultRow }]);
  const [margin,setMargin]=useState(0);
  const handleProductSelect = (index: number, productData: any) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      hsn: productData.hsn_number || "",
      product: productData.label || "",
      unitMrpList: productData.unitMrpList || "",
      id:productData.value,
      mrp:"0"
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

  return (
    <div className={styles.billContainer}>
      <h2 className={styles.pageTitle}>Bill Generator (Fitnora)</h2>

      {/* Customer Section */}
      <CustomerSelect setCustomerDetails={setCustomerDetails} setMargin={setMargin}/>

      {/* Product Table */}
      <ItemTable
        items={items}
        setItems={setItems}
        addRow={addRow}
        removeRow={removeRow}
        onProductSelect={handleProductSelect}
        margin={margin}
      />

      {/* Bill Summary */}
      <BillSummary totalTaxable={totalTaxable} totalAmount={totalAmount} />
    </div>
  );
};

export default Bill;
