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

export function sendContactMessage(payload) {
  return post('/contacts', payload)
}

export function subscribeNewsletter(payload) {
  return post('/newsletter', payload)
}
