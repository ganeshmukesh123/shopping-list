import { useState } from 'react'
import type { SortState, SortDirection } from '../components/Table/types'

const nextDirection: Record<SortDirection, SortDirection> = {
  default: 'asc',
  asc: 'desc',
  desc: 'default',
}

export function useSort() {
  const [sortState, setSortState] = useState<SortState>(null)

  const handleSortChange = (columnId: string) => {
    setSortState((prev) => {
      const currentDir: SortDirection = prev?.columnId === columnId ? prev.direction : 'default'
      return { columnId, direction: nextDirection[currentDir] }
    })
  }

  return { sortState, handleSortChange }
}
