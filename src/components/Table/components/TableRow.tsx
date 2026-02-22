import type { TableRowProps } from '../types'
import { getGridTemplateColumns } from '../constant'

export default function TableRow<T extends Record<string, unknown>>({
  item,
  columnDescriptor,
}: TableRowProps<T>) {
  const gridTemplateColumns = getGridTemplateColumns(columnDescriptor)
  return (
    <div className="lp-table-row" style={{ gridTemplateColumns }}>
      {columnDescriptor.map((column) => {
        const content = column.itemCellRender
          ? column.itemCellRender(item, column)
          : (item[column.id] as React.ReactNode)

        return (
          <div key={column.id} className="lp-cell-wrapper">
            <div className="lp-cell">{content}</div>
          </div>
        )
      })}
    </div>
  )
}
