export default function ConfirmDialog({ message, confirmLabel = 'Hapus', onConfirm, onCancel }) {
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Konfirmasi">
      <div className="modal small">
        <p>{message}</p>
        <div className="row end">
          <button className="btn ghost" onClick={onCancel}>Batal</button>
          <button className="btn danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
