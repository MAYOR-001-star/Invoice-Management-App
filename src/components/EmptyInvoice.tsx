

const EmptyInvoice = () => {
    return (
        <div className='text-center'>
            <div>
                <img src='/empty-invoice.svg' alt='empty-invoice' className='w-[15.06rem] h-[12.44rem]' />
            </div>
            <p className='text-[#0C0E16] text-[1.5rem] font-bold mt-[2rem] mb-[1rem]'>There is nothing here</p>
            <p className='text-[#888EB0] text-[0.81rem] font-medium'>
                Create a new invoice by clicking the<br />
                New Invoice button and get started
            </p>
        </div>
    )
}

export default EmptyInvoice