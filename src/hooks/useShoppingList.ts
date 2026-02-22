import { useState } from 'react'
import type { ShoppingItem } from '../types/shopping'
import { initialData } from '../data/initialData'

export function useShoppingList() {
  const [data, setData] = useState<ShoppingItem[]>(initialData)

  const addItem = (item: ShoppingItem) => {
    setData((prev) => [{...item, isNew: true}, ...prev])
  }

  return { data, addItem }
}
