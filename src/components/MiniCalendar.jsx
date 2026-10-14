import { useMemo, useState } from 'react'
import { toDateStr, todayStr } from '../utils/format'

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

export default function MiniCalendar({ transactions }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const filled = useMemo(() => new Set(transactions.map((t) => t.date)), [transactions])
  const offset = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const today = todayStr()
  const label = cursor.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })

  return (
    <div className="panel">
      <div className="row between">
        <h2>{label}</h2>
        <div className="row">
          <button className="icon-btn" onClick={() => setCursor(new Date(year, month - 1, 1))} aria-label="Bulan sebelumnya">‹</button>
          <button className="icon-btn" onClick={() => setCursor(new Date(year, month + 1, 1))} aria-label="Bulan berikutnya">›</button>
        </div>
      </div>
      <div className="cal">
        {DAYS.map((d) => <span key={d} className="cal-h">{d}</span>)}
        {cells.map((day, i) => {
          if (!day) return <span key={`e${i}`} />
          const ds = toDateStr(new Date(year, month, day))
          const cls = ['cal-d', ds === today ? 'today' : '', filled.has(ds) ? 'filled' : ''].join(' ')
          return (
            <span key={ds} className={cls} title={filled.has(ds) ? 'Ada catatan' : ''}>
              {day}
            </span>
          )
        })}
      </div>
      <p className="muted">Titik biru = hari yang sudah ada catatan.</p>
    </div>
  )
}
