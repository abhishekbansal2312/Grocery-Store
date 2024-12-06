import React from "react";

const SelectedItemsTable = ({
  selectedItems,
  handleSelect,
  activeItems,
  handleQuantityChange,
}) => {
  return selectedItems.length > 0 ? (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
      <table className="w-full border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Available Quantity</th>
            <th className="px-4 py-2 border">Amount</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item._id}>
              <td className="px-4 py-2 border">{item.name}</td>
              <td className="px-4 py-2 border">{item.description}</td>
              <td className="px-4 py-2 border text-center">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  max={
                    activeItems.find(
                      (activeItem) => activeItem._id === item._id
                    )?.quantity || 1
                  }
                  onChange={(e) =>
                    handleQuantityChange(item._id, e.target.value)
                  }
                  className="w-16 border text-center rounded-md"
                />
              </td>
              <td className="px-4 py-2 border text-center">
                {activeItems.find((activeItem) => activeItem._id === item._id)
                  ?.quantity || 0}
              </td>
              <td className="px-4 py-2 border">
                {(item.amount * item.quantity).toFixed(2)}
              </td>
              <td className="px-4 py-2 border text-center">
                <button
                  onClick={() => handleSelect(item)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default SelectedItemsTable;
