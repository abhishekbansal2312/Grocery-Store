import React, { createContext, useContext, useState } from "react";

const SideBarContext = createContext();

export const useSideBar = () => useContext(SideBarContext);

export default function SideBarProvider({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  return (
    <SideBarContext.Provider
      value={{
        isSidebarCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
}
