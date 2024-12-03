import React from "react";

export default function SearchBar({ onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value); // Pass the input value to the parent
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Items"
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}
