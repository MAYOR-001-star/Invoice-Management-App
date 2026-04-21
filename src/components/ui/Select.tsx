import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const Select = ({ label, options, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-[0.63rem] w-full relative group" ref={containerRef}>
      <label className="text-[0.81rem] font-medium text-[#7E88C3] group-focus-within:text-[#7C5DFA] transition-colors line-clamp-1">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`w-full bg-white border border-[#DFE3FA] rounded-[4px] px-[1.25rem] py-[1.06rem] text-[#0C0E16] text-[0.94rem] font-bold flex justify-between items-center transition-all outline-none hover:border-[#7C5DFA] focus:border-[#7C5DFA] ${
          isOpen ? 'border-[#7C5DFA]' : ''
        }`}
      >
        <span className="truncate">{selectedOption?.label || 'Select option'}</span>
        <img 
          src="/filter-dropdown.svg" 
          alt="arrow" 
          className={`transition-transform duration-300 w-[0.63rem] ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white rounded-lg shadow-[0_10px_20px_rgba(72,84,159,0.25)] overflow-hidden z-20">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-[1.5rem] py-[1rem] text-[0.94rem] font-bold border-b border-[#DFE3FA] last:border-b-0 hover:text-[#7C5DFA] transition-colors outline-none focus:bg-[#F9FAFE] ${
                option.value === value ? 'text-[#7C5DFA]' : 'text-[#0C0E16]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
