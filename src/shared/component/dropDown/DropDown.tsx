import React, { useState, useRef, useEffect } from 'react';
import styles from './dropDown.module.scss';

interface DropDownItem {
  id: string | number;
  label: string;
}

interface DropDownProps {
  label?: string;
  placeholder: string;
  items: DropDownItem[];
  onSelect: (item: DropDownItem) => void;
  disabled?: boolean;
  value: string;
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  placeholder,
  items,
  onSelect,
  disabled = false,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropDownItem | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Синхронизация value с selectedItem
  useEffect(() => {
    const matchedItem = items.find((item) => item.label === value) || null;
    setSelectedItem(matchedItem);
  }, [value, items]);

  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item: DropDownItem) => {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      {label ? <p className={styles.label}>{label}</p> : null}
      <div
        className={`${styles.header} ${disabled ? styles.disabled : ''}`}
        onClick={toggleDropdown}
      >
        <span className={styles.dropdownValue}>
          {selectedItem ? selectedItem.label : <p className={styles.placeholder}>{placeholder}</p>}
        </span>
        <span className={`${styles.dropdownArrow} ${isOpen ? styles.open : ''}`}>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className={styles.dropDown__container}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`${styles.item} ${item.label === selectedItem?.label ? styles.selected : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
