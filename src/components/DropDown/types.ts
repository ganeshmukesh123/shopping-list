export type Option<T = string> = {
  label: string
  value: T
}

export interface DropdownProps<T> {
  options: Option<T>[]
  value?: T
  defaultValue?: T
  placeholder?: string
  disabled?: boolean
  onChange?: (value: T) => void
}