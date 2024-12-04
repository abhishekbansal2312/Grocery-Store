import React, { createContext, useContext, useState, useEffect } from "react";

const ItemContext = createContext();

const useItemContext = () => useContext(ItemContext);

export { useItemContext };

export default function GetItemsProvider({ children }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:4100/api/items", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setItems(data.items);
      setFilteredItems(data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError("Failed to fetch items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        getAllItems,
        loading,
        setLoading,
        error,
        setLoading,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
