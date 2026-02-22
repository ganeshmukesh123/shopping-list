import type { ShoppingItem } from '../types/shopping'

export const initialData: ShoppingItem[] = [
  { name: 'Milk',     category: 'Dairy',      subcategory: 'Milk',      qty: 2,  price: 4.5,  date: '2025-01-10' },
  { name: 'Bread',    category: 'Bakery',     subcategory: 'Bread',     qty: 1,  price: 2,    date: '2025-03-05' },
  { name: 'Eggs',     category: 'Dairy',      subcategory: 'Eggs',      qty: 12, price: 3.2,  date: '2025-02-14' },
  { name: 'Apples',   category: 'Fruits',     subcategory: 'Apples',    qty: 6,  price: 5,    date: '2025-04-22' },
  { name: 'Oranges',  category: 'Fruits',     subcategory: 'Oranges',   qty: 8,  price: 4.8,  date: '2024-12-01' },
  { name: 'Chicken',  category: 'Meat',       subcategory: 'Chicken',   qty: 1,  price: 10.5, date: '2025-05-18' },
  { name: 'Rice',     category: 'Grains',     subcategory: 'Rice',      qty: 3,  price: 6,    date: '2025-01-30' },
  { name: 'Pasta',    category: 'Grains',     subcategory: 'Pasta',     qty: 2,  price: 3.5,  date: '2025-06-09' },
  { name: 'Tomatoes', category: 'Vegetables', subcategory: 'Tomatoes',  qty: 5,  price: 4,    date: '2024-11-15' },
  { name: 'Carrots',  category: 'Vegetables', subcategory: 'Carrots',   qty: 4,  price: 2.5,  date: '2025-03-27' },
  { name: 'Potatoes', category: 'Vegetables', subcategory: 'Potatoes',  qty: 10, price: 5,    date: '2025-02-02' },
  { name: 'Fish',     category: 'Meat',       subcategory: 'Fish',      qty: 1,  price: 12,   date: '2025-07-11' },
]
