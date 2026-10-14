import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import { getCategory } from '../utils/categories'
import { rupiah, todayStr } from '../utils/format'

export default function Reports({ transactions }) {
  const [month, setMonth] = useState(todayStr().slice(0, 7))

  const data = useMemo(() => {
    const list = transactions.filter((t) => t.date.startsWith(month))
    const sum = (type) => list.filter((t) => t.type === type).reduce((s, t) => s + t.amount, 0)
    const income = sum('income')
    const expense = sum('expense')
    const perCat = {}
    list.filter((t) => t.type === 'expense').forEach((t) => {
      perCat[t.category] = (perCat[t.category] ?? 0) + t.amount
    })
    const cats = Object.entries(perCat).sort((a, b) => b[1] - a[1])
    return { count: list.length, income, expense, balance: income - expense, cats }
  }, [transactions, month])

  const maxIE = Math.max(data.income, data.expense, 1)
  const maxCat = data.cats[0]?.[1] ?? 1

  return (
    <div className="stack">
      <div className="panel row between">
        <h2>Laporan bulanan</h2>
        <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Pilih bulan" />
      </div>

      {data.count === 0 ? (
        <EmptyState title="Belum ada data di bulan ini" hint="Pilih bulan lain atau catat transaksi baru." />
      ) : (
        <>
          <div className="cards">
            <div className="card c-balance"><span>Saldo bulan ini</span><strong>{rupiah(data.balance)}</strong></div>
            <div className="card c-income"><span>Pemasukan</span><strong>{rupiah(data.income)}</strong></div>
            <div className="card c-expense"><span>Pengeluaran</span><strong>{rupiah(data.expense)}</strong></div>
          </div>

          <div className="panel">
            <h2>Pemasukan vs pengeluaran</h2>
            <div className="hbar"><span>Pemasukan</span><div><i style={{ width: `${(data.income / maxIE) * 100}%`, background: '#D67052' }} /></div></div>
            <div className="hbar"><span>Pengeluaran</span><div><i style={{ width: `${(data.expense / maxIE) * 100}%`, background: '#E3A06A' }} /></div></div>
          </div>

          <div className="panel">
            <h2>Pengeluaran per kategori</h2>
            {data.cats.length === 0 && <p className="muted">Belum ada pengeluaran bulan ini.</p>}
            {data.cats.map(([id, value]) => {
              const c = getCategory(id)
              return (
                <div className="hbar" key={id}>
                  <span>{c.icon} {c.label}</span>
                  <div><i style={{ width: `${(value / maxCat) * 100}%`, background: c.color, outline: '1px solid #B9533A' }} /></div>
                  <b>{rupiah(value)}</b>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
