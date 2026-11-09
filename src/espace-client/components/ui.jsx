import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCloudArrowUp,
  faPlaneDeparture,
  faRotateRight,
  faShip,
  faSpinner,
  faTriangleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { DEMANDE_STATUTS, FORMATS_ACCEPTES, LISTING_STATUTS, PHASES, PHASE_TONS, TAILLE_MAX } from '../constants'
import { taille } from '../format'

export const cx = (...c) => c.filter(Boolean).join(' ')

/* --------------------------------- Mise en page --------------------------------- */

export function PageHeader({ titre, description, actions, retour }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {retour && (
          <Link
            to={retour.to}
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-navy/60 transition-colors hover:text-orange"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
            {retour.label}
          </Link>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-[28px]">{titre}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink/60">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function Card({ className, children, ...props }) {
  return (
    <div className={cx('rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-navy/[0.03]', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ titre, icon, action, description }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        {icon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint/60 text-navy">
            <FontAwesomeIcon icon={icon} className="text-sm" />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="truncate text-[15px] font-bold text-navy">{titre}</h2>
          {description && <p className="mt-0.5 text-xs text-ink/50">{description}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

/** Ligne « libellé : valeur » ; masquée quand la valeur est vide (pas de colonnes de tirets). */
export function InfoRow({ label, children }) {
  if (children === null || children === undefined || children === '' || children === false) return null
  return (
    <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-ink/45 sm:w-44">{label}</dt>
      <dd className="min-w-0 break-words text-sm font-medium text-navy">{children}</dd>
    </div>
  )
}

/* ---------------------------------- Boutons ---------------------------------- */

const VARIANTES = {
  primary: 'bg-navy text-white hover:bg-navy-800 shadow-sm shadow-navy/20',
  accent: 'bg-orange text-white hover:bg-orange-600 shadow-sm shadow-orange/25',
  secondary: 'border border-slate-200 bg-white text-navy hover:border-navy/30 hover:bg-slate-50',
  ghost: 'text-navy/70 hover:bg-slate-100 hover:text-navy',
  danger: 'border border-red-200 bg-white text-red-600 hover:bg-red-50',
}
const TAILLES = { sm: 'h-9 px-3.5 text-[13px] gap-2', md: 'h-11 px-5 text-sm gap-2.5' }

export function Button({ variant = 'primary', size = 'md', icon, loading, to, href, className, children, disabled, ...props }) {
  const cls = cx(
    'inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange/25 disabled:cursor-not-allowed disabled:opacity-55',
    VARIANTES[variant],
    TAILLES[size],
    className,
  )
  const contenu = (
    <>
      {loading ? <FontAwesomeIcon icon={faSpinner} spin className="text-[0.9em]" /> : icon && <FontAwesomeIcon icon={icon} className="text-[0.9em]" />}
      {children}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} {...props}>
        {contenu}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {contenu}
      </a>
    )
  }
  return (
    <button type="button" className={cls} disabled={disabled || loading} {...props}>
      {contenu}
    </button>
  )
}

/* --------------------------------- Formulaires --------------------------------- */

export const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition placeholder:text-ink/35 focus:border-navy/40 focus:ring-4 focus:ring-navy/[0.06] disabled:bg-slate-50'

export function Field({ label, hint, required, children, className }) {
  return (
    <label className={cx('block space-y-1.5', className)}>
      <span className="block text-xs font-semibold uppercase tracking-wide text-navy/70">
        {label}
        {required && <span className="ml-0.5 text-orange">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-ink/45">{hint}</span>}
    </label>
  )
}

/** Sélection de fichiers (glisser-déposer) avec contrôle du format et de la taille avant l'envoi. */
export function FichiersInput({ files, onChange, max = 10, compact = false }) {
  const input = useRef(null)
  const [erreur, setErreur] = useState('')
  const [survol, setSurvol] = useState(false)
  const extensions = FORMATS_ACCEPTES.split(',')

  function ajouter(liste) {
    setErreur('')
    const nouveaux = []
    for (const f of liste) {
      const ext = `.${f.name.split('.').pop()?.toLowerCase()}`
      if (!extensions.includes(ext)) {
        setErreur(`« ${f.name} » : format non accepté (PDF, JPG, PNG, DOCX, XLSX).`)
        continue
      }
      if (f.size > TAILLE_MAX) {
        setErreur(`« ${f.name} » dépasse 15 Mo.`)
        continue
      }
      nouveaux.push(f)
    }
    const tous = [...files, ...nouveaux]
    if (tous.length > max) setErreur(`${max} fichiers maximum par envoi.`)
    onChange(tous.slice(0, max))
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => input.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setSurvol(true)
        }}
        onDragLeave={() => setSurvol(false)}
        onDrop={(e) => {
          e.preventDefault()
          setSurvol(false)
          ajouter([...e.dataTransfer.files])
        }}
        className={cx(
          'flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 text-sm transition-colors',
          compact ? 'py-3' : 'flex-col justify-center py-6 text-center',
          survol ? 'border-orange bg-orange/5' : 'border-slate-200 bg-slate-50/60 hover:border-navy/30',
        )}
      >
        <FontAwesomeIcon icon={faCloudArrowUp} className={cx('text-navy/40', compact ? 'text-lg' : 'text-2xl')} />
        <span className="text-ink/60">
          <span className="font-semibold text-navy">Ajouter des fichiers</span> ou glissez-les ici
          <span className="block text-xs text-ink/40">PDF, JPG, PNG, DOCX, XLSX — 15 Mo max.</span>
        </span>
        <input
          ref={input}
          type="file"
          multiple
          accept={FORMATS_ACCEPTES}
          className="hidden"
          onChange={(e) => {
            ajouter([...e.target.files])
            e.target.value = ''
          }}
        />
      </div>
      {erreur && <p className="mt-2 text-xs font-medium text-red-600">{erreur}</p>}
      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <span className="min-w-0 truncate font-medium text-navy">{f.name}</span>
              <span className="flex shrink-0 items-center gap-3 text-xs text-ink/45">
                {taille(f.size)}
                <button
                  type="button"
                  onClick={() => onChange(files.filter((_, j) => j !== i))}
                  aria-label={`Retirer ${f.name}`}
                  className="grid h-6 w-6 place-items-center rounded-md text-ink/40 hover:bg-white hover:text-red-600"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ---------------------------------- Badges ---------------------------------- */

export function Badge({ ton = 'bg-slate-100 text-slate-700', className, children }) {
  return <span className={cx('inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold', ton, className)}>{children}</span>
}

export function PhaseBadge({ phase, label, termine }) {
  if (termine) return <Badge ton="bg-slate-100 text-slate-600">Clôturé</Badge>
  return <Badge ton={PHASE_TONS[phase]}>{label ?? PHASES.find((p) => p.key === phase)?.label}</Badge>
}

export function TypeBadge({ type }) {
  const exp = type === 'export'
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/70">
      <FontAwesomeIcon icon={exp ? faPlaneDeparture : faShip} className={exp ? 'text-orange' : 'text-sky-600'} />
      {exp ? 'Export' : 'Import'}
    </span>
  )
}

export function DemandeStatut({ statut }) {
  const s = DEMANDE_STATUTS[statut] ?? { label: statut, ton: undefined }
  return <Badge ton={s.ton}>{s.label}</Badge>
}

export function ListingStatut({ statut, enRetard }) {
  if (enRetard) return <Badge ton="bg-red-50 text-red-600">Échéance dépassée</Badge>
  const s = LISTING_STATUTS[statut] ?? { label: statut }
  return <Badge ton={s.ton}>{s.label}</Badge>
}

/* ------------------------------- Progression ------------------------------- */

/** Frise des 6 phases du dossier, côté client. */
export function PhaseStepper({ etape = 0, termine = false }) {
  return (
    <ol className="grid grid-cols-6 gap-1.5 sm:gap-2">
      {PHASES.map((p, i) => {
        const fait = termine || i < etape || (i === etape && p.key === 'livre')
        const actuel = !termine && i === etape && p.key !== 'livre'
        return (
          <li key={p.key} className="min-w-0">
            <div className={cx('h-1.5 rounded-full', fait ? 'bg-emerald-500' : actuel ? 'bg-orange' : 'bg-slate-200')} />
            <div className="mt-2.5 flex items-center gap-1.5">
              <span
                className={cx(
                  'hidden h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold sm:grid',
                  fait ? 'bg-emerald-500 text-white' : actuel ? 'bg-orange text-white' : 'bg-slate-100 text-ink/40',
                )}
              >
                {fait ? <FontAwesomeIcon icon={faCheck} /> : i + 1}
              </span>
              <span className={cx('truncate text-[11px] font-semibold sm:text-xs', actuel ? 'text-orange' : fait ? 'text-navy' : 'text-ink/40')}>
                <span className="sm:hidden">{p.court}</span>
                <span className="hidden sm:inline">{p.label}</span>
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------------------------------- États ---------------------------------- */

export function Loading({ label = 'Chargement…', className }) {
  return (
    <div className={cx('flex items-center justify-center gap-2.5 py-16 text-sm text-ink/50', className)}>
      <FontAwesomeIcon icon={faSpinner} spin className="text-navy/50" />
      {label}
    </div>
  )
}

export function ErrorBox({ error, onRetry }) {
  if (!error) return null
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-start gap-2.5">
        <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5" />
        {error.message ?? String(error)}
      </span>
      {onRetry && (
        <Button variant="danger" size="sm" icon={faRotateRight} onClick={() => onRetry()}>
          Réessayer
        </Button>
      )}
    </div>
  )
}

export function Alerte({ ton = 'info', icon, titre, children, className }) {
  const tons = {
    info: 'border-sky-200 bg-sky-50 text-sky-900',
    attention: 'border-amber-200 bg-amber-50 text-amber-900',
    succes: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    erreur: 'border-red-200 bg-red-50 text-red-700',
  }
  return (
    <div className={cx('flex gap-3 rounded-2xl border px-4 py-3.5 text-sm', tons[ton], className)}>
      {icon && <FontAwesomeIcon icon={icon} className="mt-0.5 shrink-0" />}
      <div className="min-w-0">
        {titre && <p className="font-bold">{titre}</p>}
        <div className={titre ? 'mt-0.5 opacity-90' : ''}>{children}</div>
      </div>
    </div>
  )
}

export function EmptyState({ icon, titre, texte, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      {icon && (
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-mint/60 text-navy">
          <FontAwesomeIcon icon={icon} className="text-xl" />
        </span>
      )}
      <div>
        <p className="text-base font-bold text-navy">{titre}</p>
        {texte && <p className="mx-auto mt-1 max-w-md text-sm text-ink/55">{texte}</p>}
      </div>
      {action}
    </div>
  )
}

export function Pagination({ page, pageSize, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  if (total <= pageSize) return null
  const debut = (page - 1) * pageSize + 1
  const fin = Math.min(total, page * pageSize)
  return (
    <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-3.5 text-sm">
      <span className="text-ink/50">
        {debut}–{fin} sur {total}
      </span>
      <div className="flex items-center gap-1.5">
        <Button variant="secondary" size="sm" icon={faChevronLeft} disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Page précédente" />
        <span className="px-2 font-semibold text-navy">
          {page} / {pages}
        </span>
        <Button variant="secondary" size="sm" icon={faChevronRight} disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Page suivante" />
      </div>
    </div>
  )
}

/** Carte chiffre clé du tableau de bord (cliquable si `to`). */
export function StatCard({ label, valeur, icon, ton = 'bg-mint/60 text-navy', to, hint, accent }) {
  const contenu = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</p>
        {icon && (
          <span className={cx('grid h-9 w-9 shrink-0 place-items-center rounded-xl', ton)}>
            <FontAwesomeIcon icon={icon} className="text-sm" />
          </span>
        )}
      </div>
      <p className={cx('mt-2 text-[26px] font-bold leading-none tracking-tight', accent ? 'text-orange' : 'text-navy')}>{valeur ?? '—'}</p>
      {hint && <p className="mt-2 text-xs text-ink/50">{hint}</p>}
    </>
  )
  const cls = 'block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-navy/[0.03] transition'
  return to ? (
    <Link to={to} className={cx(cls, 'hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-md')}>
      {contenu}
    </Link>
  ) : (
    <div className={cls}>{contenu}</div>
  )
}

/** Petit filtre « pilule » (onglets de filtrage). */
export function Pilule({ actif, onClick, children, compteur }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actif}
      className={cx(
        'inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors',
        actif ? 'bg-navy text-white' : 'bg-white text-navy/70 ring-1 ring-slate-200 hover:text-navy hover:ring-navy/30',
      )}
    >
      {children}
      {compteur !== undefined && compteur > 0 && (
        <span className={cx('rounded-full px-1.5 text-[11px]', actif ? 'bg-white/20' : 'bg-slate-100')}>{compteur}</span>
      )}
    </button>
  )
}
