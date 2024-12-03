import { useState } from "react";
import SideBar from "../components/SideBar";
import ItemsPage from "../components/items/ItemsPage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Items = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // isko context me dalna hai

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`w-${
          isSidebarCollapsed ? "16" : "56"
        } transition-all bg-black text-white relative`}
      >
        <SideBar isCollapsed={isSidebarCollapsed} />
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-0 transform -translate-x-1/2 bg-gray-700 p-2 rounded-full text-white focus:outline-none hover:bg-gray-600 transition-all duration-300 ease-in-out"
        >
          {isSidebarCollapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex-1 p-6">
        <ItemsPage />
      </div>
    </div>
  );
};

export default Items;
