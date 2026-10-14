import Mascot from './Mascot'

export default function EmptyState({ title, hint }) {
  return (
    <div className="empty">
      <Mascot />
      <strong>{title}</strong>
      {hint && <span>{hint}</span>}
    </div>
  )
}
