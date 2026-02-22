import { useState, useEffect, useRef, useCallback } from 'react'
import type { ShoppingItem } from '../types/shopping'
import type { SortState } from '../components/Table/types'
import { fetchShoppingItems, addShoppingItem } from '../services/shoppingApi'

type FilterState = {
  category: string
  subcategory: string
  search: string
}

const PAGE_LIMIT = 10

export function useFetchShoppingList(filters: FilterState, sortState: SortState) {
  const [data, setData]               = useState<ShoppingItem[]>([])
  const [total, setTotal]             = useState(0)
  const [hasMore, setHasMore]         = useState(false)
  const [isLoading, setIsLoading]     = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError]             = useState<string | null>(null)
  const pageRef                       = useRef(1)

  // ── Build fetch params from current filters + sort ───────────────
  const buildParams = useCallback(
    (page: number) => ({
      page,
      limit: PAGE_LIMIT,
      category:       filters.category   || undefined,
      subcategory:    filters.subcategory || undefined,
      search:         filters.search     || undefined,
      sortColumn:     sortState && sortState.direction !== 'default' ? sortState.columnId  : undefined,
      sortDirection:  sortState && sortState.direction !== 'default' ? sortState.direction : undefined,
    }),
    [filters, sortState]
  )

  // ── Initial / reset fetch (page 1) ───────────────────────────────
  useEffect(() => {
    let cancelled = false

    async function loadFirst() {
      setIsLoading(true)
      setError(null)
      pageRef.current = 1

      try {
        const res = await fetchShoppingItems(buildParams(1))
        if (!cancelled) {
          setData(res.data)
          setTotal(res.total)
          setHasMore(res.hasMore)
          pageRef.current = 1
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load data.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadFirst()
    return () => { cancelled = true }
  }, [buildParams])

  // ── Load next page (called by infinite scroll) ───────────────────
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return

    const nextPage = pageRef.current + 1
    setIsLoadingMore(true)

    try {
      const res = await fetchShoppingItems(buildParams(nextPage))
      setData((prev) => [...prev, ...res.data])
      setTotal(res.total)
      setHasMore(res.hasMore)
      pageRef.current = nextPage
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load more.')
    } finally {
      setIsLoadingMore(false)
    }
  }, [isLoadingMore, hasMore, buildParams])

  // ── Optimistic add ───────────────────────────────────────────────
  const addItem = useCallback(async (item: ShoppingItem) => {
    try {
      await addShoppingItem(item)
      setData((prev) => [item, ...prev])
      setTotal((prev) => prev + 1)
    } catch {
      setError('Failed to add item. Please try again.')
    }
  }, [])

  return {
    data,
    total,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    addItem,
  }
}
