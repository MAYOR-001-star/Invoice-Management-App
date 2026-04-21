import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
}

const Input = ({ label, error, hideLabel, ...props }: InputProps) => {
  const inputId = React.useId();

  return (
    <div className="flex flex-col gap-[0.63rem] w-full group">
      {(label || error) && (
        <div className={`flex justify-between items-center ${hideLabel ? 'sr-only' : ''}`}>
          {label && (
            <label 
              htmlFor={inputId} 
              className={`text-[0.81rem] font-medium transition-colors ${
                error ? 'text-[#EC5757]' : 'text-[#7E88C3] group-focus-within:text-[#7C5DFA]'
              }`}
            >
              {label}
            </label>
          )}
          {error && (
            <span className="text-[#EC5757] text-[0.63rem] font-semibold tracking-[-0.21px]">
              {error}
            </span>
          )}
        </div>
      )}
      <input
        id={inputId}
        className={`w-full bg-white border rounded-[4px] px-[1.25rem] py-[1.06rem] text-[#0C0E16] text-[0.94rem] font-bold outline-none transition-all placeholder:text-[#0C0E16] placeholder:opacity-40
          ${error 
            ? 'border-[#EC5757] focus:border-[#EC5757]' 
            : 'border-[#DFE3FA] focus:border-[#7C5DFA] hover:border-[#7C5DFA]'
          }
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
