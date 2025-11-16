import { useProducts } from "@/hooks/product/useCustomers";
import { IUnitMrp } from "@/services/products/getAllProducts";
import React, { useMemo, useState } from "react";
import Select, { components } from "react-select";

interface Props {
  onSelect: (data: any) => void;
  value: {
    value: string;
    label: string;
  };
}
export const ProductSelect = ({ onSelect, value }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProducts(searchTerm);

  const productOptions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) =>
      page.data.map((p) => ({
        value: p.id,
        label: p.name,
        hsn_number: p.hsn_number,
        unitMrpList: p.unitMrpList,
      }))
    );
  }, [data]);

  const handleMenuScrollToBottom = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return (
    <Select
      isLoading={isLoading}
      options={productOptions}
      value={value?.value?.trim() !== "" ? value : "Select product"}
      onInputChange={(val) => setSearchTerm(val)}
      onChange={(opt) => opt && onSelect(opt)}
      placeholder="Select product"
      onMenuScrollToBottom={handleMenuScrollToBottom}
      styles={{
        menu: (base) => ({ ...base, zIndex: 9999, minWidth: "150px" }),
        container: (base) => ({
          ...base,
          minWidth: "100px",
        }),
      }}
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
                  window.open("/superadmin/products", "_blank");
                }}
              >
                + Add New Product
              </button>
            </div>
          </>
        ),
      }}
    />
  );
};
