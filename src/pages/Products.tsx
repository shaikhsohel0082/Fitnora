import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductModal, { ProductForm } from "../components/Products/ProductModal";
import styles from "./Products.module.css";

interface Product {
  id: number;
  image?: string;
  name: string;
  units: string;
  mrp: number;
  selling_price: number;
  hsn_number: string;
}

const API_BASE = "https://api.example.com"; // update with real API
const PAGE_SIZE = 10;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = async (page: number = 1, search: string = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE}/products?page_number=${page}&page_size=${PAGE_SIZE}&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(pageNumber, searchTerm);
  }, [pageNumber, searchTerm]);

  const handleSave = async (form: ProductForm) => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (editProduct) {
        await fetch(`${API_BASE}/products/${editProduct.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        await fetch(`${API_BASE}/products`, {
          method: "POST",
          body: formData,
        });
      }
      setIsModalOpen(false);
      load(pageNumber, searchTerm);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
      load(pageNumber, searchTerm);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setPageNumber(page);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Products Management</h2>
          <div>
            <input
              type="text"
              placeholder="Search by product name or HSN..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <button
              className={styles.addButton}
              onClick={() => {
                setEditProduct(null);
                setIsModalOpen(true);
              }}
            >
              + Add Product
            </button>
          </div>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Units (gm)</th>
                <th>MRP</th>
                <th>Selling Price</th>
                <th>HSN Number</th>
                <th className={styles.actionsCol}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className={styles.noData}>
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      {p.image ? <img src={p.image} alt={p.name} width={50} /> : "-"}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.units}</td>
                    <td>{p.mrp}</td>
                    <td>{p.selling_price}</td>
                    <td>{p.hsn_number}</td>
                    <td className={styles.actionButtons}>
                      <button className={styles.editBtn} onClick={() => handleEdit(p)}>
                        Edit
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(p.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <div className={styles.pagination}>
          <button onClick={() => goToPage(pageNumber - 1)} disabled={pageNumber === 1}>
            Previous
          </button>
          <span>
            Page {pageNumber} of {totalPages}
          </span>
          <button onClick={() => goToPage(pageNumber + 1)} disabled={pageNumber === totalPages}>
            Next
          </button>
        </div>

        <ProductModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
          initialData={editProduct ? { ...editProduct } : null}
          title={editProduct ? "Edit Product" : "Add Product"}
        />
      </div>
    </Layout>
  );
};

export default Products;