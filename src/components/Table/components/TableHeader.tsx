import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import type { TableHeaderProps } from '../types'
import { getGridTemplateColumns } from '../constant'

export default function TableHeader<T extends Record<string, unknown>>({
  columnDescriptor,
  sortState,
  onSort,
}: TableHeaderProps<T>) {
  const gridTemplateColumns = getGridTemplateColumns(columnDescriptor)

  const getSortIcon = (columnId: string) => {
    if (!sortState || sortState.columnId !== columnId || sortState.direction === 'default') {
      return <FaSort />
    }
    return sortState.direction === 'asc' ? <FaSortUp /> : <FaSortDown />
  }

  return (
    <div className="lp-table-header" style={{ gridTemplateColumns }}>
      {columnDescriptor.map((column) => {
        const content = column.headerCellRender
          ? column.headerCellRender(column)
          : column.label

        const isActive =
          sortState?.columnId === column.id && sortState.direction !== 'default'

        return (
          <div
            key={column.id}
            className={`lp-cell-wrapper header-cell-wrapper${isActive ? ' sorted' : ''}`}
          >
            <div className="header-cell">{content}</div>

            {column.sortable && (
              <div
                className="header-cell-sort"
                onClick={() => onSort(column.id)}
                title={`Sort by ${column.label}`}
              >
                {getSortIcon(column.id)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
