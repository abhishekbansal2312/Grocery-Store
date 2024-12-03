const Form = ({
  formFields,
  setFormFields,
  handleSubmit,
  onCancel,
  isEdit,
}) => {
  const handleFieldChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormFields({
      ...formFields,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form
      className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4 max-w-3xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={formFields.name}
            onChange={handleFieldChange}
            placeholder="Enter item name"
            className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            value={formFields.amount}
            onChange={handleFieldChange}
            placeholder="Enter amount"
            min="1"
            className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-semibold mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          value={formFields.description}
          onChange={handleFieldChange}
          placeholder="Enter a short description"
          rows="3"
          className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-indigo-200 focus:outline-none"
        ></textarea>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="quantity"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={formFields.quantity}
            onChange={handleFieldChange}
            placeholder="Enter quantity"
            min="0"
            className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Category:
          </label>
          <select
            id="category"
            value={formFields.category}
            onChange={handleFieldChange}
            className="shadow-sm border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring focus:ring-indigo-200 focus:outline-none"
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex items-center">
        <label htmlFor="isActive" className="cursor-pointer flex items-center">
          <div className="relative">
            <input
              type="checkbox"
              id="isActive"
              checked={formFields.isActive}
              onChange={handleFieldChange}
              className="sr-only"
            />
            <div
              className={`block w-10 h-6 rounded-full ${
                formFields.isActive ? "bg-green-400" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform ${
                formFields.isActive ? "translate-x-4" : ""
              }`}
            ></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {formFields.isActive ? "In Stock" : "Out of Stock"}
          </span>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          {isEdit ? "Update Item" : "Add Item"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
