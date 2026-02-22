import { Dropdown } from '../DropDown/DropDown'
import './ListHeader.scss'

type Option = { label: string; value: string }

type ListHeaderProps = {
  count: number
  categoryOptions: Option[]
  subcategoryOptions: Option[]
  selectedCategory: string
  selectedSubcategory: string
  search: string
  onCategoryChange: (val: string) => void
  onSubcategoryChange: (val: string) => void
  onSearchChange: (val: string) => void
  onExport: () => void
}

export function ListHeader({
  count,
  categoryOptions,
  subcategoryOptions,
  selectedCategory,
  selectedSubcategory,
  search,
  onCategoryChange,
  onSubcategoryChange,
  onSearchChange,
  onExport,
}: ListHeaderProps) {

  return (
    <div className="lp-list-header">
      <div className="lp-list-header-left">
        <span className="lp-item-count">{count} Items</span>
      </div>

      <div className="lp-list-header-right">
        <span className="lp-filter-label">Filter By</span>
        <div className='lp-filter-category'>
          <Dropdown
            options={[{ label: 'All Categories', value: '' }, ...categoryOptions]}
            value={selectedCategory || undefined}
            placeholder="Select Category"
            onChange={(val) => onCategoryChange(val)}
          />
        </div>
        <div className='lp-filter-sub-category'>
          <Dropdown
            options={[{ label: 'All Sub Categories', value: '' }, ...subcategoryOptions]}
            value={selectedSubcategory || undefined}
            placeholder="Select Sub Category"
            disabled={!selectedCategory}
            onChange={(val) => onSubcategoryChange(val)}
          />
        </div>

        <div className="lp-search-wrapper">
          <span className="lp-search-icon">🔍</span>
          <input
            className="lp-search-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button className="lp-btn-outline" onClick={onExport}>
          📄 Export Data
        </button>
      </div>
    </div>
  )
}

