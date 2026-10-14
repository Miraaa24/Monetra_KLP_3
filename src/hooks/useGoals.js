import useLocalStorage from './useLocalStorage'
import { uid } from '../utils/format'

// Catatan target / wishlist tabungan.
export default function useGoals() {
  const [goals, setGoals] = useLocalStorage('monetra:goals', [])

  const addGoal = ({ name, target }) =>
    setGoals((prev) => [...prev, { id: uid(), name, target, saved: 0 }])

  const removeGoal = (id) => setGoals((prev) => prev.filter((g) => g.id !== id))

  const allocate = (id, amount) =>
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, saved: g.saved + amount } : g)),
    )

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0)

  return { goals, totalSaved, addGoal, removeGoal, allocate }
}
