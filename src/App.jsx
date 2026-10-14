import { useState } from 'react'
import useTransactions from './hooks/useTransactions'
import useGoals from './hooks/useGoals'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'
import TransactionForm from './components/TransactionForm'
import ConfirmDialog from './components/ConfirmDialog'

const TABS = [
  ['dashboard', 'Dashboard'],
  ['transaksi', 'Transaksi'],
  ['laporan', 'Laporan'],
]

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [form, setForm] = useState(null) // null = tertutup, { transaction } = terbuka
  const [toDelete, setToDelete] = useState(null)
  const tx = useTransactions()
  const goalState = useGoals()

  const handleSubmit = (data) => {
    if (form.transaction) tx.updateTransaction(form.transaction.id, data)
    else tx.addTransaction(data)
    setForm(null)
  }

  const openAdd = () => setForm({ transaction: null })
  const openEdit = (t) => setForm({ transaction: t })

  return (
    <div className="app">
      <header className="top">
        <h1>Monetra</h1>
        <nav aria-label="Menu utama">
          {TABS.map(([id, label]) => (
            <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {tab === 'dashboard' && (
          <Dashboard
            transactions={tx.transactions}
            totals={tx.totals}
            goalState={goalState}
            onAdd={openAdd}
            onEdit={openEdit}
            onDelete={setToDelete}
          />
        )}
        {tab === 'transaksi' && (
          <Transactions transactions={tx.transactions} onEdit={openEdit} onDelete={setToDelete} />
        )}
        {tab === 'laporan' && <Reports transactions={tx.transactions} />}
      </main>

      <button className="fab" onClick={openAdd} aria-label="Tambah transaksi">+</button>

      {form && (
        <TransactionForm initial={form.transaction} onSubmit={handleSubmit} onClose={() => setForm(null)} />
      )}
      {toDelete && (
        <ConfirmDialog
          message={`Hapus transaksi "${toDelete.title}"? Saldo akan dihitung ulang.`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => { tx.deleteTransaction(toDelete.id); setToDelete(null) }}
        />
      )}
    </div>
  )
}
