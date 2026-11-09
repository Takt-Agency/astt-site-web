import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
  faComments,
  faEnvelope,
  faEye,
  faEyeSlash,
  faFileInvoiceDollar,
  faFolderOpen,
  faLock,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import logoWhite from '../../assets/logo-white.png'
import logoDark from '../../assets/logo-dark.png'
import { api } from '../api'
import { useSession } from '../session'
import { Alerte, inputClass } from '../components/ui'

const ATOUTS = [
  { icon: faFolderOpen, titre: 'Suivi de vos dossiers', texte: 'Avancement en temps réel, de la déclaration à la livraison.' },
  { icon: faFileInvoiceDollar, titre: 'Factures & listings', texte: 'Vos listings mensuels en PDF ou Excel, règlements et échéances.' },
  { icon: faComments, titre: 'Demandes en ligne', texte: 'Nouveau dossier, document, question : échangez directement avec ASTT.' },
]

/** Seules les pages du portail sont acceptées comme destination après connexion. */
const destinationSure = (v) => (v && v.startsWith('/espace-client') && !v.startsWith('//') ? v : '/espace-client')

export default function Connexion() {
  const { connecte, connexion } = useSession()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const retour = destinationSure(params.get('retour'))
  const [mode, setMode] = useState('connexion')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [voir, setVoir] = useState(false)
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')
  const [demandeEnvoyee, setDemandeEnvoyee] = useState(false)

  if (connecte) return <Navigate to={retour} replace />

  async function seConnecter(e) {
    e.preventDefault()
    setErreur('')
    if (!email || !password) return setErreur('Renseignez votre email et votre mot de passe.')
    setEnvoi(true)
    try {
      await connexion(email.trim(), password)
      navigate(retour, { replace: true })
    } catch (err) {
      setErreur(err.message)
    } finally {
      setEnvoi(false)
    }
  }

  async function motDePasseOublie(e) {
    e.preventDefault()
    setErreur('')
    setEnvoi(true)
    try {
      await api.post('/mot-de-passe-oublie', { email: email.trim() }, { auth: false })
      setDemandeEnvoyee(true)
    } catch (err) {
      setErreur(err.message)
    } finally {
      setEnvoi(false)
    }
  }

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Panneau de marque */}
      <aside className="relative hidden overflow-hidden bg-navy text-white lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-orange/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-mint/10 blur-3xl" aria-hidden="true" />

        <Link to="/" className="relative z-10 inline-flex">
          <img src={logoWhite} alt="ASTT" className="h-12 w-auto" />
        </Link>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-orange" />
            <span className="rounded-full bg-orange/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-orange">Espace client</span>
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Vos opérations de transit, <span className="text-mint">en toute transparence</span>.
          </h1>
          <ul className="mt-10 space-y-5">
            {ATOUTS.map((a, i) => (
              <motion.li
                key={a.titre}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
                className="flex gap-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-mint">
                  <FontAwesomeIcon icon={a.icon} />
                </span>
                <span>
                  <span className="block font-semibold">{a.titre}</span>
                  <span className="mt-0.5 block text-sm text-white/65">{a.texte}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-xs text-white/45">© {new Date().getFullYear()} ASTT — Transitaire et commissionnaire en douane</p>
      </aside>

      {/* Formulaire */}
      <main className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Link to="/" className="lg:hidden">
            <img src={logoDark} alt="ASTT" className="h-10 w-auto" />
          </Link>
          <Link to="/" className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-navy/60 transition-colors hover:text-orange">
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            Retour au site
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-3xl font-bold tracking-tight text-navy">{mode === 'connexion' ? 'Connexion' : 'Mot de passe oublié'}</h2>
            <p className="mt-2 text-sm text-ink/55">
              {mode === 'connexion'
                ? 'Accédez au suivi de vos dossiers, à vos listings et à vos demandes.'
                : 'Indiquez l’email de votre compte : ASTT vous transmettra un nouveau mot de passe.'}
            </p>

            <div className="mt-6 space-y-3">
              {params.get('expire') && mode === 'connexion' && <Alerte ton="attention">Votre session a expiré. Veuillez vous reconnecter.</Alerte>}
              {erreur && <Alerte ton="erreur">{erreur}</Alerte>}
            </div>

            {mode === 'connexion' ? (
              <form onSubmit={seConnecter} className="mt-6 space-y-5" noValidate>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Email</span>
                  <span className="relative block">
                    <FontAwesomeIcon icon={faEnvelope} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink/35" />
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@societe.tn"
                      className={`${inputClass} h-12 pl-10`}
                    />
                  </span>
                </label>
                <label className="block space-y-1.5">
                  <span className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Mot de passe</span>
                    <button type="button" onClick={() => setMode('oubli')} className="text-xs font-semibold text-orange hover:text-orange-600">
                      Mot de passe oublié ?
                    </button>
                  </span>
                  <span className="relative block">
                    <FontAwesomeIcon icon={faLock} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-ink/35" />
                    <input
                      type={voir ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`${inputClass} h-12 pl-10 pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setVoir((v) => !v)}
                      aria-label={voir ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-ink/40 hover:text-navy"
                    >
                      <FontAwesomeIcon icon={voir ? faEyeSlash : faEye} />
                    </button>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={envoi}
                  className="group flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-navy text-sm font-semibold text-white shadow-lg shadow-navy/20 transition hover:bg-navy-800 disabled:opacity-60"
                >
                  {envoi ? <FontAwesomeIcon icon={faSpinner} spin /> : null}
                  Se connecter
                  {!envoi && (
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-orange transition-transform group-hover:translate-x-0.5">
                      <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
                    </span>
                  )}
                </button>
              </form>
            ) : demandeEnvoyee ? (
              <div className="mt-6 space-y-5">
                <Alerte ton="succes" icon={faCircleCheck} titre="Demande transmise">
                  Si un compte client correspond à cette adresse, l’équipe ASTT vous contactera pour vous transmettre un nouveau mot de passe.
                </Alerte>
                <button type="button" onClick={() => setMode('connexion')} className="text-sm font-semibold text-navy hover:text-orange">
                  ← Retour à la connexion
                </button>
              </div>
            ) : (
              <form onSubmit={motDePasseOublie} className="mt-6 space-y-5" noValidate>
                <label className="block space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-navy/70">Email du compte</span>
                  <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@societe.tn" className={`${inputClass} h-12`} />
                </label>
                <button
                  type="submit"
                  disabled={envoi || !email}
                  className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-navy text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60"
                >
                  {envoi && <FontAwesomeIcon icon={faSpinner} spin />}
                  Demander un nouveau mot de passe
                </button>
                <button type="button" onClick={() => setMode('connexion')} className="text-sm font-semibold text-navy hover:text-orange">
                  ← Retour à la connexion
                </button>
              </form>
            )}

            <div className="mt-10 rounded-2xl bg-mint/40 px-5 py-4 text-sm text-navy">
              <p className="font-semibold">Pas encore d’accès ?</p>
              <p className="mt-1 text-ink/65">
                Les comptes sont ouverts par ASTT pour ses clients.{' '}
                <Link to="/contact" className="font-semibold text-orange hover:text-orange-600">
                  Demandez votre accès
                </Link>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
