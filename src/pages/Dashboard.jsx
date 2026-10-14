import SummaryCards from '../components/SummaryCards'
import ReminderBanner from '../components/ReminderBanner'
import GoalNotes from '../components/GoalNotes'
import MiniCalendar from '../components/MiniCalendar'
import TransactionList from '../components/TransactionList'
import { todayStr } from '../utils/format'

export default function Dashboard({ transactions, totals, goalState, onAdd, onEdit, onDelete }) {
  const hasToday = transactions.some((t) => t.date === todayStr())
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

  return (
    <div className="stack">
      <ReminderBanner hasToday={hasToday} onAdd={onAdd} />
      <SummaryCards totals={totals} saved={goalState.totalSaved} />
      <div className="two-col">
        <div className="stack">
          <GoalNotes goalState={goalState} available={totals.balance - goalState.totalSaved} />
          <div className="panel">
            <h2>Transaksi terbaru</h2>
            <TransactionList transactions={recent} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
        <MiniCalendar transactions={transactions} />
      </div>
    </div>
  )
}
