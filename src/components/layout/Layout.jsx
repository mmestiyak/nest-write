import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow mx-auto px-4 sm:px-6 lg:px-8 w-[80%]">
        <Outlet />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default Layout;
  