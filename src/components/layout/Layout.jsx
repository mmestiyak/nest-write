import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = () => {
    return ( <>
        <Navbar/>
        <main className="h-screen mx-auto max-w-7xl sm:px-6 lg:px-8">
            <Outlet/>
        </main>
        <Footer />
    </>);
}
 
export default Layout;
