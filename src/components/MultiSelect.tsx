// src/components/MultiSelect.tsx
import { useEffect, useRef, useState } from 'react';
import './MultiSelect.scss';
import { MultiSelectProps } from '../types'; // ✅ از این استفاده کن

type Option = {
  label: string;
  value: string;
};

export default function MultiSelect({ options, onChange }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selected, setSelected] = useState<Option[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredOptions(options);
    } else {
      const value = inputValue.toLowerCase();
      setFilteredOptions(
        options.filter((opt) => opt.label.toLowerCase().includes(value)),
      );
    }
  }, [inputValue, options]);

  const handleSelect = (option: Option) => {
    if (!selected.find((s) => s.value === option.value)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange(newSelected);
    }
    setInputValue('');
  };

  const handleAddNew = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !options.find((opt) => opt.label === trimmed)) {
      const newOption = { label: trimmed, value: trimmed };
      const newSelected = [...selected, newOption];
      setSelected(newSelected);
      onChange(newSelected);
    }
    setInputValue('');
  };

  return (
    <div
      className='multi-select'
      ref={dropdownRef}>
      <div
        className='input-box'
        onClick={() => setIsOpen(!isOpen)}>
        <input
          type='text'
          value={inputValue}
          placeholder='Select or type to add'
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddNew();
            }
          }}
        />
        <span className='arrow'>▾</span>
      </div>
      {isOpen && (
        <div className='dropdown'>
          {filteredOptions.map((opt) => (
            <div
              key={opt.value}
              className={`dropdown-item ${
                selected.some((s) => s.value === opt.value) ? 'selected' : ''
              }`}
              onClick={() => handleSelect(opt)}>
              {opt.label}
              {selected.some((s) => s.value === opt.value) && (
                <span className='check'>✔</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
