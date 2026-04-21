import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout