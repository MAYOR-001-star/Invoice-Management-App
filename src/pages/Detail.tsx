import { Link, useParams, useNavigate } from "react-router-dom";
import GroupBtn from "../components/ui/GroupBtn";
import { useState, useEffect } from "react";
import InvoiceForm from "../components/form/InvoiceForm";
import DeleteModal from "../components/ui/DeleteModal";
import { getInvoiceById, deleteInvoice, updateInvoiceStatus, saveInvoice } from "../utils/storage";
import type { Invoice } from "../types/invoice";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState<Invoice | undefined>(undefined);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            const data = getInvoiceById(id);
            if (data) {
                setInvoice(data);
            }
        }
    }, [id]);

    const handleEdit = () => setIsFormOpen(true);
    
    const confirmDelete = () => {
        if (id) {
            deleteInvoice(id);
            navigate('/');
        }
    };

    const handleMarkPaid = () => {
        if (id) {
            updateInvoiceStatus(id, 'Paid');
            setInvoice(getInvoiceById(id));
        }
    };

    const handleSubmit = (data: any) => {
        saveInvoice(data);
        setInvoice(getInvoiceById(id!));
        setIsFormOpen(false);
    };

    if (!invoice) return <div className="p-10 text-center">Invoice not found</div>;

    return (
        <div className="my-[2.06rem] md:my-[3.06rem] lg:my-[4.06rem] max-w-[730px] mx-auto px-6">
            <Link to="/" className="flex justify-start items-center gap-[1.48rem] group">
                <img src="/arrow-left.svg" alt="arrow-left" className="size-3 flex-shrink-0" />
                <p className="font-bold text-[var(--color-text-primary)] text-[0.94rem] group-hover:text-[var(--color-text-secondary)] transition-colors">Go back</p>
            </Link>

            <div className="mt-[1.94rem] p-[1.5rem] bg-[var(--color-surface)] rounded-lg shadow-sm flex items-center justify-between transition-colors duration-300">
                <div className="flex items-center justify-between w-full md:w-auto gap-4">
                    <p className="font-medium text-[var(--color-text-accent)] text-[0.81rem]">Status</p>
                    <div className={`flex items-center justify-center gap-2 rounded-md w-[6.5rem] py-[0.8rem] font-bold text-[0.94rem] 
                        ${invoice.status === 'Paid' ? 'bg-[#33D69F0F] text-[#33D69F]' :
                            invoice.status === 'Pending' ? 'bg-[#FF8F000F] text-[#FF8F00]' :
                                'bg-[#373B530F] dark:bg-[var(--color-field-border)] text-[#373B53] dark:text-[var(--color-text-secondary)]'}`}>
                        <span className={`w-2 h-2 rounded-full 
                            ${invoice.status === 'Paid' ? 'bg-[#33D69F]' :
                                invoice.status === 'Pending' ? 'bg-[#FF8F00]' :
                                    'bg-[#373B53] dark:bg-[var(--color-text-secondary)]'}`} />
                        <span>{invoice.status}</span>
                    </div>
                </div>

                <div className="hidden md:block">
                    <GroupBtn 
                        onEdit={handleEdit} 
                        onDelete={() => setIsDeleteModalOpen(true)}
                        onMarkPaid={handleMarkPaid}
                    />
                </div>
            </div>

            <div className="p-[1.5em] md:p-[2em] lg:p-[3em] mt-4 bg-[var(--color-surface)] rounded-lg shadow-sm transition-colors duration-300">
                <div>
                    <div className="flex flex-col md:flex-row md:justify-between items-start">
                        <div className="flex flex-col justify-center items-start gap-[0.5rem]">
                            <div>
                                <span className="italic font-bold text-[var(--color-text-accent)] text-[0.94rem]">#</span>
                                <span className="font-bold text-[var(--color-text-primary)] text-[0.94rem]">{invoice.id}</span>
                            </div>
                            <p className="font-medium text-[var(--color-text-accent)] text-[0.81rem]">{invoice.description}</p>
                        </div>
                        <div className="flex justify-start md:justify-end items-center md:text-right mt-4 md:mt-0">
                            <p className="font-medium text-[var(--color-text-accent)] text-[0.81rem] md:text-end">
                                <span>{invoice.senderAddress.street}</span><br />
                                <span>{invoice.senderAddress.city}</span><br />
                                <span>{invoice.senderAddress.postCode}</span><br />
                                <span>{invoice.senderAddress.country}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 mt-[2.5rem] md:mt-[3rem]">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="text-[var(--color-text-accent)] text-[0.81rem] font-medium">Invoice Date</p>
                            <p className="text-[var(--color-text-primary)] text-[0.94rem] font-bold">{invoice.dates.invoiceDate}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[var(--color-text-accent)] text-[0.81rem] font-medium">Payment Due</p>
                            <p className="text-[var(--color-text-primary)] text-[0.94rem] font-bold">{invoice.dates.paymentDue}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-[var(--color-text-accent)] text-[0.81rem] font-medium">Bill To</p>
                        <p className="text-[var(--color-text-primary)] text-[0.94rem] font-bold mb-1">{invoice.client.name}</p>
                        <p className="text-[var(--color-text-accent)] text-[0.75rem] md:text-[0.81rem] font-medium leading-5">
                            {invoice.client.address.street}<br />
                            {invoice.client.address.city}<br />
                            {invoice.client.address.postCode}<br />
                            {invoice.client.address.country}
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1 mt-2 md:mt-0">
                        <p className="text-[var(--color-text-accent)] text-[0.81rem] font-medium">Sent to</p>
                        <p className="text-[var(--color-text-primary)] text-[0.94rem] font-bold break-all">{invoice.client.email}</p>
                    </div>
                </div>

                <div className="mt-[2.38rem] md:mt-[3rem] bg-[var(--color-faded-bg)] rounded-t-lg p-[1.5rem] md:p-[2rem] transition-colors duration-300">
                    <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] mb-[2rem] text-[var(--color-text-accent)] text-[0.81rem] font-medium">
                        <p>Item Name</p>
                        <p className="text-center">QTY.</p>
                        <p className="text-right">Price</p>
                        <p className="text-right">Total</p>
                    </div>

                    <div className="flex flex-col gap-6 md:gap-8">
                        {invoice.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 md:grid-cols-[3fr_1fr_1fr_1fr] items-center">
                                <div className="flex flex-col gap-2">
                                    <p className="font-bold text-[var(--color-text-primary)] text-[0.94rem]">{item.name}</p>
                                    <p className="md:hidden font-bold text-[var(--color-text-accent)] text-[0.81rem]">
                                        {item.quantity} x {item.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                                    </p>
                                </div>
                                <p className="hidden md:block text-center font-bold text-[var(--color-text-accent)] text-[0.81rem]">{item.quantity}</p>
                                <p className="hidden md:block text-right font-bold text-[var(--color-text-accent)] text-[0.81rem]">
                                    {item.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                                </p>
                                <p className="text-right font-bold text-[var(--color-text-primary)] text-[0.94rem]">
                                    {item.total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[var(--color-sidebar-bg)] dark:bg-[#0C0E16] rounded-b-lg p-[1.5rem] md:px-[2rem] md:py-[1.5rem] flex items-center justify-between text-white transition-colors duration-300">
                    <p className="text-[0.81rem] font-medium">
                        <span className="md:hidden">Total</span>
                        <span className="hidden md:inline">Amount Due</span>
                    </p>
                    <p className="text-[1.5rem] font-bold">
                        {invoice.total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                    </p>
                </div>
            </div>

            <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--color-surface)] p-[1.5rem] flex items-center justify-center shadow-[0_-10px_20px_rgba(72,84,159,0.1)] z-10 transition-colors duration-300">
                <GroupBtn 
                    onEdit={handleEdit} 
                    onDelete={() => setIsDeleteModalOpen(true)}
                    onMarkPaid={handleMarkPaid}
                />
            </div>

            <div className="h-[8rem] md:hidden"></div>

            <InvoiceForm 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleSubmit}
                initialData={invoice}
            />

            <DeleteModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
                onConfirm={confirmDelete} 
                invoiceId={invoice.id}
            />
        </div>
    )
}

export default Detail