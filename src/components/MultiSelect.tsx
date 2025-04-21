import { useEffect, useRef, useState } from 'react';
import './MultiSelect.scss';
import { MultiSelectProps } from '../types';
import { nanoid } from 'nanoid';

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
      const filtered = options.filter((opt) =>
        opt.label.toLowerCase().includes(value),
      );
      setFilteredOptions(filtered);
    }
  }, [inputValue, options]);

  const handleSelect = (option: Option) => {
    const alreadySelected = selected.find((s) => s.value === option.value);
    let newSelected;
    if (alreadySelected) {
      newSelected = selected.filter((s) => s.value !== option.value);
    } else {
      newSelected = [...selected, option];
    }
    setSelected(newSelected);
    onChange(newSelected);
    setInputValue('');
  };

  const handleAddNew = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const alreadyExists =
      selected.some((s) => s.label === trimmed) ||
      options.some((opt) => opt.label === trimmed);

    if (!alreadyExists) {
      const newOption = {
        label: trimmed,
        value: `${trimmed}-${nanoid()}`,
      };
      const newSelected = [...selected, newOption];
      setSelected(newSelected);
      onChange(newSelected);
    }

    setInputValue('');
  };

  const handleRemove = (value: string) => {
    const updated = selected.filter((item) => item.value !== value);
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div
      className='multi-select'
      ref={dropdownRef}>
      <div className='selected-tags'>
        {selected.map((tag) => (
          <div
            className='tag'
            key={tag.value}>
            {tag.label}
            <span
              className='remove'
              onClick={() => handleRemove(tag.value)}>
              ✕
            </span>
          </div>
        ))}
      </div>

      <div
        className='input-box'
        onClick={() => setIsOpen(true)}>
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
          {filteredOptions.length === 0 ? (
            <div
              className='no-result'
              onClick={handleAddNew}>
              <span className='plus-icon'>+</span>
              <span className='add-label'>
                Add "<strong>{inputValue}</strong>"
              </span>
            </div>
          ) : (
            filteredOptions.map((opt) => (
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
            ))
          )}
        </div>
      )}
    </div>
  );
}
