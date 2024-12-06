import React from "react";

const ActiveItemsTable = ({ filteredItems, selectedItems, handleSelect }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Active Items</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Select</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Available Quantity</th>
            <th className="px-4 py-2 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.some((i) => i._id === item._id)}
                    onChange={() => handleSelect(item)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.description}</td>
                <td className="px-4 py-2 border text-center">
                  {item.quantity}
                </td>
                <td className="px-4 py-2 border">{item.amount.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No active items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveItemsTable;
