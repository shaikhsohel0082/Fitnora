import React, { useState, useEffect } from "react";
import styles from "./CustomerModal.module.css";

export interface CustomerForm {
  name: string;
  address: string;
  mobile: string;
  gst?: string;
  city: string;
  state: string;
  pincode: string;
  margin_percentage: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerForm) => void;
  initialData?: CustomerForm | null;
  title: string;
}

const CustomerModal: React.FC<Props> = ({ open, onClose, onSubmit, initialData, title }) => {
  const emptyData:CustomerForm={
    name: "",
    address: "",
    mobile: "",
    gst: "",
    city: "",
    state: "",
    pincode: "",
    margin_percentage: "",
  };
  const [form, setForm] = useState<CustomerForm>(emptyData);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (field: keyof CustomerForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const mobileRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;
    const margin = Number(form.margin_percentage);

    if (
      !form.name.trim() ||
      !form.address.trim() ||
      !form.mobile.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.pincode.trim() ||
      !String(form.margin_percentage)?.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!mobileRegex.test(form.mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
    }

    if (!pincodeRegex.test(form.pincode)) {
      alert("Pincode must be 6 digits.");
      return;
    }

    if (Number.isNaN(margin) || margin < 1 || margin > 100) {
      alert("Margin percentage must be between 1 to 100.");
      return;
    }

    onSubmit(form);
    setForm(emptyData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.formGrid}>
          <label>
            <span className={styles.labelText}>
              Name <span className={styles.req}>*</span>
            </span>
            <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>GST (optional)</span>
            <input value={form.gst} onChange={(e) => handleChange("gst", e.target.value)} />
          </label>

          <label className={styles.fullWidth}>
            <span className={styles.labelText}>
              Address <span className={styles.req}>*</span>
            </span>
            <input value={form.address} onChange={(e) => handleChange("address", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>
              Mobile <span className={styles.req}>*</span>
            </span>
            <input value={form.mobile} onChange={(e) => handleChange("mobile", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>
              City <span className={styles.req}>*</span>
            </span>
            <input value={form.city} onChange={(e) => handleChange("city", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>
              State <span className={styles.req}>*</span>
            </span>
            <input value={form.state} onChange={(e) => handleChange("state", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>
              Pincode <span className={styles.req}>*</span>
            </span>
            <input value={form.pincode} onChange={(e) => handleChange("pincode", e.target.value)} />
          </label>

          <label>
            <span className={styles.labelText}>
              Margin % <span className={styles.req}>*</span>
            </span>
            <input
              type="number"
              min="1"
              max="100"
              value={form.margin_percentage}
              onChange={(e) => handleChange("margin_percentage", e.target.value)}
            />
          </label>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;