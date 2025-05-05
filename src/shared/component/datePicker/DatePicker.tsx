import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  dateFormat?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  error,
  dateFormat = 'dd.MM.yyyy',
  value,
  onChange,
  ...props
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayValue, setDisplayValue] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const datePickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Инициализация значений
  useEffect(() => {
    if (value) {
      const date = new Date(value as string);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
        setDisplayValue(formatDate(date, dateFormat));
      }
    }
  }, [value, dateFormat]);

  // Закрытие календаря при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date: Date, format: string): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return format.replace('dd', day).replace('MM', month).replace('yyyy', year.toString());
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date, dateFormat);
    setDisplayValue(formattedDate);
    setShowCalendar(false);

    // Эмулируем событие onChange для input
    if (onChange) {
      const event = {
        target: {
          value: date.toISOString().split('T')[0],
          name: props.name || '',
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const handleInputFocus = () => {
    setShowCalendar(true);
    if (!selectedDate) {
      const today = new Date();
      setCurrentMonth(today.getMonth());
      setCurrentYear(today.getFullYear());
    }
  };

  const renderDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    // Пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected =
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div
          key={`day-${day}`}
          className={`day ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  const changeMonth = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  return (
    <div className="date-picker" ref={datePickerRef}>
      {label && <label className="date-picker-label">{label}</label>}

      <input
        {...props}
        ref={inputRef}
        type="text"
        value={displayValue}
        readOnly
        onFocus={handleInputFocus}
        className={`date-picker-input ${error ? 'error' : ''}`}
      />

      {showCalendar && (
        <div className="calendar">
          <div className="calendar-header">
            <button className="nav-button" onClick={() => changeMonth(-1)} type="button">
              &lt;
            </button>
            <span className="month-year">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button className="nav-button" onClick={() => changeMonth(1)} type="button">
              &gt;
            </button>
          </div>

          <div className="week-days">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <div key={day} className="week-day">
                {day}
              </div>
            ))}
          </div>

          <div className="days-grid">{renderDays()}</div>
        </div>
      )}

      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export { DatePicker };
