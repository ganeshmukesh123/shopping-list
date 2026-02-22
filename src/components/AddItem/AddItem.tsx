import { useState } from 'react'
import { Dropdown } from '../DropDown/DropDown'
import { CATEGORY_OPTIONS, getSubcategoryOptions } from '../../data/categories'
import type { ShoppingItem } from '../../types/shopping'
import './AddItem.scss'

type AddItemProps = {
  onAdd: (item: ShoppingItem) => void
}

const empty = {
  name: '',
  category: '',
  subcategory: '',
  qty: 0,
  price: 0,
  date: '',
}

export function AddItem({ onAdd }: AddItemProps) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const subcategoryOptions = getSubcategoryOptions(form.category)

  const handleAdd = () => {
    if (!form.name.trim()) return setError('Item name is required.')
    if (!form.category)    return setError('Category is required.')
    if (!form.subcategory) return setError('Sub Category is required.')
    if (form.qty <= 0)     return setError('Quantity must be greater than 0.')
    if (form.price <= 0)   return setError('Price must be greater than 0.')
    if (!form.date)        return setError('Date is required.')

    setError('')
    onAdd({ ...form })
    setForm(empty)
  }

  return (
    <div className="lp-add-item">
      <div className="lp-add-item-row">
        <div className="lp-field">
          <label className="lp-field-label">Add New Item</label>
          <input
            className="lp-input"
            type="text"
            placeholder="Enter Item Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>

        <div className="lp-field">
          <label className="lp-field-label">Category</label>
          <Dropdown
            options={CATEGORY_OPTIONS}
            value={form.category || undefined}
            placeholder="Select"
            onChange={(val) => setForm((f) => ({ ...f, category: val, subcategory: '' }))}
          />
        </div>

        <div className="lp-field">
          <label className="lp-field-label">Sub Category</label>
          <Dropdown
            options={subcategoryOptions}
            value={form.subcategory || undefined}
            placeholder="Select"
            disabled={!form.category}
            onChange={(val) => setForm((f) => ({ ...f, subcategory: val }))}
          />
        </div>

        <div className="lp-field">
          <label className="lp-field-label">Quantity</label>
          <input
            className="lp-input"
            type="number"
            min={0}
            placeholder="0"
            value={form.qty === 0 ? '' : form.qty}
            onChange={(e) => setForm((f) => ({ ...f, qty: Number(e.target.value) }))}
          />
        </div>

        <div className="lp-field">
          <label className="lp-field-label">Price</label>
          <div className="lp-input-prefix-wrapper">
            <span className="lp-input-prefix">$</span>
            <input
              className="lp-input lp-input-prefixed"
              type="number"
              min={0}
              step={0.01}
              placeholder="0"
              value={form.price === 0 ? '' : form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
            />
          </div>
        </div>

        <div className="lp-field">
          <label className="lp-field-label">Date</label>
          <input
            className="lp-input"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>

        <div className="lp-field lp-field-action">
          <label className="lp-field-label">&nbsp;</label>
          <button className="lp-btn-primary" onClick={handleAdd}>
            + Add Item
          </button>
        </div>
      </div>

      {error && <p className="lp-add-item-error">{error}</p>}
    </div>
  )
}
