import React, { useState, useMemo } from "react";
import Select, { components } from "react-select";
import { useCustomers } from "@/hooks/customer/fetchAllCustomers";

export const CustomerSelect = ({ setCustomerDetails, setMargin }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useCustomers(searchTerm);

  const customerOptions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      page.data.map((c) => ({
        value: c.id,
        label: c.name,
        address: c.address,
        gst: c.gst,
        margin_percentage:c.margin_percentage
      }))
    );
  }, [data]);

  const handleCustomerSelect = (option: any) => {
    setSelectedCustomer(option);
    setCustomerDetails({
      name: option.label,
      address: option.address || "",
      gst: option.gst || "",
    });
    console.log(option)
    setMargin(Number(option.margin_percentage || 0));
  };

  const handleMenuScrollToBottom = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Customer Details</h3>
      <Select
        isLoading={isLoading}
        options={customerOptions}
        onInputChange={(val) => setSearchTerm(val)}
        onChange={handleCustomerSelect}
        value={selectedCustomer}
        placeholder="Select or search customer"
        onMenuScrollToBottom={handleMenuScrollToBottom}
        styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
        components={{
          MenuList: (props) => (
            <>
              <components.MenuList {...props} />
              {hasNextPage && (
                <div style={{ textAlign: "center", padding: "8px" }}>
                  {isFetchingNextPage ? "Loading more..." : "Scroll for more"}
                </div>
              )}
              <div
                style={{
                  borderTop: "1px solid #eee",
                  textAlign: "center",
                  padding: "10px",
                  background: "#f9f9f9",
                }}
              >
                <button
                  style={{
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("/superadmin/customers", "_blank");
                  }}
                >
                  + Add New Customer
                </button>
              </div>
            </>
          ),
        }}
      />
    </div>
  );
};
