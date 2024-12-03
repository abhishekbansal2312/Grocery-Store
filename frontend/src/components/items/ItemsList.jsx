import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

const ItemsList = ({ items = [], handleEdit, handleDelete }) => {
  console.log(items);

  return (
    <div className="overflow-x-auto">
      {items.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Active
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-gray-700">{item.amount}</td>
                <td className="px-4 py-2 text-gray-700">{item.quantity}</td>
                <td className="px-4 py-2 text-gray-700">{item.category}</td>
                <td className="px-4 py-2 text-gray-700">
                  {item.isActive ? "Yes" : "No"}
                </td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(idx, item)}
                      aria-label={`Edit ${item.name}`}
                      className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item)}
                      aria-label={`Delete ${item.name}`}
                      className="flex items-center justify-center bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No items added yet. Click "Add Item" to get started.
        </p>
      )}
    </div>
  );
};

export default ItemsList;
