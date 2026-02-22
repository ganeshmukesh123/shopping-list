import { useState } from 'react'
import type { ToggleProps } from './types'

import './Toggle.scss'

export function Toggle({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)

  const isControlled = checked !== undefined
  const isChecked = isControlled ? checked : internalChecked

  const toggle = () => {
    if (disabled) return

    const next = !isChecked
    if (!isControlled) {
      setInternalChecked(next)
    }
    onChange?.(next)
  }

  return (
    <label className='lp-toggle-wrapper'>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
        className={`lp-toggle ${isChecked ? 'lp-toggle-on' : 'lp-toggle-off'}${disabled ? ' lp-toggle-disabled' : ''}`}
      >
        <span className='lp-toggle-thumb' />
      </button>

      {label && (
        <span className='lp-toggle-label'>{label}</span>
      )}
    </label>
  )
}