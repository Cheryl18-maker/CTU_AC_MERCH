export const money = (n) =>
  `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export const moneyShort = (n) => `₱${Number(n).toLocaleString('en-PH')}`

// The API sends UTC timestamps; SQLite drops the "Z", so add it back.
export function fmtDateTime(value) {
  if (!value) return ''
  const s = String(value)
  const d = new Date(/Z$|[+-]\d\d:\d\d$/.test(s) ? s : `${s}Z`)
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${date} · ${time}`
}
