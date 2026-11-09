import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { COMMUN, api } from './api'
import { clearSession, getStoredUser, getToken, saveSession, saveUser } from './session-storage'

const SessionContext = createContext(null)

/** Compte client connecté et sociétés visibles (la sienne, et ses filiales selon son périmètre). */
export function ClientSessionProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const [societes, setSocietes] = useState([])
  const [token, setToken] = useState(getToken)

  const rafraichir = useCallback(async () => {
    if (!getToken()) return
    const data = await api.get('/moi')
    setUser(data.user)
    setSocietes(data.societes ?? [])
    saveUser(data.user)
  }, [])

  useEffect(() => {
    if (token) rafraichir().catch(() => {})
  }, [token, rafraichir])

  const connexion = useCallback(async (email, password) => {
    const data = await api.post('/connexion', { email, password }, { auth: false })
    saveSession(data.token, data.user)
    setUser(data.user)
    setToken(data.token)
    return data.user
  }, [])

  const deconnexion = useCallback(() => {
    clearSession()
    setUser(null)
    setSocietes([])
    setToken(null)
  }, [])

  /** Profil : nom, téléphone, email (route commune /api/auth/me). */
  const majProfil = useCallback(async (input) => {
    const data = await api.patch('/auth/me', input, COMMUN)
    setUser(data.user)
    saveUser(data.user)
    return data.user
  }, [])

  const value = useMemo(
    () => ({ user, societes, connecte: Boolean(token), connexion, deconnexion, rafraichir, majProfil }),
    [user, societes, token, connexion, deconnexion, rafraichir, majProfil],
  )
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession doit être utilisé dans ClientSessionProvider')
  return ctx
}
