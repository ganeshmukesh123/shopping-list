import { useEffect, useRef, useState } from 'react'
import type { DropdownProps, Option } from './types'
import './DropDown.scss'

export function Dropdown<T>({
  options,
  value,
  defaultValue,
  placeholder = 'Select',
  disabled = false,
  onChange,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue)
  const ref = useRef<HTMLDivElement>(null)

  const selectedValue = value ?? internalValue
  const selectedOption = options.find((opt) => opt.value === selectedValue)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: Option<T>) => {
    if (disabled) return
    setInternalValue(option.value)
    onChange?.(option.value)
    setIsOpen(false)
  }

  return (
    <div className={`lp-dropdown${disabled ? ' lp-dropdown-disabled' : ''}`} ref={ref}>
      <button
        className="lp-dropdown-trigger"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        type="button"
      >
        <span className="lp-dropdown-label">{selectedOption?.label || placeholder}</span>
        <span className={`lp-dropdown-arrow${isOpen ? ' open' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <ul className="lp-dropdown-menu" role="listbox">
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={`lp-dropdown-option${option.value === selectedValue ? ' selected' : ''}`}
              role="option"
              aria-selected={option.value === selectedValue}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
