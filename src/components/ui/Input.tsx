import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
  hideLabelOnDesktop?: boolean;
}

const Input = ({ label, error, hideLabel, hideLabelOnDesktop, ...props }: InputProps) => {
  const inputId = React.useId();

  return (
    <div className="flex flex-col gap-[0.63rem] w-full group">
      {(label || error) && (
        <div className={`flex justify-between items-center ${hideLabel ? 'sr-only' : ''} ${hideLabelOnDesktop ? 'md:sr-only' : ''}`}>
          {label && (
            <label 
              htmlFor={inputId} 
              className={`text-[0.81rem] font-medium transition-colors ${
                error ? 'text-[var(--color-error)]' : 'text-[#7E88C3] group-focus-within:text-[var(--color-primary)]'
              }`}
            >
              {label}
            </label>
          )}
          {error && (
            <span className="text-[var(--color-error)] text-[0.63rem] font-semibold tracking-[-0.21px]">
              {error}
            </span>
          )}
        </div>
      )}
      <input
        id={inputId}
        className={`w-full bg-[var(--color-field-bg)] border rounded-[4px] px-[1.25rem] py-[1.06rem] text-[var(--color-text-primary)] text-[0.94rem] font-bold outline-none transition-all placeholder:text-[var(--color-text-primary)] placeholder:opacity-40
          ${error 
            ? 'border-[var(--color-error)] focus:border-[var(--color-error)]' 
            : 'border-[var(--color-field-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
          }
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
