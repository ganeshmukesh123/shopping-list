import React from 'react'

export type SortDirection = 'default' | 'asc' | 'desc'

export type SortState = {
  columnId: string
  direction: SortDirection
} | null

export type SortAccessor<T> = (row: T) => unknown

export type ColumnDescriptor<T = Record<string, unknown>> = {
  id: string
  label: string
  width?: string
  sortable?: boolean
  headerCellRender?: (column: ColumnDescriptor<T>) => React.ReactNode
  itemCellRender?: (item: T, column: ColumnDescriptor<T>) => React.ReactNode
}

export type TableTheme = {
  headerBackground?: string
  headerTextColor?: string
  headerFontSize?: string
  headerFontWeight?: string | number
  rowBackground?: string
  rowHoverBackground?: string
  rowTextColor?: string
  borderColor?: string
  cellPadding?: string
  fontSize?: string
  height?: string
}

export const defaultTheme: TableTheme = {
  headerBackground: '#fafafa',
  headerTextColor: '#333',
  headerFontSize: '14px',
  headerFontWeight: 700,
  rowBackground: '#fff',
  rowHoverBackground: '#f5f5f5',
  rowTextColor: '#333',
  borderColor: '#ebebeb',
  cellPadding: '12px 16px',
  fontSize: '14px',
  height: '400px',
}

// ── TableHeader ──────────────────────────────────────────────────
export type TableHeaderProps<T = Record<string, unknown>> = {
  columnDescriptor: ColumnDescriptor<T>[]
  sortState: SortState                 // controlled from outside — read only
  onSort: (columnId: string) => void   // bubble up: "user clicked this column"
}

// ── TableRow ─────────────────────────────────────────────────────
export type TableRowProps<T = Record<string, unknown>> = {
  item: T
  columnDescriptor: ColumnDescriptor<T>[]
}

// ── Table ─────────────────────────────────────────────────────────
export type TableProps<T = Record<string, unknown>> = {
  columnDescriptor: ColumnDescriptor<T>[]
  data: T[]                              // parent passes already-sorted data
  theme?: TableTheme
  height?: string
  sortState: SortState                   // controlled — parent owns sort state
  onSortChange: (columnId: string) => void // parent handles state transition
  // ── Infinite scroll ────────────────────────────────────────────
  isLoading?: boolean                    // true on initial page 1 fetch
  isLoadingMore?: boolean                // true while fetching next pages
  hasMore?: boolean                      // whether more pages exist
  onLoadMore?: () => void                // called when sentinel enters viewport
}
