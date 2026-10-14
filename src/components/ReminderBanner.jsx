import { useState } from 'react'

export default function ReminderBanner({ hasToday, onAdd }) {
  const [dismissed, setDismissed] = useState(false)
  if (hasToday || dismissed) return null
  return (
    <div className="banner" role="status">
      <span>Belum ada catatan hari ini. Catat pemasukan atau pengeluaranmu dulu, yuk.</span>
      <div className="row">
        <button className="btn primary" onClick={onAdd}>Catat sekarang</button>
        <button className="btn ghost" onClick={() => setDismissed(true)}>Nanti</button>
      </div>
    </div>
  )
}
