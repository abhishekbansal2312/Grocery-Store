import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import Form from "./Form";
import SearchBar from "./SearchBar";
import ItemsList from "./ItemsList";
import { useItemContext } from "../../services/GetItemsProvider";

export default function ItemsPage() {
  const { items, setItems, filteredItems, setFilteredItems, loading, error } =
    useItemContext();
  const [formFields, setFormFields] = useState({
    name: "",
    amount: "",
    description: "",
    quantity: 1,
    category: "Electronics",
    isActive: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const id = editIndex !== -1 ? items[editIndex]._id : null;
    const url =
      editIndex === -1
        ? `http://localhost:4100/api/items`
        : `http://localhost:4100/api/items/${id}`;
    const method = editIndex === -1 ? "POST" : "PUT";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formFields),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedItem = await response.json();

      if (editIndex === -1) {
        setItems((prevItems) => [...prevItems, updatedItem.item]);
        setFilteredItems((prevFiltered) => [...prevFiltered, updatedItem.item]);
      } else {
        setItems((prevItems) =>
          prevItems.map((item, index) =>
            index === editIndex ? updatedItem.item : item
          )
        );
        setFilteredItems((prevFiltered) =>
          prevFiltered.map((item, index) =>
            index === editIndex ? updatedItem.item : item
          )
        );
      }

      setShowModal(false);
      setEditIndex(-1);
      setFormFields({
        name: "",
        amount: "",
        description: "",
        quantity: 1,
        category: "Electronics",
        isActive: false,
      });
    } catch (error) {
      console.error("Error adding/updating item:", error);
    }
  };

  const handleEdit = (idx, item) => {
    setEditIndex(idx);
    setFormFields({
      name: item.name || "",
      amount: item.amount || 0,
      description: item.description || "",
      quantity: item.quantity || 1,
      category: item.category || "default",
      isActive: item.isActive ?? false,
    });
    setShowModal(true);
  };

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const id = item._id;
        const response = await fetch(`http://localhost:4100/api/items/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
        setFilteredItems((prevFiltered) =>
          prevFiltered.filter((item) => item._id !== id)
        );
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => {
              setShowModal(true);
              setFormFields({
                name: "",
                amount: 0,
                description: "",
                quantity: 1,
                category: "Electronics",
                isActive: false,
              });

              setEditIndex(-1);
            }}
            className="bg-indigo-600 text-sm text-white px-3 py-2 rounded-lg shadow-md hover:bg-indigo-700"
          >
            Add Item
          </button>
          <SearchBar onSearch={handleSearch} />
        </div>

        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={editIndex === -1 ? "Add Item" : "Edit Item"}
          >
            <Form
              formFields={formFields}
              setFormFields={setFormFields}
              handleSubmit={(e) => handleFormSubmit(e)}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}

        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <ItemsList
              items={filteredItems}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
