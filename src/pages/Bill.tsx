import React, { useState } from "react";
import styles from "./Bill.module.css";

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
  disc: "", // percent or amount (we'll treat as percent)
  gst: "", // percent
  amount: 0,
};

const Bill = () => {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    gst: "",
  });

  const [items, setItems] = useState([{ ...defaultRow }]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleCustomerChange = (e) =>
    setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...items];
    updated[index][name] = value;

    // parse numeric fields
    const qty = Number(updated[index].qty || 0);
    const rate = Number(updated[index].rate || 0);
    const discPct = Number(updated[index].disc || 0);
    const gstPct = Number(updated[index].gst || 0);

    const base = qty * rate;
    const discAmt = (discPct / 100) * base;
    const afterDisc = base - discAmt;
    const gstAmt = (gstPct / 100) * afterDisc;
    const total = parseFloat((afterDisc + gstAmt).toFixed(2));

    updated[index].amount = total;
    setItems(updated);
  };

  const addRow = () => setItems([...items, { ...defaultRow }]);
  const removeRow = (i) => setItems(items.filter((_, idx) => idx !== i));

  const totalTaxable = items.reduce((s, it) => s + Number(it.qty || 0) * Number(it.rate || 0), 0);
  const totalAmount = items.reduce((s, it) => s + Number(it.amount || 0), 0);

  const handleLogout = () => {
    localStorage.removeItem("bill_auth");
    window.location.href = "/login";
  };

  const openPrintPreview = () => {
    // Build the printable HTML string using the current data
    const shopHeader = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="width:45%">
          <h2 style="margin:0">FITNORA GLOBAL PRIVATE LIMITED</h2>
          <div style="font-size:12px;margin-top:6px">SENAPATI BAPAT ROAD PUNE- 411016</div>
          <div style="font-size:12px">MOB: 9834012163</div>
          <div style="font-size:12px">GSTIN: 27AJDPC23AM1Z</div>
        </div>
        <div style="width:45%;text-align:right">
          <h3 style="margin:0">GST TAX INVOICE</h3>
          <div style="font-size:13px;margin-top:6px">Inv No: ${invoiceNo || "CR/000"}</div>
          <div style="font-size:13px">Date: ${date}</div>
        </div>
      </div>
      <hr style="margin:12px 0" />
    `;

    const customerBlock = `
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <div style="width:60%">
          <strong>To:</strong> ${customer.name || ""} <br/>
          ${customer.address ? `<div style="font-size:12px">${customer.address}</div>` : ""}
        </div>
        <div style="width:35%;text-align:right">
          <strong>GST:</strong> ${customer.gst || "-"}
        </div>
      </div>
    `;

    const tableHeader = `
      <table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead>
          <tr>
            <th class="th">HSN</th>
            <th class="th">Product Name</th>
            <th class="th">Mfg</th>
            <th class="th">Unit</th>
            <th class="th">Qty</th>
            <th class="th">Sch</th>
            <th class="th">Batch</th>
            <th class="th">Exp</th>
            <th class="th">M.R.P.</th>
            <th class="th">Rate</th>
            <th class="th">Disc%</th>
            <th class="th">Gst%</th>
            <th class="th">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map((it) => {
              return `
                <tr>
                  <td class="td">${it.hsn || ""}</td>
                  <td class="td">${it.product || ""}</td>
                  <td class="td">${it.mfg || ""}</td>
                  <td class="td">${it.unit || ""}</td>
                  <td class="td">${it.qty || ""}</td>
                  <td class="td">${it.sch || ""}</td>
                  <td class="td">${it.batch || ""}</td>
                  <td class="td">${it.exp || ""}</td>
                  <td class="td">${it.mrp || ""}</td>
                  <td class="td">${it.rate || ""}</td>
                  <td class="td">${it.disc || ""}</td>
                  <td class="td">${it.gst || ""}</td>
                  <td class="td">${it.amount?.toFixed ? it.amount.toFixed(2) : it.amount}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;

    const totalsBlock = `
      <div style="display:flex;justify-content:flex-end;margin-top:12px">
        <div style="width:320px;border:1px solid #000;padding:8px">
          <div style="display:flex;justify-content:space-between"><div>Taxable</div><div>₹ ${totalTaxable.toFixed(2)}</div></div>
          <div style="display:flex;justify-content:space-between"><div>Gross</div><div>₹ ${totalAmount.toFixed(2)}</div></div>
          <hr style="margin:8px 0" />
          <div style="display:flex;justify-content:space-between;font-weight:bold"><div>NET</div><div>₹ ${totalAmount.toFixed(2)}</div></div>
        </div>
      </div>
    `;

    const footer = `
      <div style="margin-top:18px;font-size:12px">
        <div>For HEALTH PLUS MEDICO</div>
        <div style="margin-top:30px">Authorised Signatory</div>
      </div>
    `;

    const style = `
      <style>
        body { font-family: Arial, sans-serif; color: #111; padding: 18px; }
        table { border-collapse: collapse; width: 100%; }
        .th { border: 1px solid #333; padding: 6px; background: #f6f6f6; font-weight:600; text-align:left; }
        .td { border: 1px solid #ddd; padding: 6px; text-align:left; font-size:12px; }
      </style>
    `;

    const html = `<!doctype html><html><head><meta charset="utf-8">${style}</head><body>${shopHeader}${customerBlock}${tableHeader}${totalsBlock}${footer}</body></html>`;

    const w = window.open("", "_blank", "width=900,height=800");
    if (!w) {
      alert("Please allow popups for print preview.");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();

    // give some time to render then call print
    setTimeout(() => {
      w.print();
    }, 500);
  };

  return (
    <div className={styles.billContainer}>
      <div className={styles.billHeader}>
        <div>
          <h2 className={styles.pageTitle}>Bill Generator (Fitnora)</h2>
          <div className={styles.metaRow}>
            <label>Invoice No:</label>
            <input className={styles.smallInput} value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            <label style={{ marginLeft: 12 }}>Date:</label>
            <input className={styles.smallInput} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <h3>Customer Details</h3>
        <div className={styles.row}>
          <input name="name" placeholder="Customer Name" value={customer.name} onChange={handleCustomerChange} />
          <input name="gst" placeholder="GST No. (optional)" value={customer.gst} onChange={handleCustomerChange} />
        </div>
        <input name="address" placeholder="Customer Address" value={customer.address} onChange={handleCustomerChange} />
      </div>

      <div className={styles.card}>
        <h3>Items</h3>
        <div className={styles.tableWrap}>
          <table className={styles.billTable}>
            <thead className={styles.billTableHead}>
              <tr>
                <th>HSN</th>
                <th>Product Name</th>
                <th>Mfg</th>
                <th>Unit</th>
                <th>Qty</th>
                <th>Sch</th>
                <th>Batch</th>
                <th>Exp</th>
                <th>M.R.P.</th>
                <th>Rate</th>
                <th>Disc%</th>
                <th>Gst%</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((it, idx) => (
                <tr key={idx}>
                  <td><input name="hsn" value={it.hsn} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="product" value={it.product} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="mfg" value={it.mfg} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="unit" value={it.unit} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="qty" type="number" value={it.qty} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="sch" value={it.sch} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="batch" value={it.batch} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="exp" value={it.exp} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="mrp" type="number" value={it.mrp} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="rate" type="number" value={it.rate} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="disc" type="number" value={it.disc} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td><input name="gst" type="number" value={it.gst} onChange={(e) => handleItemChange(idx, e)} /></td>
                  <td>{it.amount?.toFixed ? it.amount.toFixed(2) : it.amount}</td>
                  <td>
                    <button className={styles.removeBtn} onClick={() => removeRow(idx)} title="Remove row">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.rowActions}>
          <button className={styles.addBtn} onClick={addRow}>+ Add Item</button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.summaryRow}>
          <div>
            <div><strong>Taxable Amount:</strong> ₹ {totalTaxable.toFixed(2)}</div>
            <div><strong>Gross:</strong> ₹ {totalAmount.toFixed(2)}</div>
          </div>

          <div className={styles.actionGroup}>
            <div className={styles.totalBox}>NET ₹ {totalAmount.toFixed(2)}</div>
            <button className={styles.previewBtn} onClick={openPrintPreview}>Preview & Print</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Bill;