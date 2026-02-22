import { useState } from 'react'
import { getSubcategoryOptions } from '../data/categories'

export type FilterState = {
  category: string
  subcategory: string
  search: string
}

const initialFilters: FilterState = {
  category: '',
  subcategory: '',
  search: '',
}

export function useFilter() {
  const [filters, setFilters] = useState<FilterState>(initialFilters)

  const subcategoryOptions = getSubcategoryOptions(filters.category)

  const setCategory = (category: string) => {
    setFilters((f) => ({ ...f, category, subcategory: '' }))
  }

  const setSubcategory = (subcategory: string) => {
    setFilters((f) => ({ ...f, subcategory }))
  }

  const setSearch = (search: string) => {
    setFilters((f) => ({ ...f, search }))
  }

  return {
    filters,
    subcategoryOptions,
    setCategory,
    setSubcategory,
    setSearch,
  }
}
