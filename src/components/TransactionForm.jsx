import { useState } from 'react'
import { byType } from '../utils/categories'
import { todayStr } from '../utils/format'

export default function TransactionForm({ initial, onSubmit, onClose }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [type, setType] = useState(initial?.type ?? 'expense')
  const [amount, setAmount] = useState(initial ? String(initial.amount) : '')
  const [category, setCategory] = useState(
    initial?.category ?? byType('expense')[0].id,
  )
  const [date, setDate] = useState(initial?.date ?? todayStr())
  const [errors, setErrors] = useState({})

  const changeType = (t) => {
    setType(t)
    setCategory(byType(t)[0].id)
  }

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!title.trim()) next.title = 'Keterangan wajib diisi'
    if (!(Number(amount) > 0)) next.amount = 'Nominal harus lebih dari 0'
    if (!date) next.date = 'Tanggal wajib diisi'
    setErrors(next)
    if (Object.keys(next).length) return
    onSubmit({ title: title.trim(), type, amount: Number(amount), category, date })
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Form transaksi">
      <form className="modal" onSubmit={submit} noValidate>
        <h2>{initial ? 'Edit transaksi' : 'Tambah transaksi'}</h2>

        <div className="segmented" role="group" aria-label="Jenis transaksi">
          <button type="button" className={type === 'expense' ? 'on' : ''} onClick={() => changeType('expense')}>Pengeluaran</button>
          <button type="button" className={type === 'income' ? 'on' : ''} onClick={() => changeType('income')}>Pemasukan</button>
        </div>

        <label>
          Keterangan
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: makan siang" />
          {errors.title && <span className="err">{errors.title}</span>}
        </label>

        <label>
          Nominal (Rp)
          <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
          {errors.amount && <span className="err">{errors.amount}</span>}
        </label>

        <label>
          Kategori
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {byType(type).map((c) => (
              <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
            ))}
          </select>
        </label>

        <label>
          Tanggal
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {errors.date && <span className="err">{errors.date}</span>}
        </label>

        <div className="row end">
          <button type="button" className="btn ghost" onClick={onClose}>Batal</button>
          <button type="submit" className="btn primary">Simpan</button>
        </div>
      </form>
    </div>
  )
}
