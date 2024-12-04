import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Items from "./pages/Items";
import Form from "./pages/Form";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import SideBarProvider from "./context/SideBarProvider";
import Header from "./components/Header";
import GetItemsProvider from "./services/GetItemsProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetItemsProvider>
          <SideBarProvider>
            <Header />
            <Routes>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/items" element={<Items />} />
              <Route path="/" element={<Form />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </SideBarProvider>
        </GetItemsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
