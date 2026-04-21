type ButtonProps = {
    text: string;
    mobileText?: string;
    onClick: () => void;
    variant?: string;
}

const Button = ({ text, mobileText, onClick, variant }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer flex justify-center items-center transition-colors rounded-full hover:opacity-75
                ${variant === 'invoice' ? 'p-[0.5em] pr-[1.06em] gap-4' : 'px-6 py-4'} 
                ${variant === 'edit' ? 'bg-[var(--color-faded-bg)] text-[var(--color-text-accent)] hover:bg-[var(--color-field-border)] transition-colors' : variant === 'delete' ? 'bg-[#EC5757] text-[#FFFFFF] hover:bg-[#FF9797] transition-colors' : 'bg-[#7C5DFA] text-[#FFFFFF] hover:bg-[#9277FF] transition-colors'}
            `}
        >
            {variant === 'invoice' &&
                <span className="flex-shrink-0 bg-[#FFFFFF] rounded-full p-[0.7em] flex items-center justify-center">
                    <img src='/invoice-icon-btn.svg' alt='add-invoice' className="w-[0.63rem] h-[0.63rem] flex-shrink-0" />
                </span>}
            <span className="font-bold text-[0.94rem]">
                {mobileText ? (
                    <>
                        <span className="hidden md:inline text-center">{text}</span>
                        <span className="md:hidden text-center">{mobileText}</span>
                    </>
                ) : text}
            </span>
        </button>
    )
}

export default Button