import React, { useState } from "react";
import { useItemContext } from "../../services/GetItemsProvider";
import SearchBar from "./SearchBar";
import SelectedItemsTable from "./SelectedItemsTable";
import ActiveItemsTable from "./ActiveItemsTable";
import SummarySection from "./SummarySection";

export default function BillingPage() {
  const { items, setItems, setFilteredItems, filteredItems } = useItemContext();
  const [activeItems, setActiveItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const initializeActiveItems = () => {
    const activeItems = items.filter((item) => item.isActive);
    setActiveItems(activeItems);
    setFilteredItems(activeItems);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    const filtered = activeItems.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSelect = (item) => {
    const updatedSelectedItems = selectedItems.some((i) => i._id === item._id)
      ? selectedItems.filter((i) => i._id !== item._id)
      : [...selectedItems, { ...item, quantity: 1 }];

    setSelectedItems(updatedSelectedItems);
    const total = updatedSelectedItems.reduce(
      (sum, i) => sum + i.amount * i.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = (id, quantity) => {
    const parsedQuantity = parseInt(quantity, 10) || 1;
    const updatedSelectedItems = selectedItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity: Math.min(
              Math.max(parsedQuantity, 1),
              activeItems.find((activeItem) => activeItem._id === id)
                ?.quantity || 1
            ),
          }
        : item
    );

    setSelectedItems(updatedSelectedItems);
    const total = updatedSelectedItems.reduce(
      (sum, i) => sum + i.amount * i.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));

      const updatedItems = items.map((item) => {
        const selectedItem = selectedItems.find(
          (selected) => selected._id === item._id
        );
        if (selectedItem) {
          return {
            ...item,
            quantity: item.quantity - selectedItem.quantity,
          };
        }
        return item;
      });

      setItems(updatedItems);
      setFilteredItems(updatedItems);
      setSelectedItems([]);
      setTotalAmount(0);

      alert("Selected items saved successfully!");
    } catch (error) {
      alert("Failed to save items to local storage.");
    }
  };

  React.useEffect(() => {
    initializeActiveItems();
  }, [items]);

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg ">
      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      <SelectedItemsTable
        selectedItems={selectedItems}
        handleSelect={handleSelect}
        activeItems={activeItems}
        handleQuantityChange={handleQuantityChange}
      />
      <ActiveItemsTable
        filteredItems={filteredItems}
        selectedItems={selectedItems}
        handleSelect={handleSelect}
      />
      <SummarySection totalAmount={totalAmount} handleSave={handleSave} />
    </div>
  );
}
