import type { ShoppingItem } from '../types/shopping'
import { generateItems } from '../data/generateData'

// Total virtual dataset size
const TOTAL_ITEMS = 120

export type FetchParams = {
  page: number
  limit: number
  category?: string
  subcategory?: string
  search?: string
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
}

export type PagedResponse<T> = {
  data: T[]
  total: number
  hasMore: boolean
}

// ── Mock data (replace BASE_URL + fetch call when a real API is available) ──

// const BASE_URL = '/api/shopping-items'

// Generated once at module load — stable across filter/sort/page changes
// Names are Item_1 … Item_N, globally unique by index
const ALL_ITEMS: ShoppingItem[] = generateItems(TOTAL_ITEMS)

// ── Simulate network delay ───────────────────────────────────────
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── Mock implementation ──────────────────────────────────────────
// When a real API is ready, replace this function body with:
//
//   const url = new URL(BASE_URL)
//   url.searchParams.set('page', String(params.page))
//   url.searchParams.set('limit', String(params.limit))
//   if (params.category)      url.searchParams.set('category', params.category)
//   if (params.subcategory)   url.searchParams.set('subcategory', params.subcategory)
//   if (params.search)        url.searchParams.set('search', params.search)
//   if (params.sortColumn)    url.searchParams.set('sortColumn', params.sortColumn)
//   if (params.sortDirection) url.searchParams.set('sortDirection', params.sortDirection)
//   const res = await fetch(url.toString())
//   if (!res.ok) throw new Error(`API error: ${res.status}`)
//   return res.json() as Promise<PagedResponse<ShoppingItem>>

export async function fetchShoppingItems(
  params: FetchParams
): Promise<PagedResponse<ShoppingItem>> {
  await delay(600)

  let items = [...ALL_ITEMS]

  // Filter
  if (params.category) {
    items = items.filter((i) => i.category === params.category)
  }
  if (params.subcategory) {
    items = items.filter((i) => i.subcategory === params.subcategory)
  }
  if (params.search) {
    const q = params.search.toLowerCase()
    items = items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.subcategory.toLowerCase().includes(q)
    )
  }

  // Sort
  if (params.sortColumn && params.sortDirection) {
    items = items.sort((a, b) => {
      let aVal: unknown
      let bVal: unknown

      if (params.sortColumn === 'total') {
        aVal = a.qty * a.price
        bVal = b.qty * b.price
      } else if (params.sortColumn === 'date') {
        aVal = new Date(a.date).getTime()
        bVal = new Date(b.date).getTime()
      } else {
        aVal = a[params.sortColumn as keyof ShoppingItem]
        bVal = b[params.sortColumn as keyof ShoppingItem]
      }

      const cmp =
        typeof aVal === 'number' && typeof bVal === 'number'
          ? aVal - bVal
          : String(aVal ?? '').localeCompare(String(bVal ?? ''))

      return params.sortDirection === 'asc' ? cmp : -cmp
    })
  }

  const total = items.length
  const start = (params.page - 1) * params.limit
  const end   = start + params.limit
  const data  = items.slice(start, end)

  return {
    data,
    total,
    hasMore: end < total,
  }
}

export async function addShoppingItem(item: ShoppingItem): Promise<ShoppingItem> {
  await delay(300)
  // Replace with: return fetch(BASE_URL, { method: 'POST', body: JSON.stringify(item), headers: { 'Content-Type': 'application/json' } }).then(r => r.json())
  return item
}
