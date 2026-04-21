import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <main className="flex-1 pt-[4.5rem] md:pt-[5rem] lg:pt-0 lg:pl-[6.44rem] relative">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout