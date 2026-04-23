import EmptyInvoice from "./EmptyInvoice";
import type { Invoice } from "../types/invoice";
import { Link } from "react-router-dom";

interface InvoiceListProps {
    invoices: Invoice[];
}

const InvoiceList = ({ invoices }: InvoiceListProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, ' ');
    };
    
    if (invoices.length === 0) {
        return (
            <div className="flex justify-center items-center my-[2rem] md:my-[3.44rem] lg:my-[4rem]">
                <EmptyInvoice />
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4 mb-20">
            {invoices.map((invoice) => (
                <Link 
                    key={invoice.id} 
                    to={`/detail/${invoice.id}`}
                    className="w-full bg-[var(--color-surface)] p-[1.5rem] md:px-[2rem] md:py-[1rem] rounded-lg shadow-sm border border-transparent hover:border-[var(--color-primary)] transition-all grid grid-cols-2 md:grid-cols-[0.8fr_1.2fr_1.5fr_1fr_auto] items-center gap-y-4 md:gap-4 group"
                >
                    <p className="font-bold text-[0.94rem] text-[var(--color-text-primary)] md:order-1">
                        <span className="text-[var(--color-text-accent)]">#</span>{invoice.id}
                    </p>

                    <p className="font-medium text-[0.81rem] text-[var(--color-text-accent)] md:text-[var(--color-text-secondary)] text-right md:text-left md:order-3 md:col-start-auto">
                        {invoice.client.name}
                    </p>

                    <p className="font-medium text-[0.81rem] text-[var(--color-text-accent)] col-start-1 md:col-start-auto md:order-2">
                        <span className="md:hidden">Due </span>{formatDate(invoice.dates.paymentDue)}
                    </p>

                    <p className="font-bold text-[var(--color-text-primary)] text-[1rem] md:text-[0.94rem] lg:text-[1rem] col-start-1 md:col-start-auto md:text-right md:order-4">
                        {invoice.total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                    </p>

                    <div className="flex items-center justify-end gap-5 col-start-2 row-start-3 md:row-start-auto md:col-start-auto md:order-5">
                        <div className={`flex items-center justify-center gap-2 rounded-md w-[6.5rem] py-[0.8rem] font-bold text-[0.94rem] 
                            ${invoice.status === 'Paid' ? 'bg-[#33D69F0F] text-[#33D69F]' :
                                invoice.status === 'Pending' ? 'bg-[#FF8F000F] text-[#FF8F00]' :
                                    'bg-[#373B530F] dark:bg-[#DFE3FA14] text-[#373B53] dark:text-[#DFE3FA]'}`}>
                            <span className={`w-2 h-2 rounded-full 
                                ${invoice.status === 'Paid' ? 'bg-[#33D69F]' :
                                    invoice.status === 'Pending' ? 'bg-[#FF8F00]' :
                                        'bg-[#373B53] dark:bg-[#DFE3FA]'}`} />
                            <span>{invoice.status}</span>
                        </div>
                        <img src="/arrow-right.svg" alt="arrow-right" className="hidden md:block size-3 transition-transform group-hover:translate-x-1" />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default InvoiceList
