import { getGridTemplateColumns } from '../Table/constant'
import type { ColumnDescriptor } from '../Table/types'
import './SkeletonRow.scss'

type SkeletonRowProps<T> = {
  columnDescriptor: ColumnDescriptor<T>[]
}

export function SkeletonRow<T extends Record<string, unknown>>({
  columnDescriptor,
}: SkeletonRowProps<T>) {
  const gridTemplateColumns = getGridTemplateColumns(columnDescriptor)

  return (
    <div className="lp-table-row lp-skeleton-row" style={{ gridTemplateColumns }}>
      {columnDescriptor.map((col) => (
        <div key={col.id} className="lp-cell-wrapper">
          <div className="lp-skeleton-cell" />
        </div>
      ))}
    </div>
  )
}
