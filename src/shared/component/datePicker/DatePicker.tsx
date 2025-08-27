import React, { useState, useEffect, useRef } from 'react';
import styles from './datePicker.module.scss';

interface CustomDatePickerProps {
  onChange?: (date: Date | null) => void;
  name: string;
  value: Date | null;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onChange, name, value }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) onChange(date);
    setError(null);
    setIsOpen(false);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayName = (day: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + offset)));
  };

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .split('/')
      .join('/');
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  return (
    <div className={styles.datePickerContainer}>
      <label htmlFor={name} className={styles.label}>
        Event Date
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={selectedDate ? formatDate(selectedDate) : ''}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.dateInput}
        placeholder="dd/mm/yyyy"
        readOnly
      />
      {isOpen && (
        <div className={styles.calendar} ref={calendarRef}>
          <div className={styles.header}>
            <button onClick={() => changeMonth(-1)} className={styles.navButton}>
              &lt;
            </button>
            <span className={styles.monthYear}>
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </span>
            <button onClick={() => changeMonth(1)} className={styles.navButton}>
              &gt;
            </button>
          </div>
          <div className={styles.daysHeader}>
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} className={styles.dayName}>
                {getDayName(i)}
              </span>
            ))}
          </div>
          <div className={styles.daysGrid}>
            {Array.from({ length: firstDayIndex }, (_, i) => (
              <span key={`empty-${i}`} className={styles.emptyDay}></span>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isSelected =
                selectedDate && date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={day}
                  onClick={() => handleDateChange(date)}
                  className={`${styles.day} ${isSelected ? styles.selected : ''}`}
                  disabled={date > new Date()}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
