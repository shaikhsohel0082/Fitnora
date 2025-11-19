import React, { useState, useEffect } from "react";
import styles from "./ProductModal.module.css";

export interface UnitMrp {
  unit: string;
  mrp: string;
}

export interface ProductForm {
  image?: string;
  name: string;
  hsn_number: string;
  selling_price?: string;
  stock: number;
  unitMrpList: UnitMrp[] | string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductForm) => void;
  initialData?: ProductForm | null;
  activeState: "edit" | "add";
}

const ProductModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  activeState,
}) => {
  const resetData = {
    image: undefined,
    name: "",
    hsn_number: "",
    selling_price: "",
    stock: 0,
    unitMrpList: [{ unit: "", mrp: "" }],
  };
  const [form, setForm] = useState<ProductForm>(resetData);

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm(resetData);
  }, [initialData]);

  const handleChange = (field: keyof ProductForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleUnitMrpChange = (
    index: number,
    field: keyof UnitMrp,
    value: string
  ) => {
    const updatedList = [...form.unitMrpList];
    updatedList[index][field] = value;
    setForm({ ...form, unitMrpList: updatedList as UnitMrp[] });
  };

  const addUnitMrp = () => {
    setForm({
      ...form,
      unitMrpList: [...form.unitMrpList, { unit: "", mrp: "" }] as UnitMrp[],
    });
  };

  const removeUnitMrp = (index: number) => {
    const updatedList =
      Array.isArray(form.unitMrpList) &&
      form.unitMrpList.filter((_, i) => i !== index);
    setForm({ ...form, unitMrpList: updatedList });
  };

  const handleSubmit = () => {
    if (!form.name || !form.hsn_number || !form.stock) {
      alert("Please fill all required fields.");
      return;
    }

    const hasEmptyUnitMrp =
      Array.isArray(form.unitMrpList) &&
      form.unitMrpList.some((item) => !item.unit || !item.mrp);

    if (hasEmptyUnitMrp) {
      alert("Please fill all unit and MRP fields.");
      return;
    }
    const payload: ProductForm = {
      name: form.name,
      image: form.image,
      hsn_number: form.hsn_number,
      stock: form.stock,
      unitMrpList: JSON.stringify(form.unitMrpList),
    };
    onSubmit(payload);
    onClose();
    setForm(resetData);
  };

  const handleClose = () => {
    setForm(resetData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>
          {activeState === "add" ? "Add Product" : "Edit Product"}
        </h2>

        <div className={styles.formGrid}>
          <label className="d-none">
            <span className={styles.labelText}>Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange("image", e.target.files?.[0])}
            />
          </label>

          <label>
            <span className={styles.labelText}>Product Name *</span>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </label>

          <label>
            <span className={styles.labelText}>Product HSN Number *</span>
            <input
              value={form.hsn_number}
              onChange={(e) => handleChange("hsn_number", e.target.value)}
            />
          </label>

          <label>
            <span className={styles.labelText}>Stock (Kg) *</span>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => handleChange("stock", Number(e.target.value))}
              disabled={activeState === "edit"}
            />
          </label>

          {/* Multiple Unit–MRP Section */}
          <div className={styles.unitMrpContainer}>
            <span className={styles.labelText}>Units & MRP *</span>
            {Array.isArray(form.unitMrpList) &&
              form.unitMrpList.map((item, index) => (
                <div key={index} className={styles.unitMrpRow}>
                  <input
                    type="text"
                    placeholder="Unit (gm)"
                    value={item.unit}
                    onChange={(e) =>
                      handleUnitMrpChange(index, "unit", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="MRP"
                    value={item.mrp}
                    onChange={(e) =>
                      handleUnitMrpChange(index, "mrp", e.target.value)
                    }
                  />
                  {form.unitMrpList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeUnitMrp(index)}
                      className={styles.removeBtn}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            <button
              type="button"
              className={styles.addBtn}
              onClick={addUnitMrp}
            >
              + Add More
            </button>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
