import EmptyState from './EmptyState'
import { getCategory } from '../utils/categories'
import { formatDay, rupiah } from '../utils/format'

function groupByDate(sorted) {
  const groups = []
  for (const t of sorted) {
    const last = groups[groups.length - 1]
    if (last && last.date === t.date) last.items.push(t)
    else groups.push({ date: t.date, items: [t] })
  }
  return groups
}

// Presenter: hanya menampilkan data yang diberikan lewat props.
export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return <EmptyState title="Belum ada transaksi" hint="Tekan tombol + untuk mencatat yang pertama." />
  }

  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="tx-groups">
      {groupByDate(sorted).map((g) => {
        const total = g.items.reduce(
          (s, t) => s + (t.type === 'income' ? t.amount : -t.amount),
          0,
        )
        return (
          <section key={g.date}>
            <div className="day-head">
              <span>{formatDay(g.date)}</span>
              <span>{total >= 0 ? '+' : '−'} {rupiah(Math.abs(total))}</span>
            </div>
            {g.items.map((t) => {
              const cat = getCategory(t.category)
              return (
                <article className="tx" key={t.id} style={{ background: cat.color }}>
                  <span className="tx-icon" aria-hidden="true">{cat.icon}</span>
                  <div className="tx-main">
                    <strong>{t.title}</strong>
                    <small>{cat.label} · {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</small>
                  </div>
                  <b className={t.type === 'income' ? 'in' : ''}>
                    {t.type === 'income' ? '+' : '−'} {rupiah(t.amount)}
                  </b>
                  <div className="tx-actions">
                    <button onClick={() => onEdit(t)} aria-label={`Edit ${t.title}`}>Edit</button>
                    <button onClick={() => onDelete(t)} aria-label={`Hapus ${t.title}`}>Hapus</button>
                  </div>
                </article>
              )
            })}
          </section>
        )
      })}
    </div>
  )
}
