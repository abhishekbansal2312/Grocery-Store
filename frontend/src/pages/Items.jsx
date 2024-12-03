import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { useSideBar } from "../context/SideBarProvider";
import SideBar from "../components/SideBar";
import ItemsPage from "../components/items/ItemsPage";

const Items = () => {
  const { isSidebarCollapsed } = useSideBar();

  return (
    <div className="flex min-h-screen">
      <div
        className={`transition-all text-white relative ${
          isSidebarCollapsed ? "w-16" : "w-56"
        }`}
      >
        <SideBar isCollapsed={isSidebarCollapsed} />
      </div>
      <div className="flex-1 p-6">
        <ItemsPage />
      </div>
    </div>
  );
};

export default Items;
