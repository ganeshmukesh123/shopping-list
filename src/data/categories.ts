type Option = { label: string; value: string }

export const CATEGORY_SUBCATEGORY_MAP: Record<string, string[]> = {
  Bakery:     ['Bagel', 'Bread', 'Croissant', 'Muffin'],
  Beverages:  ['Coffee', 'Juice', 'Soda', 'Tea', 'Water'],
  Dairy:      ['Butter', 'Cheese', 'Eggs', 'Milk', 'Yogurt'],
  Fruits:     ['Apples', 'Bananas', 'Grapes', 'Mango', 'Oranges'],
  Grains:     ['Barley', 'Oats', 'Pasta', 'Quinoa', 'Rice'],
  Meat:       ['Beef', 'Chicken', 'Fish', 'Lamb', 'Pork'],
  Snacks:     ['Biscuits', 'Chips', 'Nuts', 'Popcorn'],
  Vegetables: ['Carrots', 'Onion', 'Potatoes', 'Spinach', 'Tomatoes'],
}

export const CATEGORY_OPTIONS: Option[] = Object.keys(CATEGORY_SUBCATEGORY_MAP).map(
  (cat) => ({ label: cat, value: cat })
)

export function getSubcategoryOptions(category: string): Option[] {
  const subcategories = CATEGORY_SUBCATEGORY_MAP[category] ?? []
  return subcategories.map((sub) => ({ label: sub, value: sub }))
}
