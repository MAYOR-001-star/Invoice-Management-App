type InvoiceProps = {
    id: string,
    dueDate: string,
    amount: number,
    clientName: string,
    status: string,
}

const invoicesData: InvoiceProps[] = [
    {
        id: "RT3080",
        dueDate: "19 Aug 2021",
        amount: 1800.9,
        clientName: "Jensen Huang",
        status: "Paid",
    },
    {
        id: "XM9141",
        dueDate: "20 Sep 2021",
        amount: 556.0,
        clientName: "Alex Grim",
        status: "Pending",
    },
    {
        id: "RG0314",
        dueDate: "01 Oct 2021",
        amount: 14002.33,
        clientName: "John Morrison",
        status: "Paid",
    },
    {
        id: "RT2080",
        dueDate: "12 Oct 2021",
        amount: 102.04,
        clientName: "Alysa Werner",
        status: "Pending",
    },
    {
        id: "AA1449",
        dueDate: "14 Oct 2021",
        amount: 4032.33,
        clientName: "Melissa Clarke",
        status: "Pending",
    },
    {
        id: "TY9141",
        dueDate: "31 Oct 2021",
        amount: 6155.91,
        clientName: "Thomas Wayne",
        status: "Pending",
    },
    {
        id: "FV2353",
        dueDate: "12 Nov 2021",
        amount: 3102.04,
        clientName: "Anita Wainwright",
        status: "Draft",
    },
];

const InvoiceList = () => {
    return (
        <div className="my-[2rem] md:my-[3.44rem] lg:my-[4rem]">
            {
                invoicesData.map((invoice) => {
                    const { id, dueDate, amount, clientName, status } = invoice;
                    return (
                        <div key={id} className="grid grid-cols-2 md:grid-cols-[10%_minmax(120px,1fr)_1fr_1fr_auto_auto] items-center mb-[1rem] bg-[#FFFFFF] rounded-lg p-[1.5rem] md:p-[1rem] md:pl-[2rem] shadow-sm border border-transparent hover:border-[#7C5DFA] transition-all cursor-pointer">
                            {/* ID Section */}
                            <div className="order-1 md:order-1">
                                <p className="text-[0.94rem] font-bold text-[#0C0E16]">
                                    <span className="text-[#7E88C3]">#</span>{id}
                                </p>
                            </div>

                            <div className="order-2 md:order-3 text-right md:text-left">
                                <p className="text-[#858BB2] md:text-[#888EB0] text-[0.81rem] font-medium">{clientName}</p>
                            </div>
                            <div className="order-3 md:contents flex flex-col gap-2 mt-6 md:mt-0">
                                <p className="text-[#7E88C3] text-[0.81rem] font-medium md:order-2">
                                    <span className="md:hidden">Due </span>{dueDate}
                                </p>
                                <p className="text-[#0C0E16] text-[1.25rem] md:text-[1rem] font-bold md:order-4 md:text-right md:pr-10">
                                    £ {amount}
                                </p>
                            </div>

                            <div className="order-4 md:order-5 flex justify-end items-center mt-6 md:mt-0">
                                <div className={`flex items-center justify-center gap-2 rounded-md w-[6.5rem] py-[0.8rem] font-bold text-[0.94rem] 
                                    ${status === 'Paid' ? 'bg-[#33D69F0F] text-[#33D69F]' :
                                        status === 'Pending' ? 'bg-[#FF8F000F] text-[#FF8F00]' :
                                            'bg-[#373B530F] text-[#373B53]'}`}>
                                    <span className={`w-2 h-2 rounded-full 
                                        ${status === 'Paid' ? 'bg-[#33D69F]' :
                                            status === 'Pending' ? 'bg-[#FF8F00]' :
                                                'bg-[#373B53]'}`} />
                                    <span>{status}</span>
                                </div>
                            </div>

                            <div className="hidden md:block md:order-6 text-right md:pl-5">
                                <img src="/invoice-chevron.svg" alt="check-invoice-detail" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default InvoiceList