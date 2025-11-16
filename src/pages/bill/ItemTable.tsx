import React, { useCallback, useMemo, useState } from "react";
import { ProductSelect } from "./ProductSelect";
import styles from "./Bill.module.css";
import Select, { components } from "react-select";
import { IUnitMrp } from "@/services/products/getAllProducts";
export const ItemTable = ({
  items,
  setItems,
  addRow,
  removeRow,
  onProductSelect,
  margin,
}: any) => {
  const handleItemChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updated = [...items];
    updated[index][name] = value;

    const qty = Number(updated[index].qty || 0);
    const unit = Number(updated[index].unit || 0);
    const rate = Number(updated[index].rate || 0);
    const discPct = Number(updated[index].disc || 0);
    const gstPct = Number(0);

    const base = qty * rate;
    const discAmt = (discPct / 100) * base;
    const afterDisc = base - discAmt;
    const gstAmt = (gstPct / 100) * afterDisc;
    const total = parseFloat((afterDisc + gstAmt).toFixed(2));
    updated[index].amount = total;
    setItems(updated);
  };

  const handleSelect = (index: number, name: string, value: number) => {
    const updated = [...items];
    updated[index][name] = value;
    const mrpList = updated[index]["unitMrpList"].find(
      (item) => item.unit === value
    );
    updated[index]["mrp"] = mrpList.mrp;
    updated[index]["rate"] = mrpList.mrp * (1 - margin / 100);
    setItems(updated);
  };

  return (
    <div className={styles.card}>
      <h3>Items</h3>
      <table className={styles.billTable}>
        <thead>
          <tr>
            <th>Product</th>
            <th>HSN</th>
            <th>UNIT(g)</th>
            <th>MRP</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Disc%</th>
            <th>GST%</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it: any, idx: number) => (
            <tr key={it.id}>
              <td>
                <ProductSelect
                  onSelect={(p) => onProductSelect(idx, p)}
                  value={{ value: it.id, label: it.product }}
                />
              </td>
              <td>
                <input
                  name="hsn"
                  value={it.hsn}
                  onChange={(e) => handleItemChange(idx, e)}
                />
              </td>
              <td>
                <Select
                  placeholder="Select Unit"
                  options={it.unitMrpList?.map((ele) => ({
                    value: ele.unit,
                    label: ele.unit,
                  }))}
                  value={{label:it.unit,value:it.unit}}
                  id="unit"
                  onChange={(opt: any) =>
                    opt && handleSelect(idx, "unit", opt.value)
                  }
                  styles={{
                    menu: (base) => ({
                      ...base,
                      zIndex: 9999,
                      minWidth: "150px",
                    }),
                    container:(base)=>({
                      ...base,
                      minWidth:"max-content"
                    })
                  }}
                />
              </td>
              <td>
                <input type="number" name="mrp" value={it.mrp} disabled />
              </td>
              <td>
                <input name="rate" type="number" value={it.rate} disabled />
              </td>
              <td>
                <input
                  name="qty"
                  type="number"
                  value={it.qty}
                  min={0}
                  onChange={(e) => handleItemChange(idx, e)}
                />
              </td>

              <td>
                <input
                  name="disc"
                  type="number"
                  min={0}
                  value={it.disc}
                  onChange={(e) => handleItemChange(idx, e)}
                />
              </td>
              <td>
                <input
                  name="gst"
                  type="number"
                  min={0}
                  value={it.gst}
                  onChange={(e) => handleItemChange(idx, e)}
                  disabled={true}
                />
              </td>
              <td>{it.amount?.toFixed ? it.amount.toFixed(2) : it.amount}</td>
              <td>
                <button onClick={() => removeRow(idx)} className="btn btn-danger">✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={`${styles.addBtn} mt-3`} onClick={addRow}>
        + Add Item
      </button>
    </div>
  );
};
