import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faBars,
  faBell,
  faBuilding,
  faCheckDouble,
  faChevronDown,
  faComments,
  faFileInvoiceDollar,
  faFileLines,
  faFolderOpen,
  faGauge,
  faHeadset,
  faPlus,
  faRightFromBracket,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import logoWhite from '../../assets/logo-white.png'
import logoDark from '../../assets/logo-dark.png'
import { COMMUN, api } from '../api'
import { depuis } from '../format'
import { lienNotification } from '../liens'
import { useSession } from '../session'
import { useApi } from '../useApi'
import { cx } from './ui'

const NAV = [
  { to: '/espace-client', label: 'Tableau de bord', icon: faGauge, end: true },
  { to: '/espace-client/dossiers', label: 'Mes dossiers', icon: faFolderOpen },
  { to: '/espace-client/demandes', label: 'Mes demandes', icon: faComments },
  { to: '/espace-client/factures', label: 'Factures & listings', icon: faFileInvoiceDollar },
  { to: '/espace-client/documents', label: 'Documents', icon: faFileLines },
  { to: '/espace-client/notifications', label: 'Notifications', icon: faBell, badge: 'notifications' },
  { to: '/espace-client/profil', label: 'Mon compte', icon: faUser },
]

function Sidebar({ notifNonLues, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pb-6 pt-7">
        <Link to="/" onClick={onNavigate} title="Retour au site ASTT">
          <img src={logoWhite} alt="ASTT" className="h-11 w-auto" />
        </Link>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-mint/80">Espace client</p>
      </div>

      <div className="px-4">
        <Link
          to="/espace-client/demandes/nouvelle"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2.5 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-orange-600"
        >
          <FontAwesomeIcon icon={faPlus} className="text-xs" />
          Nouvelle demande
        </Link>
      </div>

      <nav className="mt-6 flex-1 space-y-1 overflow-y-auto px-3">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cx(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors',
                isActive ? 'bg-white text-navy shadow-sm' : 'text-white/75 hover:bg-white/[0.08] hover:text-white',
              )
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-4 text-[15px]" />
            <span className="flex-1">{item.label}</span>
            {item.badge === 'notifications' && notifNonLues > 0 && (
              <span className="rounded-full bg-orange px-2 py-0.5 text-[11px] font-bold text-white">{notifNonLues > 99 ? '99+' : notifNonLues}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="m-4 rounded-2xl bg-white/[0.06] p-4 text-xs leading-relaxed text-white/70">
        <p className="flex items-center gap-2 font-semibold text-white">
          <FontAwesomeIcon icon={faHeadset} className="text-mint" />
          Besoin d’aide ?
        </p>
        <p className="mt-1.5">
          <a href="tel:+21672255600" className="hover:text-white">
            72 25 56 00
          </a>{' '}
          ·{' '}
          <a href="mailto:contact@astt.tn" className="hover:text-white">
            contact@astt.tn
          </a>
        </p>
        <Link to="/" onClick={onNavigate} className="mt-2 inline-flex items-center gap-1.5 font-semibold text-mint hover:text-white">
          Site ASTT
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
        </Link>
      </div>
    </div>
  )
}

function useClickOutside(ref, onOutside, actif) {
  useEffect(() => {
    if (!actif) return undefined
    const onDown = (e) => {
      if (!ref.current?.contains(e.target)) onOutside()
    }
    const onKey = (e) => e.key === 'Escape' && onOutside()
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, onOutside, actif])
}

function Cloche({ notifications, onLu }) {
  const [ouvert, setOuvert] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  useClickOutside(ref, () => setOuvert(false), ouvert)
  const items = notifications?.items ?? []
  const nonLues = notifications?.unread ?? 0

  async function ouvrir(n) {
    setOuvert(false)
    if (!n.lu) await api.post(`/notifications/${n._id}/lire`, null, COMMUN).catch(() => {})
    onLu()
    navigate(lienNotification(n))
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-label={`Notifications${nonLues ? ` (${nonLues} non lues)` : ''}`}
        className="relative grid h-10 w-10 place-items-center rounded-xl text-navy/70 transition hover:bg-slate-100 hover:text-navy"
      >
        <FontAwesomeIcon icon={faBell} />
        {nonLues > 0 && (
          <span className="absolute right-1.5 top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-orange px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {nonLues > 9 ? '9+' : nonLues}
          </span>
        )}
      </button>
      {ouvert && (
        <div className="absolute right-0 top-12 z-50 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-navy/15">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-navy">Notifications</p>
            {nonLues > 0 && (
              <button
                type="button"
                onClick={async () => {
                  await api.post('/notifications/lire-tout', null, COMMUN).catch(() => {})
                  onLu()
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/60 hover:text-orange"
              >
                <FontAwesomeIcon icon={faCheckDouble} />
                Tout marquer comme lu
              </button>
            )}
          </div>
          <ul className="max-h-[60vh] divide-y divide-slate-100 overflow-y-auto">
            {items.length === 0 && <li className="px-4 py-10 text-center text-sm text-ink/45">Aucune notification pour le moment.</li>}
            {items.slice(0, 8).map((n) => (
              <li key={n._id}>
                <button type="button" onClick={() => ouvrir(n)} className={cx('flex w-full gap-3 px-4 py-3 text-left transition hover:bg-slate-50', !n.lu && 'bg-orange/[0.04]')}>
                  <span className={cx('mt-1.5 h-2 w-2 shrink-0 rounded-full', n.lu ? 'bg-transparent' : 'bg-orange')} />
                  <span className="min-w-0">
                    <span className={cx('block text-sm text-navy', !n.lu && 'font-bold')}>{n.titre}</span>
                    {n.message && <span className="mt-0.5 block truncate text-xs text-ink/55">{n.message}</span>}
                    <span className="mt-1 block text-[11px] text-ink/40">{depuis(n.createdAt)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <Link to="/espace-client/notifications" onClick={() => setOuvert(false)} className="block border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-center text-xs font-semibold text-navy hover:text-orange">
            Voir toutes les notifications
          </Link>
        </div>
      )}
    </div>
  )
}

function MenuCompte() {
  const { user, societes, deconnexion } = useSession()
  const [ouvert, setOuvert] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()
  useClickOutside(ref, () => setOuvert(false), ouvert)
  const initiales = (user?.name ?? '?')
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const societe = societes.find((s) => String(s._id) === String(user?.tiers)) ?? societes[0]

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOuvert((v) => !v)} className="flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-2.5 transition hover:bg-slate-100">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-xs font-bold text-white">{initiales}</span>
        <span className="hidden min-w-0 text-left sm:block">
          <span className="block max-w-[180px] truncate text-sm font-semibold text-navy">{user?.name}</span>
          <span className="block max-w-[180px] truncate text-[11px] text-ink/50">{societe?.raisonSociale ?? ''}</span>
        </span>
        <FontAwesomeIcon icon={faChevronDown} className="text-[10px] text-ink/40" />
      </button>
      {ouvert && (
        <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-navy/15">
          <div className="px-3 py-2.5">
            <p className="truncate text-sm font-bold text-navy">{user?.name}</p>
            <p className="truncate text-xs text-ink/50">{user?.email}</p>
            {societes.length > 0 && (
              <p className="mt-2 flex items-start gap-2 text-xs text-ink/60">
                <FontAwesomeIcon icon={faBuilding} className="mt-0.5 text-navy/40" />
                <span>
                  {societes
                    .slice(0, 3)
                    .map((s) => s.raisonSociale)
                    .join(', ')}
                  {societes.length > 3 && ` +${societes.length - 3}`}
                </span>
              </p>
            )}
          </div>
          <div className="my-1 h-px bg-slate-100" />
          <Link to="/espace-client/profil" onClick={() => setOuvert(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-slate-50">
            <FontAwesomeIcon icon={faUser} className="w-4 text-navy/50" />
            Mon compte
          </Link>
          <button
            type="button"
            onClick={() => {
              deconnexion()
              navigate('/espace-client/connexion', { replace: true })
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-4" />
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  )
}

export default function EspaceLayout() {
  const [tiroir, setTiroir] = useState(false)
  const location = useLocation()
  const notifications = useApi(() => api.get('/notifications?limit=30', COMMUN), [], { intervalle: 60_000 })

  useEffect(() => {
    setTiroir(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = tiroir ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [tiroir])

  const nonLues = notifications.data?.unread ?? 0

  return (
    <div className="min-h-screen bg-[#f4f6fa]">
      {/* Barre latérale (écran large) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-navy lg:block">
        <Sidebar notifNonLues={nonLues} />
      </aside>

      {/* Tiroir (mobile) */}
      <div className={cx('fixed inset-0 z-50 lg:hidden', tiroir ? '' : 'pointer-events-none')}>
        <div className={cx('absolute inset-0 bg-navy-900/50 backdrop-blur-sm transition-opacity', tiroir ? 'opacity-100' : 'opacity-0')} onClick={() => setTiroir(false)} />
        <aside className={cx('absolute inset-y-0 left-0 w-72 bg-navy transition-transform duration-200', tiroir ? 'translate-x-0' : '-translate-x-full')}>
          <button type="button" onClick={() => setTiroir(false)} aria-label="Fermer le menu" className="absolute right-3 top-6 grid h-9 w-9 place-items-center rounded-lg text-white/70 hover:bg-white/10">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <Sidebar notifNonLues={nonLues} onNavigate={() => setTiroir(false)} />
        </aside>
      </div>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur">
          <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setTiroir(true)} aria-label="Ouvrir le menu" className="grid h-10 w-10 place-items-center rounded-xl text-navy hover:bg-slate-100 lg:hidden">
                <FontAwesomeIcon icon={faBars} />
              </button>
              <Link to="/espace-client" className="lg:hidden">
                <img src={logoDark} alt="ASTT" className="h-8 w-auto" />
              </Link>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-3">
              <Cloche notifications={notifications.data} onLu={() => notifications.recharger({ silencieux: true })} />
              <MenuCompte />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <Outlet context={{ rechargerNotifications: () => notifications.recharger({ silencieux: true }) }} />
        </main>
      </div>
    </div>
  )
}
