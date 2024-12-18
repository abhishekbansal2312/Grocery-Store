import { useItemContext } from "../../services/GetItemsProvider";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { items, setItems, loading, error } = useItemContext();
  const [statistics, setStatistics] = useState({
    totalItems: 0,
    activeItems: 0,
    inactiveItems: 0,
    categories: {},
  });

  useEffect(() => {
    const fetchItemsAndCalculateStats = async () => {
      try {
        calculateStats(items);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchItemsAndCalculateStats();
  }, [items]);

  const calculateStats = (items) => {
    const totalItems = items.length;
    const activeItems = items.filter((item) => item.isActive).length;
    const inactiveItems = totalItems - activeItems;

    const categories = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    setStatistics({ totalItems, activeItems, inactiveItems, categories });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Dashboard</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading items...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium text-blue-700">Total Items</h2>
              <p className="text-3xl font-bold text-blue-900">
                {statistics.totalItems}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium text-green-700">
                Active Items
              </h2>
              <p className="text-3xl font-bold text-green-900">
                {statistics.activeItems}
              </p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium text-red-700">
                Inactive Items
              </h2>
              <p className="text-3xl font-bold text-red-900">
                {statistics.inactiveItems}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(statistics.categories).map(
                ([category, count]) => (
                  <div
                    key={category}
                    className="bg-gray-100 p-4 rounded-lg shadow flex justify-between"
                  >
                    <span className="font-medium text-gray-700">
                      {category}
                    </span>
                    <span className="font-bold text-gray-900">{count}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
