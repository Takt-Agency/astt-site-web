// Même backend que le dashboard. En dev, `/api` est proxifié par Vite (voir vite.config.js).
const API_URL = import.meta.env.VITE_API_URL ?? '/api'

async function post(path, body) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Connexion au serveur impossible. Veuillez réessayer plus tard.')
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const details = data?.details ? Object.values(data.details).join(' ') : ''
    throw new Error(
      [data?.message, details].filter(Boolean).join(' ') ||
        'Une erreur est survenue. Veuillez réessayer.',
    )
  }
  return data
}

async function get(path, { signal } = {}) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, { signal })
  } catch (err) {
    if (err?.name === 'AbortError') throw err
    throw new Error('Connexion au serveur impossible. Veuillez réessayer plus tard.')
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const err = new Error(data?.message || 'Une erreur est survenue. Veuillez réessayer.')
    err.status = res.status
    throw err
  }
  return data
}

/** Articles publiés de la page Actualités (rédigés depuis le dashboard). */
export function listActualites({ categorie, page = 1, pageSize = 9 } = {}, options) {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
  if (categorie) params.set('categorie', categorie)
  return get(`/actualites/publiques?${params}`, options)
}

export function getActualite(slug, options) {
  return get(`/actualites/publiques/${encodeURIComponent(slug)}`, options)
}

/** Adresse de l'image de couverture d'un article (servie par l'API). */
export const imageActualite = (article) => (article?.imageUrl ? `${API_URL}${article.imageUrl}` : null)

export function sendContactMessage(payload) {
  return post('/contacts', payload)
}

export function subscribeNewsletter(payload) {
  return post('/newsletter', payload)
}
