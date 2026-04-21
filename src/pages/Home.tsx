import { useState, useRef, useEffect } from "react"
import Button from "../components/ui/Button"
import InvoiceList from "../components/InvoiceList";

const Home = () => {
    const options: string[] = ["Draft", "Pending", "Paid"];
    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>("Pending");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className=" px-[1.5em] md:px-[3em] lg:px-[22.19em]">
            <div className="flex justify-between items-center gap-[5.44rem] md:gap-[14.31rem] lg:gap-[17.94rem] mt-[3.41rem] lg:mt-[4.81rem]">
                <div className="flex flex-col justify-between items-start">
                    <h1 className="font-bold text-[#0C0E16] text-[1.5rem] md:text-[2.25rem]">Invoices</h1>
                    <p className="text-[#888EB0] text-[0.81rem] font-medium">
                        <span className="hidden md:inline">There are </span>7 invoices
                    </p>
                </div>
                <div className="flex justify-between items-center gap-[1.16rem] md:gap-[2.53rem] lg:gap-[2.53rem]">
                    <div className="relative inline-block" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex justify-center items-center gap-[1rem] lg:gap-[0.88rem]"
                        >
                            <span className="font-bold text-[#0C0E16] text-[0.94rem]">
                                <span className="md:hidden">Filter</span>
                                <span className="hidden md:inline">Filter by status</span>
                            </span>
                            <span className="flex justify-center items-center cursor-pointer">
                                <img src="/filter-dropdown.svg" alt="arrow-down" className="size-4 flex-shrink-0" />
                            </span>
                        </button>
                        {open && (
                            <div className="absolute mt-[1.38rem] w-[12rem] bg-white rounded-2xl shadow-lg p-[1.5em] space-y-4 right-0">
                                {options.map((option) => {
                                    const isActive = selected === option;

                                    return (
                                        <label
                                            key={option}
                                            className="flex items-center gap-4 cursor-pointer group"
                                        >
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={isActive}
                                                onChange={() => setSelected(option)}
                                            />
                                            <div
                                                className={`w-6 h-6 rounded-md flex items-center justify-center border-2
                                                    ${isActive
                                                        ? "bg-[#7C5DFA] border-[#7C5DFA]"
                                                        : "bg-[#DFE3FA] border-transparent group-hover:border-[#7C5DFA]"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4 text-white"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                    >
                                                        <path d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>

                                            <span className="text-[0.94rem] font-bold text-[#0C0E16]">
                                                {option}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <Button text="New Invoice" mobileText="New" variant="invoice" onClick={() => { console.log('invoice submitted') }} />
                </div>
            </div>
            <InvoiceList />
        </div>
    )
}

export default Home