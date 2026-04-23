type ButtonProps = {
    text: string;
    mobileText?: string;
    onClick: () => void;
    variant?: string;
    className?: string;
}

const Button = ({ text, mobileText, onClick, variant, className }: ButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`cursor-pointer flex justify-center items-center transition-all rounded-full
                ${!className?.includes('hover:') ? 'hover:opacity-80' : ''}
                ${!className && (variant === 'invoice' ? 'p-[0.5em] pr-[1.06em] gap-4' : 'px-6 py-4')} 
                ${!className && (
                    variant === 'edit' ? 'bg-[var(--color-faded-bg)] text-[var(--color-text-accent)] hover:bg-[var(--color-field-border)] transition-colors' : 
                    variant === 'delete' ? 'bg-[var(--color-error)] text-[#FFFFFF] hover:bg-[var(--color-error-light)] transition-colors' : 
                    variant === 'dark' ? 'bg-[#373B53] text-[var(--color-text-secondary)] hover:bg-[var(--color-text-primary)] transition-colors' :
                    'bg-[var(--color-primary)] text-[#FFFFFF] hover:bg-[var(--color-primary-light)] transition-colors'
                )}
                ${className || ''}
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