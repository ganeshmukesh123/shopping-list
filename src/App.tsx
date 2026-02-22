import { useState } from 'react'
import { Header } from './components/Header/Header'
import ShoppingList from './pages/ShoppingList'
import './styles/layout.css'
import './index.css'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`lp-page${darkMode ? ' dark' : ''}`}>
      <Header darkMode={darkMode} onDarkModeChange={setDarkMode} />
      <ShoppingList darkMode={darkMode} />
    </div>
  )
}
