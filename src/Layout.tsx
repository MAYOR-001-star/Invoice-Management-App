import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 lg:p-18 overflow-y-auto">
                <div className="max-w-[730px] mx-auto w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Layout