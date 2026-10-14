export const CATEGORIES = [
  { id: 'makan', label: 'Makan', icon: '🍜', color: '#F4C99A', type: 'expense' },
  { id: 'transport', label: 'Transport', icon: '🚌', color: '#EFB89A', type: 'expense' },
  { id: 'kos', label: 'Kos', icon: '🏠', color: '#F6DDBE', type: 'expense' },
  { id: 'kuliah', label: 'Kuliah', icon: '📚', color: '#F0CBA8', type: 'expense' },
  { id: 'hiburan', label: 'Hiburan', icon: '🎮', color: '#E9B48F', type: 'expense' },
  { id: 'belanja', label: 'Belanja', icon: '🛍️', color: '#F7D6B0', type: 'expense' },
  { id: 'pengeluaran-lain', label: 'Lainnya', icon: '🧾', color: '#EBD3BC', type: 'expense' },
  { id: 'uang-saku', label: 'Uang saku', icon: '💰', color: '#F4C99A', type: 'income' },
  { id: 'freelance', label: 'Freelance', icon: '💻', color: '#F6DDBE', type: 'income' },
  { id: 'beasiswa', label: 'Beasiswa', icon: '🎓', color: '#EFB89A', type: 'income' },
  { id: 'pemasukan-lain', label: 'Lainnya', icon: '🎁', color: '#F0CBA8', type: 'income' },
]

export const byType = (type) => CATEGORIES.filter((c) => c.type === type)

export const getCategory = (id) =>
  CATEGORIES.find((c) => c.id === id) ?? {
    id,
    label: id,
    icon: '🧾',
    color: '#EBD3BC',
  }
