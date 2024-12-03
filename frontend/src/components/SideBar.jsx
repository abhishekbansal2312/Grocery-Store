import { Link } from "react-router-dom";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { FaCogs, FaFileInvoiceDollar, FaBoxOpen } from "react-icons/fa";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const SideBar = ({ isCollapsed }) => {
  return (
    <div
      className={`bg-black text-white p-6 flex flex-col space-y-8 transition-all ${
        isCollapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <FaMoneyBillWheat size={30} className="text-yellow-400" />
        {!isCollapsed && (
          <h1 className="text-white text-2xl font-semibold">Billify</h1>
        )}
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center gap-3 ">
          <Link
            to="/items"
            className="text-white text-base font-medium hover:text-yellow-400 w-full flex items-center gap-4"
          >
            <FaBoxOpen size={24} />

            {!isCollapsed && <span className="text-xl">Items</span>}
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/billing"
            className="text-white text-base font-medium hover:text-yellow-400 w-full flex items-center gap-4"
          >
            <FaFileInvoiceDollar size={24} />
            {!isCollapsed && <span className="text-xl">All Bills</span>}
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/settings"
            className="text-white text-base font-medium hover:text-yellow-400 w-full flex items-center gap-4"
          >
            <FaCogs size={24} />

            {!isCollapsed && <span className="text-xl">Settings</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
