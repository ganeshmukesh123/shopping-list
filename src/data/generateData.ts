import type { ShoppingItem } from '../types/shopping'
import { CATEGORY_SUBCATEGORY_MAP } from './categories'

// ── Helpers ──────────────────────────────────────────────────────

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number, decimals = 2): number {
  const val = Math.random() * (max - min) + min
  return parseFloat(val.toFixed(decimals))
}

function randomDate(start: Date, end: Date): string {
  const time = start.getTime() + Math.random() * (end.getTime() - start.getTime())
  return new Date(time).toISOString().split('T')[0] // YYYY-MM-DD
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── Core generator ───────────────────────────────────────────────

const CATEGORIES = Object.keys(CATEGORY_SUBCATEGORY_MAP)

const DATE_RANGE = {
  start: new Date('2024-01-01'),
  end:   new Date('2025-12-31'),
}

export function generateItem(index: number): ShoppingItem {
  const category    = randomPick(CATEGORIES)
  const subcategory = randomPick(CATEGORY_SUBCATEGORY_MAP[category])

  return {
    name:        `Item_${index + 1}`,
    category,
    subcategory,
    qty:         randomInt(1, 20),
    price:       randomFloat(0.5, 25),
    date:        randomDate(DATE_RANGE.start, DATE_RANGE.end),
  }
}

export function generateItems(count: number): ShoppingItem[] {
  return Array.from({ length: count }, (_, i) => generateItem(i))
}

// Generate a specific page slice — names stay globally unique using offset
export function generatePage(
  page: number,
  limit: number
): ShoppingItem[] {
  const offset = (page - 1) * limit
  return Array.from({ length: limit }, (_, i) => generateItem(offset + i))
}
