import React from "react";

const SummarySection = ({ totalAmount, handleSave }) => {
  return (
    <div className="mt-8 flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        Total Amount: {totalAmount.toFixed(2)}
      </h2>
      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Save
      </button>
    </div>
  );
};

export default SummarySection;
