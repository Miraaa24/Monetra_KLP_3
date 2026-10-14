import { rupiah } from '../utils/format'

export default function SummaryCards({ totals, saved }) {
  return (
    <div>
      <div className="cards">
        <div className="card c-balance"><span>Saldo</span><strong>{rupiah(totals.balance)}</strong></div>
        <div className="card c-income"><span>Pemasukan</span><strong>{rupiah(totals.income)}</strong></div>
        <div className="card c-expense"><span>Pengeluaran</span><strong>{rupiah(totals.expense)}</strong></div>
      </div>
      <p className="muted">
        Dialokasikan ke tabungan {rupiah(saved)} · Saldo bebas {rupiah(totals.balance - saved)}
      </p>
    </div>
  )
}
