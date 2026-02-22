import type { ColumnDescriptor } from './types'

export function getGridTemplateColumns<T>(columnDescriptor: ColumnDescriptor<T>[]): string {
  return columnDescriptor.map((col) => col.width ?? 'auto').join(' ')
}
