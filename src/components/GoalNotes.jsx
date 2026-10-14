import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { rupiah } from '../utils/format'

const COLORS = ['#F6DDBE', '#F4C99A', '#EFB89A', '#FBE7D0']
const TILT = [-1.5, 1, -0.5, 1.5]

function GoalCard({ goal, index, available, onAllocate, onRemove }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const percent = Math.min(100, Math.round((goal.saved / goal.target) * 100))
  const remaining = goal.target - goal.saved

  const submit = (e) => {
    e.preventDefault()
    const n = Number(value)
    if (!(n > 0)) return setError('Isi nominal lebih dari 0')
    if (n > available) return setError(`Saldo bebas hanya ${rupiah(available)}`)
    if (n > remaining) return setError(`Sisa target hanya ${rupiah(remaining)}`)
    onAllocate(goal.id, n)
    setValue('')
    setError('')
    setOpen(false)
  }

  return (
    <article
      className="note"
      style={{ background: COLORS[index % 4], transform: `rotate(${TILT[index % 4]}deg)` }}
    >
      <h3>{goal.name}</h3>
      <div className="bar" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={`Progres ${goal.name}`}>
        <div style={{ width: `${percent}%` }} />
      </div>
      <div className="row between">
        <b>{percent}%</b>
        <small>{rupiah(goal.saved)} / {rupiah(goal.target)}</small>
      </div>
      {open ? (
        <form onSubmit={submit} className="alloc">
          <input type="number" min="1" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Nominal" aria-label="Nominal alokasi" />
          <button className="btn primary" type="submit">Simpan</button>
          {error && <span className="err">{error}</span>}
        </form>
      ) : (
        <div className="row">
          <button className="btn small-btn" onClick={() => setOpen(true)}>Alokasikan</button>
          <button className="btn small-btn ghost" onClick={() => onRemove(goal)}>Hapus</button>
        </div>
      )}
    </article>
  )
}

export default function GoalNotes({ goalState, available }) {
  const { goals, addGoal, removeGoal, allocate } = goalState
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [error, setError] = useState('')
  const [toRemove, setToRemove] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Tulis dulu targetmu')
    if (!(Number(target) > 0)) return setError('Nominal target harus lebih dari 0')
    addGoal({ name: name.trim(), target: Number(target) })
    setName('')
    setTarget('')
    setError('')
    setAdding(false)
  }

  return (
    <div className="panel">
      <div className="row between">
        <h2>Catatan target</h2>
        <button className="btn small-btn" onClick={() => setAdding((v) => !v)}>
          {adding ? 'Tutup' : '+ Catatan baru'}
        </button>
      </div>

      {adding && (
        <form className="goal-form" onSubmit={submit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Liburan ke Bali" aria-label="Nama target" />
          <input type="number" min="1" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target (Rp)" aria-label="Nominal target" />
          <button className="btn primary" type="submit">Simpan</button>
          {error && <span className="err">{error}</span>}
        </form>
      )}

      {goals.length === 0 ? (
        <p className="muted">Belum ada target. Tulis satu, misalnya laptop baru atau liburan.</p>
      ) : (
        <div className="notes">
          {goals.map((g, i) => (
            <GoalCard key={g.id} goal={g} index={i} available={available} onAllocate={allocate} onRemove={setToRemove} />
          ))}
        </div>
      )}

      {toRemove && (
        <ConfirmDialog
          message={`Hapus catatan "${toRemove.name}"? Dana yang sudah dialokasikan kembali menjadi saldo bebas.`}
          onCancel={() => setToRemove(null)}
          onConfirm={() => { removeGoal(toRemove.id); setToRemove(null) }}
        />
      )}
    </div>
  )
}
