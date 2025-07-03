import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './datePicker.module.scss';

interface DatePickerComponentProps {
  onDateChange?: (date: string) => void;
  initialDate?: string; // Формат дд/мм/гггг
  name: string;
  value: string;
}

export const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  onDateChange,
  initialDate,
  name,
  value = '',
}) => {
  const parseInitialDate = (dateStr: string | undefined): Date | null => {
    if (!dateStr) return null;
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(dateStr)) return null;
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate ? parseInitialDate(initialDate) : null,
  );
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: Date | null): string => {
    if (!date || isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const validateDate = (input: string): boolean => {
    if (!input) {
      setError('Please select or enter a date');
      return false;
    }
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(input)) {
      setError('Date must be in format dd/mm/yyyy');
      return false;
    }
    const [day, month, year] = input.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime()) || date.getMonth() + 1 !== month || date.getDate() !== day) {
      setError('Please enter a valid date');
      return false;
    }
    setError(null);
    return true;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    if (formattedDate && validateDate(formattedDate) && onDateChange) {
      onDateChange(formattedDate);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (validateDate(input)) {
      const [day, month, year] = input.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      setSelectedDate(date);
      if (onDateChange) {
        onDateChange(input);
      }
    }
  };

  return (
    <div className={styles.datePickerContainer}>
      <label htmlFor="datePicker" className={styles.label}>
        Event Date
      </label>
      <DatePicker
        name={name}
        id="datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        onInputChange={handleInputChange}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        value={value}
        className={styles.datePickerInput}
        placeholderText="дд/мм/гггг"
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
