import { Link } from "react-router-dom";
import { FaCogs, FaFileInvoiceDollar, FaBoxOpen } from "react-icons/fa";

const SideBar = ({ isCollapsed }) => {
  return (
    <div
      className={`bg-gray-900 h-full text-gray-300 p-4 flex flex-col items-start transition-all ${
        isCollapsed ? "w-20" : "w-56"
      } shadow-md`}
    >
      <nav className="w-full space-y-4">
        <Link
          to="/items"
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          <FaBoxOpen size={20} />
          {!isCollapsed && <span className="ml-4 text-sm">Items</span>}
        </Link>
        <Link
          to="/billing"
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          <FaFileInvoiceDollar size={20} />
          {!isCollapsed && <span className="ml-4 text-sm">Billing</span>}
        </Link>
        <Link
          to="/invoices"
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          <FaFileInvoiceDollar size={20} />
          {!isCollapsed && <span className="ml-4 text-sm">Invoices</span>}
        </Link>

        <Link
          to="/dashboard"
          className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          <FaCogs size={20} />
          {!isCollapsed && <span className="ml-4 text-sm">Dashboard</span>}
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
