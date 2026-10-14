import { useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import { uid } from '../utils/format'

// Hooks Pattern: seluruh logika data transaksi dibungkus di satu hook.
export default function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage(
    'monetra:transactions',
    [],
  )

  const addTransaction = (data) =>
    setTransactions((prev) => [{ ...data, id: uid() }, ...prev])

  const updateTransaction = (id, changes) =>
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    )

  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id))

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return { income, expense, balance: income - expense }
  }, [transactions])

  return { transactions, totals, addTransaction, updateTransaction, deleteTransaction }
}
