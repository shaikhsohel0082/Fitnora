import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "./PercentageCalculator.module.css";

interface Row {
  label: string;
  weight: number;
  purchase: string;
  packaging: string;
  other: string;
  distMargin: string;
  selfMargin: string;
  mrpMargin: string;
  finalDiscount: string;
}

const PercentageCalculator: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([
    { label: "Small", weight: 100, purchase: "", packaging: "", other: "", distMargin: "60", selfMargin: "30", mrpMargin: "30", finalDiscount: "20" },
    { label: "Medium", weight: 500, purchase: "", packaging: "", other: "", distMargin: "60", selfMargin: "30", mrpMargin: "30", finalDiscount: "20" },
    { label: "Large", weight: 1000, purchase: "", packaging: "", other: "", distMargin: "60", selfMargin: "30", mrpMargin: "30", finalDiscount: "20" },
  ]);

  const handle = (i: number, field: keyof Row, value: string) => {
    const updated = [...rows];
    updated[i][field] = value;
    setRows(updated);
  };

  const add = (base: number, margin: number) => base + (base * margin) / 100;
  const less = (base: number, discount: number) => base - (base * discount) / 100;
  const fmt = (v: number) => `${v.toFixed(2)} (${Math.round(v)})`;

  return (
    <Layout>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Product Price Calculator</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Label</th>
              <th>Weight (gm)</th>
              <th>Purchase</th>
              <th>Packaging</th>
              <th>Other</th>
              <th>Subtotal</th>
              <th>Dist %</th>
              <th>Dist Price</th>
              <th>Self %</th>
              <th>Self Price</th>
              <th>MRP %</th>
              <th>MRP Price</th>
              <th>Discount %</th>
              <th>Final Price</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, i) => {
              const purchase = parseFloat(r.purchase) || 0;
              const packaging = parseFloat(r.packaging) || 0;
              const other = parseFloat(r.other) || 0;
              const d = parseFloat(r.distMargin) || 0;
              const s = parseFloat(r.selfMargin) || 0;
              const m = parseFloat(r.mrpMargin) || 0;
              const f = parseFloat(r.finalDiscount) || 0;

              const sub = purchase + packaging + other;
              const distP = add(sub, d);
              const selfP = add(distP, s);
              const mrpP = add(selfP, m);
              const finalP = less(mrpP, f);

              return (
                <tr key={i}>
                  <td>{r.label}</td>

                  <td>
                    <input type="number" value={r.weight} onChange={(e) => handle(i, "weight", e.target.value)} />
                  </td>

                  <td>
                    <input type="number" value={r.purchase} onChange={(e) => handle(i, "purchase", e.target.value)} />
                  </td>

                  <td>
                    <input type="number" value={r.packaging} onChange={(e) => handle(i, "packaging", e.target.value)} />
                  </td>

                  <td>
                    <input type="number" value={r.other} onChange={(e) => handle(i, "other", e.target.value)} />
                  </td>

                  <td>{fmt(sub)}</td>

                  <td>
                    <input type="number" value={r.distMargin} onChange={(e) => handle(i, "distMargin", e.target.value)} />
                  </td>
                  <td>{fmt(distP)}</td>

                  <td>
                    <input type="number" value={r.selfMargin} onChange={(e) => handle(i, "selfMargin", e.target.value)} />
                  </td>
                  <td>{fmt(selfP)}</td>

                  <td>
                    <input type="number" value={r.mrpMargin} onChange={(e) => handle(i, "mrpMargin", e.target.value)} />
                  </td>
                  <td>{fmt(mrpP)}</td>

                  <td>
                    <input type="number" value={r.finalDiscount} onChange={(e) => handle(i, "finalDiscount", e.target.value)} />
                  </td>
                  <td className={styles.final}>{fmt(finalP)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default PercentageCalculator;
