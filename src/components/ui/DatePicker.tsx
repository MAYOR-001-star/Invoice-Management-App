import { useState, useRef, useEffect, useMemo } from 'react';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
}

const DatePicker = ({ label, value, onChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedDate = useMemo(() => {
    return value ? new Date(value) : new Date();
  }, [value]);

  const [viewDate, setViewDate] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  useEffect(() => {
    if (!isOpen) {
      setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [selectedDate, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateDisplay = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const currentMonthLabel = `${months[viewDate.getMonth()]} ${viewDate.getFullYear()}`;

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleDateSelect = (day: number, isCurrentMonth: boolean, monthOffset: number = 0) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + monthOffset, day);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const dateStr = String(newDate.getDate()).padStart(2, '0');
    
    onChange({ target: { value: `${year}-${month}-${dateStr}` } });
    if (isCurrentMonth) setIsOpen(false);
  };

  const days = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const result = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
      result.push({ day: prevMonthDays - i, current: false, offset: -1 });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({ day: i, current: true, offset: 0 });
    }
    
    const remaining = 42 - result.length;
    for (let i = 1; i <= remaining; i++) {
        result.push({ day: i, current: false, offset: 1 });
    }
    
    return result;
  }, [viewDate]);

  return (
    <div className="flex flex-col gap-[0.63rem] w-full relative group" ref={containerRef}>
      <label className="text-[0.81rem] font-medium text-[var(--color-text-accent)] group-focus-within:text-[#7C5DFA] transition-colors">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full bg-[var(--color-field-bg)] border border-[var(--color-field-border)] rounded-[4px] px-[1.25rem] py-[1.06rem] text-[var(--color-text-primary)] text-[0.94rem] font-bold flex justify-between items-center transition-all outline-none hover:border-[#7C5DFA] focus:border-[#7C5DFA]"
      >
        <span>{formatDateDisplay(selectedDate)}</span>
        <img src="/calendar.svg" alt="calendar" className="w-[1rem] h-[1rem]" />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-[var(--color-surface)] rounded-lg shadow-[0_10px_20px_rgba(72,84,159,0.25)] p-[1.5rem] z-20 animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center mb-[2rem]">
            <button type="button" onClick={() => changeMonth(-1)} className="hover:opacity-70 transition-opacity">
               <svg width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 1l-4.2 4.2 4.2 4.2" stroke="#7C5DFA" strokeWidth="2" fill="none" /></svg>
            </button>
            <span className="text-[0.94rem] font-bold text-[var(--color-text-primary)]">{currentMonthLabel}</span>
            <button type="button" onClick={() => changeMonth(1)} className="hover:opacity-70 transition-opacity">
                <svg width="7" height="11" viewBox="0 0 7 11"><path d="M1.6 1l4.2 4.2-4.2 4.2" stroke="#7C5DFA" strokeWidth="2" fill="none" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 text-center">
            {days.map((item, idx) => {
              const isSelected = item.current && 
                               selectedDate.getDate() === item.day && 
                               selectedDate.getMonth() === viewDate.getMonth() && 
                               selectedDate.getFullYear() === viewDate.getFullYear();
              
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDateSelect(item.day, item.current, item.offset)}
                  className={`text-[0.94rem] font-bold transition-colors hover:text-[#7C5DFA]
                    ${item.current ? 'text-[var(--color-text-primary)]' : 'text-[#DFE3FA] opacity-20'}
                    ${isSelected ? 'text-[#7C5DFA]' : ''}
                  `}
                >
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
