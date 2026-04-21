const Sidebar = () => {
    return (
        <div className="bg-[#373B53] fixed top-0 left-0 z-50 w-full h-[4.5rem] md:h-[5rem] lg:w-[6.44rem] lg:h-screen flex lg:flex-col justify-between items-center lg:rounded-r-[20px]">
            <div>
                <img src="/company-logo.svg" alt="company-logo" className=" h-[4.5rem] md:h-[5rem] lg:h-[6.44rem] w-auto" />
            </div>
            <div className="flex lg:flex-col justify-between items-center">
                <div className="mx-0 flex justify-center">
                    <img src="/theme-dark.svg" alt="theme-toggler" className="size-[1.5rem]" />
                </div>
                <div className=" w-[0.06rem] h-[4.5rem] md:h-[5rem] lg:w-[6.44rem] lg:h-[0.06rem] bg-[#979797] ml-[2rem] lg:ml-0 lg:mt-[2.01rem]"></div>
                <div className="px-[2em] py-[1.5em] mx-0 flex justify-center">
                    <img src="/user-profile-img.svg" alt="user-avatar" className="size-[2rem] lg:size-[2.5rem]" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar