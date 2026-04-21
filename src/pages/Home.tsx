import { useState, useRef, useEffect } from "react"
import Button from "../components/ui/Button"
import InvoiceList from "../components/InvoiceList";
import InvoiceForm from "../components/form/InvoiceForm";
import { getInvoices, saveInvoice, generateId } from "../utils/storage";
import type { Invoice } from "../types/invoice";

const Home = () => {
    const statuses: string[] = ["Draft", "Pending", "Paid"];
    const [open, setOpen] = useState<boolean>(false)
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setInvoices(getInvoices());
    }, []);

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

    const handleNewInvoice = () => setIsFormOpen(true);
    
    const handleSubmit = (data: any) => {
        const newInvoice: Invoice = {
            ...data,
            id: generateId(),
            status: "Pending" // Default for new invoices
        };
        saveInvoice(newInvoice);
        setInvoices(getInvoices()); // Refresh list
        setIsFormOpen(false);
    };

    const toggleFilter = (status: string) => {
        setSelectedFilters(prev => 
            prev.includes(status) 
                ? prev.filter(s => s !== status) 
                : [...prev, status]
        );
    };

    const filteredInvoices = selectedFilters.length > 0
        ? invoices.filter(inv => selectedFilters.includes(inv.status))
        : invoices;

    return (
        <div className="max-w-[730px] mx-auto px-6">
            <div className="flex justify-between items-center mt-[3.41rem] lg:mt-[4.81rem] mb-[4rem]">
                <div className="flex flex-col justify-between items-start">
                    <h1 className="font-bold text-[#0C0E16] text-[1.5rem] md:text-[2.25rem]">Invoices</h1>
                    <p className="text-[#888EB0] text-[0.81rem] font-medium">
                        <span className="hidden md:inline">There are </span>{filteredInvoices.length} invoices
                    </p>
                </div>
                <div className="flex justify-between items-center gap-[1.16rem] md:gap-[2.53rem]">
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
                            <div className="absolute mt-[1.38rem] w-[12rem] bg-white rounded-2xl shadow-lg p-[1.5em] space-y-4 right-0 z-20">
                                {statuses.map((status) => {
                                    const isActive = selectedFilters.includes(status);

                                    return (
                                        <label
                                            key={status}
                                            className="flex items-center gap-4 cursor-pointer group"
                                        >
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={isActive}
                                                onChange={() => toggleFilter(status)}
                                            />
                                            <div
                                                className={`w-4 h-4 rounded-[2px] flex items-center justify-center border border-transparent transition-all
                                                    ${isActive
                                                        ? "bg-[#7C5DFA] border-[#7C5DFA]"
                                                        : "bg-[#DFE3FA] group-hover:border-[#7C5VFA]"
                                                    }`}
                                            >
                                                {isActive && (
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.5 4.5L3.83333 6.83333L8.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                )}
                                            </div>

                                            <span className="text-[0.94rem] font-bold text-[#0C0E16]">
                                                {status}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <Button 
                        text="New Invoice" 
                        mobileText="New" 
                        variant="invoice" 
                        onClick={handleNewInvoice} 
                    />
                </div>
            </div>
            
            <InvoiceList invoices={filteredInvoices} />

            <InvoiceForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Home