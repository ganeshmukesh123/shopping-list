import { useRef, useCallback, type CSSProperties } from 'react'
import type { TableProps } from './types'
import { defaultTheme } from './types'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import { SkeletonRow } from '../Skeleton'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import './Table.scss'

const SKELETON_ROW_COUNT = 3

export default function Table<T extends Record<string, unknown>>({
  columnDescriptor,
  data,
  theme = {},
  height,
  sortState,
  onSortChange,
  isLoading    = false,
  isLoadingMore = false,
  hasMore      = false,
  onLoadMore,
}: TableProps<T>) {
  const mergedTheme  = { ...defaultTheme, ...theme }
  const sentinelRef  = useRef<HTMLDivElement>(null)
  const tableBodyRef = useRef<HTMLDivElement>(null)

  // Stable callback ref — avoids re-attaching observer on every render
  const handleLoadMore = useCallback(() => {
    if (hasMore && !isLoadingMore && onLoadMore) {
      onLoadMore()
    }
  }, [hasMore, isLoadingMore, onLoadMore])

  useIntersectionObserver(sentinelRef, handleLoadMore, {
    root: tableBodyRef.current,
    rootMargin: '100px',
    enabled: hasMore && !isLoadingMore && !!onLoadMore,
  })

  const cssVars = {
    '--table-header-bg':      mergedTheme.headerBackground,
    '--table-header-color':   mergedTheme.headerTextColor,
    '--table-header-font-size': mergedTheme.headerFontSize,
    '--table-header-font-weight': mergedTheme.headerFontWeight,
    '--table-row-bg':         mergedTheme.rowBackground,
    '--table-row-hover-bg':   mergedTheme.rowHoverBackground,
    '--table-row-color':      mergedTheme.rowTextColor,
    '--table-border-color':   mergedTheme.borderColor,
    '--table-cell-padding':   mergedTheme.cellPadding,
    '--table-font-size':      mergedTheme.fontSize,
    '--table-height':         height ?? mergedTheme.height,
  } as CSSProperties

  return (
    <div className="lp-table" style={cssVars} ref={tableBodyRef}>
      <TableHeader
        columnDescriptor={columnDescriptor}
        sortState={sortState}
        onSort={onSortChange}
      />

      <div className="lp-table-body">
        {/* Initial loading — show skeleton rows in place of data */}
        {isLoading && !data.length && (
          Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
            <SkeletonRow key={`skeleton-init-${i}`} columnDescriptor={columnDescriptor} />
          ))
        )}

        {/* Data rows */}
        {data.map((item, rowIndex) => (
          <TableRow
            key={rowIndex}
            item={item}
            columnDescriptor={columnDescriptor}
          />
        ))}

        {/* Load-more skeleton rows — appended below existing data */}
        {isLoadingMore && (
          Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
            <SkeletonRow key={`skeleton-more-${i}`} columnDescriptor={columnDescriptor} />
          ))
        )}

        {/* Sentinel — invisible div watched by IntersectionObserver */}
        {hasMore && (
          <div ref={sentinelRef} className="lp-table-sentinel" aria-hidden="true" />
        )}
      </div>
    </div>
  )
}
