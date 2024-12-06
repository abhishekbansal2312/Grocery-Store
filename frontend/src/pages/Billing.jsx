import { useSideBar } from "../context/SideBarProvider";
import SideBar from "../components/SideBar";
import BillingPage from "../components/billing/BillingPage";

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
        <BillingPage />
      </div>
    </div>
  );
};

export default Items;
