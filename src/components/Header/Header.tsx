import { Toggle } from '../Toggle/Toggle'

type HeaderProps = {
  darkMode: boolean
  onDarkModeChange: (val: boolean) => void
}

export function Header({ darkMode, onDarkModeChange }: HeaderProps) {
  return (
    <header className="lp-header">
      <div className="lp-header-left">
        <span className="lp-logo">◆ ZETA</span>
      </div>
      <div className="lp-header-right">
        <span>Dark Mode</span>
        <Toggle checked={darkMode} onChange={onDarkModeChange} />
      </div>
    </header>
  )
}
