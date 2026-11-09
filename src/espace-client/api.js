// Client de l'API de l'espace client (même backend que le dashboard, routes /api/espace-client).
import { clearSession, getToken } from './session-storage'

const API_URL = import.meta.env.VITE_API_URL ?? '/api'
const BASE = `${API_URL}/espace-client`

/** Session expirée ou révoquée : retour à la connexion en gardant la page demandée. */
function sessionExpiree() {
  clearSession()
  const here = window.location.pathname + window.location.search
  if (!window.location.pathname.startsWith('/espace-client/connexion')) {
    window.location.assign(`/espace-client/connexion?expire=1&retour=${encodeURIComponent(here)}`)
  }
}

async function lireErreur(res) {
  const data = await res.json().catch(() => null)
  const details = data?.details ? Object.values(data.details).join(' ') : ''
  return [data?.message, details].filter(Boolean).join(' ') || 'Une erreur est survenue. Veuillez réessayer.'
}

/**
 * Appel de l'API. `body` : objet JSON ou FormData (envoi de fichiers).
 * `base` : préfixe (par défaut l'espace client ; '' pour /api/notifications, /api/auth…).
 */
export async function request(path, { method = 'GET', body, base = BASE, auth = true } = {}) {
  const headers = {}
  const token = getToken()
  if (auth && token) headers.Authorization = `Bearer ${token}`
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData
  if (body && !isForm) headers['Content-Type'] = 'application/json'
  let res
  try {
    res = await fetch(`${base}${path}`, { method, headers, body: body ? (isForm ? body : JSON.stringify(body)) : undefined })
  } catch {
    throw new Error('Connexion au serveur impossible. Vérifiez votre connexion et réessayez.')
  }
  if (res.status === 401 && auth && token) {
    sessionExpiree()
    throw new Error('Votre session a expiré. Veuillez vous reconnecter.')
  }
  if (!res.ok) {
    const err = new Error(await lireErreur(res))
    err.status = res.status
    throw err
  }
  return res.json().catch(() => null)
}

export const api = {
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
}

/** Routes communes du backend (profil, mot de passe, notifications). */
export const COMMUN = { base: API_URL }

/** Paramètres de requête sans les valeurs vides. */
export function qs(params = {}) {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== null && v !== '') p.set(k, v)
  const s = p.toString()
  return s ? `?${s}` : ''
}

/**
 * Fichier protégé (document, PDF, CSV) : téléchargé avec le jeton puis ouvert dans un onglet ou enregistré.
 * L'onglet est ouvert avant l'appel pour ne pas être bloqué par le navigateur.
 */
export async function ouvrirFichier(path, { nom = 'document', telecharger = false } = {}) {
  const onglet = telecharger ? null : window.open('', '_blank')
  try {
    const res = await fetch(`${BASE}${path}`, { headers: { Authorization: `Bearer ${getToken()}` } })
    if (res.status === 401) {
      onglet?.close()
      sessionExpiree()
      return
    }
    if (!res.ok) throw new Error(await lireErreur(res))
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    if (onglet) {
      onglet.location.href = url
    } else {
      const a = document.createElement('a')
      a.href = url
      a.download = nom
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  } catch (err) {
    onglet?.close()
    throw err
  }
}
