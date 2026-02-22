import type { ShoppingItem } from '../types/shopping'

export function useExport(data: ShoppingItem[]) {
  const exportToCSV = () => {
    const headers = ['Name', 'Category', 'Sub Category', 'Qty', 'Price', 'Total', 'Date']

    const rows = data.map((item) => [
      item.name,
      item.category,
      item.subcategory,
      item.qty,
      item.price.toFixed(2),
      (item.qty * item.price).toFixed(2),
      new Date(item.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    ])

    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shopping-list.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return { exportToCSV }
}
