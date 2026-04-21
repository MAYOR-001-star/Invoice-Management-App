type ButtonProps = {
    text: string;
    mobileText?: string;
    onClick: () => void;
    variant: string;
    // styling?: string;
}

const Button = ({ text, mobileText, onClick, variant }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`p-[0.5em] pr-[1.06em] flex justify-center items-center gap-4 bg-[#7C5DFA] hover:bg-[#9277FF] rounded-full transition-colors`}>
            {variant === 'invoice' &&
                <span className="flex-shrink-0 bg-[#FFFFFF] rounded-full p-[0.7em] flex items-center justify-center">
                    <img src='/invoice-icon-btn.svg' alt='add-invoice' className="w-[0.63rem] h-[0.63rem] flex-shrink-0" />
                </span>}
            <span className="text-[#FFFFFF] font-bold text-[0.94rem]">
                {mobileText ? (
                    <>
                        <span className="hidden md:inline">{text}</span>
                        <span className="md:hidden">{mobileText}</span>
                    </>
                ) : text}
            </span>
        </button>
    )
}

export default Button