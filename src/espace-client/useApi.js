import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Charge une ressource de l'API et la recharge quand `deps` change.
 * Garde les données précédentes pendant un rechargement (pas de clignotement des listes paginées).
 */
export function useApi(fetcher, deps = [], { intervalle } = {}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const appel = useRef(0)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const charger = useCallback(async ({ silencieux = false } = {}) => {
    const id = ++appel.current
    if (!silencieux) setLoading(true)
    try {
      const res = await fetcherRef.current()
      if (id === appel.current) {
        setData(res)
        setError(null)
      }
    } catch (err) {
      if (id === appel.current && !silencieux) setError(err)
    } finally {
      if (id === appel.current) setLoading(false)
    }
  }, [])

  useEffect(() => {
    charger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    if (!intervalle) return undefined
    const t = setInterval(() => {
      if (document.visibilityState === 'visible') charger({ silencieux: true })
    }, intervalle)
    return () => clearInterval(t)
  }, [intervalle, charger])

  return { data, error, loading, recharger: charger, setData }
}
