import SideBar from "../components/SideBar";
import MainContent from "../components/MainContent";

const DashBoard = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-64 bg-gray-800 text-white">
          <SideBar />
        </div>

        <div className="flex-1 p-6">
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
