export const rupiah = (n) =>
  'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n))

export const toDateStr = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const todayStr = () => toDateStr(new Date())

export const formatDay = (s) =>
  new Date(s + 'T00:00:00').toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
