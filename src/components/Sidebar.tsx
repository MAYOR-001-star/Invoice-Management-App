import { GlobalContext } from "../context/Theme";

const Sidebar = () => {
    const { theme, toggleTheme } = GlobalContext();

    return (
        <div className="bg-[var(--color-sidebar-bg)] dark:bg-[var(--color-surface)] fixed top-0 left-0 z-50 w-full h-[4.5rem] md:h-[5rem] lg:w-[6.44rem] lg:h-screen flex lg:flex-col justify-between items-center lg:rounded-r-[20px] transition-colors duration-300">
            <div>
                <img src="/company-logo.svg" alt="company-logo" className=" h-[4.5rem] md:h-[5rem] lg:h-[6.44rem] w-auto" />
            </div>
            <div className="flex lg:flex-col justify-between items-center">
                <button
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    className="mx-0 flex justify-center cursor-pointer hover:opacity-80 transition-opacity outline-none focus:scale-110"
                >
                    <img
                        src={theme === 'light' ? "/theme-dark.svg" : "/theme-light.svg"}
                        alt=""
                        className="size-[1.5rem]"
                    />
                </button>
                <div className=" w-[0.06rem] h-[4.5rem] md:h-[5rem] lg:w-[6.44rem] lg:h-[0.06rem] bg-[#979797] ml-[2rem] lg:ml-0 lg:mt-[2.01rem]"></div>
                <div className="px-[2em] py-[1.5em] mx-0 flex justify-center">
                    <img src="/user-profile-img.svg" alt="user-avatar" className="size-[2rem] lg:size-[2.5rem]" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar