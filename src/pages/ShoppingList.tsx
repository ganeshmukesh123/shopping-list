import Table from '../components/Table/Table'
import { AddItem } from '../components/AddItem/AddItem'
import { ListHeader } from '../components/ListHeader/ListHeader'
import type { ColumnDescriptor } from '../components/Table/types'
import type { ShoppingItem } from '../types/shopping'
import { CATEGORY_OPTIONS } from '../data/categories'
import { useFilter } from '../hooks/useFilter'
import { useSort } from '../hooks/useSort'
import { useExport } from '../hooks/useExport'
import { useFetchShoppingList } from '../hooks/useFetchShoppingList'

const columnDescriptor: ColumnDescriptor<ShoppingItem>[] = [
  {
    id: 'name',
    label: 'Item Name',
    width: 'minmax(140px, 1.5fr)',
    headerCellRender: (col) => col.label,
    itemCellRender: (item) => item.name,
    sortable: true,
  },
  {
    id: 'category',
    label: 'Category',
    width: 'minmax(120px, 1fr)',
    headerCellRender: (col) => col.label,
    itemCellRender: (item) => item.category,
    sortable: true,
  },
  {
    id: 'subcategory',
    label: 'Sub Category',
    width: 'minmax(140px, 1fr)',
    headerCellRender: (col) => col.label,
    itemCellRender: (item) => item.subcategory,
    sortable: true,
  },
  {
    id: 'qty',
    label: 'Quantity',
    width: 'minmax(90px, 0.7fr)',
    headerCellRender: (col) => col.label,
    itemCellRender: (item) => item.qty,
    sortable: true,
  },
  {
    id: 'price',
    label: 'Price',
    width: 'minmax(90px, 0.7fr)',
    headerCellRender: (col) => col.label,
    itemCellRender: (item) => `$${item.price.toFixed(2)}`,
    sortable: true,
  },
  {
    id: 'total',
    label: 'Total',
    width: 'minmax(90px, 0.7fr)',
    headerCellRender: (col) => col.label,
    itemCellRender: (item) => `$${(item.qty * item.price).toFixed(2)}`,
    sortable: true,
  },
  {
    id: 'date',
    label: 'Date',
    width: 'minmax(110px, 0.8fr)',
    headerCellRender: (col) => col.label,
    itemCellRender: (item) =>
      new Date(item.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    sortable: true,
  },
]

type ShoppingListProps = {
  darkMode: boolean
}

export default function ShoppingList({ darkMode }: ShoppingListProps) {
  const { filters, subcategoryOptions,
          setCategory, setSubcategory, setSearch }    = useFilter()
  const { sortState, handleSortChange }               = useSort()
  const { data, total, hasMore,
          isLoading, isLoadingMore,
          addItem, loadMore }                         = useFetchShoppingList(filters, sortState)
  const { exportToCSV }                               = useExport(data)

  const darkTableTheme = darkMode ? {
    headerBackground:   '#1a1a2e',
    headerTextColor:    '#cdd6f4',
    rowBackground:      '#13131f',
    rowHoverBackground: '#2a2a3a',
    rowTextColor:       '#cdd6f4',
    borderColor:        '#2e2e42',
  } : {}

  return (
    <>
      <div className="lp-sub-header">
        <div className="lp-page-title">
          <span className="lp-page-title-icon">🛒</span>
          Shopping List Application
        </div>
        <button className="lp-view-report-btn">📊 View Report</button>
      </div>

      <main className="lp-container">
        <AddItem onAdd={addItem} />

        <ListHeader
          count={total}
          categoryOptions={CATEGORY_OPTIONS}
          subcategoryOptions={subcategoryOptions}
          selectedCategory={filters.category}
          selectedSubcategory={filters.subcategory}
          search={filters.search}
          onCategoryChange={setCategory}
          onSubcategoryChange={setSubcategory}
          onSearchChange={setSearch}
          onExport={exportToCSV}
        />

        <Table
          columnDescriptor={columnDescriptor}
          data={data}
          height="calc(100vh - 380px)"
          sortState={sortState}
          onSortChange={handleSortChange}
          theme={darkTableTheme}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </main>
    </>
  )
}
