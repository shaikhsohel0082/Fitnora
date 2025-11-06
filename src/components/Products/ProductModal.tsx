import React, { useState, useEffect } from "react";
import styles from "./ProductModal.module.css";

export interface ProductForm {
  image?: File;
  name: string;
  units: string;
  mrp: string;
  selling_price: string;
  hsn_number: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductForm) => void;
  initialData?: ProductForm | null;
  title: string;
}

const ProductModal: React.FC<Props> = ({ open, onClose, onSubmit, initialData, title }) => {
  const [form, setForm] = useState<ProductForm>({
    image: undefined,
    name: "",
    units: "",
    mrp: "",
    selling_price: "",
    hsn_number: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (field: keyof ProductForm, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.units || !form.mrp || !form.selling_price || !form.hsn_number) {
      alert("Please fill all required fields.");
      return;
    }
    onSubmit(form);
    onClose();
  };

  const handleClose = () => {
  // Reset form to initial state
  setForm({
    image: undefined,
    name: "",
    units: "",
    mrp: "",
    selling_price: "",
    hsn_number: "",
  });
  onClose();
};

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.formGrid}>
          <label>
            <span className={styles.labelText}>Image</span>
            <input type="file" accept="image/*" onChange={(e) => handleChange("image", e.target.files?.[0])} />
          </label>

          <label>
            <span className={styles.labelText}>Product Name *</span>
            <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>Units (gm) *</span>
            <input value={form.units} onChange={(e) => handleChange("units", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>MRP *</span>
            <input type="number" value={form.mrp} onChange={(e) => handleChange("mrp", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>Selling Price *</span>
            <input type="number" value={form.selling_price} onChange={(e) => handleChange("selling_price", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>Product HSN Number *</span>
            <input value={form.hsn_number} onChange={(e) => handleChange("hsn_number", e.target.value)} />
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;