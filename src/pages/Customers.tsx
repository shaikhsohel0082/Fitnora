import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import CustomerModal, { CustomerForm } from "../components/Customers/CustomerModal";
import styles from "./Customers.module.css";

interface Customer {
  id: number;
  name: string;
  address: string;
  mobile: string;
  gst?: string;
  city: string;
  state: string;
  pincode: string;
  margin_percentage: string;
}

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}`;

const PAGE_SIZE = 5;

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  // ✅ Load customers from API with pagination & filter
  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE}/customers?page_number=${pageNumber}&page_size=${PAGE_SIZE}&search=${search}`
      );
      const data = await res.json();
      setCustomers(data.customers); // expected { customers: [], total_pages: number }
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Error loading customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [pageNumber, search]);

  const handleSave = async (form: CustomerForm) => {
    try {
      if (editCustomer) {
        console.log("editCustomer",editCustomer)
        await fetch(`${API_BASE}/customers/${editCustomer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(`${API_BASE}/customers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      load();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    try {
      await fetch(`${API_BASE}/customers/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPageNumber(1); // reset to first page
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Customers Management</h2>
          <div>
            <input
              type="text"
              placeholder="Search by name, city, mobile..."
              value={search}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
            <button
              className={styles.addButton}
              onClick={() => {
                setEditCustomer(null);
                setIsModalOpen(true);
              }}
            >
              + Add Customer
            </button>
          </div>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>GST</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Pincode</th>
                  <th>Margin %</th>
                  <th className={styles.actionsCol}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers?.length === 0 ? (
                  <tr>
                    <td colSpan={9} className={styles.noData}>
                      No customers found
                    </td>
                  </tr>
                ) : (
                  customers?.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.mobile}</td>
                      <td>{c.gst || "-"}</td>
                      <td>{c.city}</td>
                      <td>{c.state}</td>
                      <td>{c.pincode}</td>
                      <td>{c.margin_percentage}%</td>
                      <td className={styles.actionButtons}>
                        <button className={styles.editBtn} onClick={() => handleEdit(c)}>
                          Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(c.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button
                onClick={() => setPageNumber((prev) => prev - 1)}
                disabled={pageNumber === 1}
              >
                Previous
              </button>
              <span>
                Page {pageNumber} of {totalPages}
              </span>
              <button
                onClick={() => setPageNumber((prev) => prev + 1)}
                disabled={pageNumber === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}

        <CustomerModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
          initialData={editCustomer ? { ...editCustomer } : null}
          title={editCustomer ? "Edit Customer" : "Add Customer"}
        />
      </div>
    </Layout>
  );
};

export default Customers;