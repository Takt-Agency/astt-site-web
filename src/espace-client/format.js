export function dateFr(v, opts = { day: '2-digit', month: 'short', year: 'numeric' }) {
  if (!v) return '—'
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('fr-FR', opts)
}

export function dateHeureFr(v) {
  if (!v) return '—'
  return new Date(v).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

/** « il y a 5 min », « hier », puis la date. */
export function depuis(v) {
  if (!v) return ''
  const s = Math.round((Date.now() - new Date(v).getTime()) / 1000)
  if (s < 60) return 'à l’instant'
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`
  if (s < 172800) return 'hier'
  if (s < 604800) return `il y a ${Math.floor(s / 86400)} jours`
  return dateFr(v)
}

/** Montant en dinars, au millime. */
export function tnd(n, { devise = true } = {}) {
  if (n === null || n === undefined || n === '') return '—'
  const s = Number(n).toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
  return devise ? `${s} TND` : s
}

export function nombre(n, unite = '') {
  if (n === null || n === undefined || n === '') return '—'
  return `${Number(n).toLocaleString('fr-FR')}${unite ? ` ${unite}` : ''}`
}

export function taille(octets) {
  if (!octets) return ''
  if (octets < 1024) return `${octets} o`
  if (octets < 1024 * 1024) return `${Math.round(octets / 1024)} Ko`
  return `${(octets / 1024 / 1024).toFixed(1).replace('.', ',')} Mo`
}

/** Date du jour au format des champs <input type="date">. */
export const aujourdhui = () => new Date().toISOString().slice(0, 10)
