import React from "react";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const DatePicker = ({ label, ...props }: DatePickerProps) => {
  const inputId = React.useId();

  return (
    <div className="flex flex-col gap-[0.63rem] w-full group">
      <label
        htmlFor={inputId}
        className="text-[0.81rem] font-medium text-[#7E88C3] group-focus-within:text-[#7C5DFA] transition-colors"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type="date"
          className="w-full bg-white border border-[#DFE3FA] rounded-[4px] px-[1.25rem] py-[1.06rem] text-[#0C0E16] text-[0.94rem] font-bold outline-none transition-all focus:border-[#7C5DFA] hover:border-[#7C5DFA] cursor-pointer appearance-none"
          {...props}
        />
        {/* Using the filter-dropdown icon as a placeholder if a calendar icon is missing, or just a custom SVG */}
        <svg
          className="absolute right-[1.25rem] top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 fill-[#7E88C3]"
          viewBox="0 0 24 24"
        >
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
        </svg>
      </div>
    </div>
  );
};

export default DatePicker;
