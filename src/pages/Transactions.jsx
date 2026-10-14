import { useMemo, useState } from 'react'
import TransactionList from '../components/TransactionList'
import { CATEGORIES } from '../utils/categories'

// Container: mengelola state filter, lalu menyerahkan hasilnya ke TransactionList (presenter).
export default function Transactions({ transactions, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [category, setCategory] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const filtered = useMemo(
    () =>
      transactions.filter((t) => {
        if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
        if (type !== 'all' && t.type !== type) return false
        if (category !== 'all' && t.category !== category) return false
        if (from && t.date < from) return false
        if (to && t.date > to) return false
        return true
      }),
    [transactions, search, type, category, from, to],
  )

  const reset = () => { setSearch(''); setType('all'); setCategory('all'); setFrom(''); setTo('') }

  return (
    <div className="stack">
      <div className="panel filters">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari transaksi..." aria-label="Cari transaksi" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Jenis">
          <option value="all">Semua jenis</option>
          <option value="income">Pemasukan</option>
          <option value="expense">Pengeluaran</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Kategori">
          <option value="all">Semua kategori</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.icon} {c.label} ({c.type === 'income' ? 'masuk' : 'keluar'})</option>
          ))}
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Dari tanggal" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Sampai tanggal" />
        <button className="btn ghost" onClick={reset}>Reset</button>
      </div>
      <TransactionList transactions={filtered} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}
