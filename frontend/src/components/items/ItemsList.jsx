import React, { useMemo } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

const ItemsList = ({ items, handleEdit, handleDelete }) => {
  const memoizedItems = useMemo(() => items, [items]);

  return (
    <>
      {memoizedItems.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Active
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {memoizedItems.map((item, idx) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.amount}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.isActive ? "Yes" : "No"}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(idx, item)}
                      aria-label="Edit Expense"
                      className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item)}
                      aria-label="Delete Expense"
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
        <p className="text-gray-500">No items added yet.</p>
      )}
    </>
  );
};

export default ItemsList;
