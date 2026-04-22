import EmptyInvoice from "./EmptyInvoice";
import type { Invoice } from "../types/invoice";
import { Link } from "react-router-dom";

interface InvoiceListProps {
    invoices: Invoice[];
}

const InvoiceList = ({ invoices }: InvoiceListProps) => {
    
    if (invoices.length === 0) {
        return (
            <div className="flex justify-center items-center my-[2rem] md:my-[3.44rem] lg:my-[4rem]">
                <EmptyInvoice />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 mb-20">
            {invoices.map((invoice) => (
                <Link 
                    key={invoice.id} 
                    to={`/detail/${invoice.id}`}
                    className="bg-[var(--color-surface)] p-[1.5rem] md:px-[2rem] md:py-[1rem] rounded-lg shadow-sm border border-transparent hover:border-[#7C5DFA] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                    <div className="flex justify-between items-center md:gap-11">
                        <p className="font-bold text-[0.94rem] text-[var(--color-text-primary)]">
                            <span className="text-[var(--color-text-accent)]">#</span>{invoice.id}
                        </p>
                        <p className="md:hidden font-medium text-[0.81rem] text-[var(--color-text-accent)]">
                            {invoice.client.name}
                        </p>
                    </div>

                    <div className="flex justify-between items-center md:flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:gap-10">
                            <p className="font-medium text-[0.81rem] text-[var(--color-text-accent)]">
                                <span className="md:hidden">Due </span>{invoice.dates.paymentDue}
                            </p>
                            <p className="hidden md:block font-medium text-[0.81rem] text-[var(--color-text-accent)]">
                                {invoice.client.name}
                            </p>
                        </div>
                        <p className="font-bold text-[var(--color-text-primary)] text-[1rem]">
                            {invoice.total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                        </p>
                    </div>

                    <div className="flex justify-between items-center md:gap-5">
                        <div className={`flex items-center justify-center gap-2 rounded-md w-[6.5rem] py-[0.8rem] font-bold text-[0.94rem] 
                            ${invoice.status === 'Paid' ? 'bg-[#33D69F0F] text-[#33D69F]' :
                                invoice.status === 'Pending' ? 'bg-[#FF8F000F] text-[#FF8F00]' :
                                    'bg-[#373B530F] text-[var(--color-text-primary)]'}`}>
                            <span className={`w-2 h-2 rounded-full 
                                ${invoice.status === 'Paid' ? 'bg-[#33D69F]' :
                                    invoice.status === 'Pending' ? 'bg-[#FF8F00]' :
                                        'bg-[#373B53] dark:bg-[#DFE3FA]'}`} />
                            <span>{invoice.status}</span>
                        </div>
                        <img src="/arrow-right.svg" alt="arrow-right" className="hidden md:block size-3" />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default InvoiceList
